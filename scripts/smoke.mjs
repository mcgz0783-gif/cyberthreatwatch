#!/usr/bin/env node
// Boots `vercel dev` against the local repo and hits a handful of routes
// to catch SSR/render errors before deploying. Requires VERCEL_TOKEN in env.
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const PORT = 3939;
const TIMEOUT_MS = 90_000;

const TARGETS = [
  { path: "/",            expectStatus: 200, mustInclude: ["<html", "CyberSec"] },
  { path: "/books",       expectStatus: 200, mustInclude: ["<html"] },
  { path: "/blog",        expectStatus: 200, mustInclude: ["<html"] },
  { path: "/tools",       expectStatus: 200, mustInclude: ["<html"] },
  { path: "/faq",         expectStatus: 200, mustInclude: ["<html"] },
  { path: "/privacy",     expectStatus: 200, mustInclude: ["<html"] },
  { path: "/sitemap.xml", expectStatus: 200, mustInclude: ["<urlset", "cyberhawk-ug.store"] },
  { path: "/robots.txt",  expectStatus: 200, mustInclude: ["User-agent"] },
  { path: "/this-route-does-not-exist", expectStatus: 404, mustInclude: ["404", "Signal Lost"] },
];

if (!process.env.VERCEL_TOKEN) {
  console.error("VERCEL_TOKEN not set; skipping smoke test.");
  process.exit(0);
}

const child = spawn(
  "vercel",
  ["dev", "--token", process.env.VERCEL_TOKEN, "--listen", String(PORT), "--yes"],
  { stdio: ["ignore", "pipe", "pipe"] },
);

let stdoutBuf = "";
child.stdout.on("data", (d) => { stdoutBuf += d.toString(); process.stdout.write(d); });
child.stderr.on("data", (d) => { stdoutBuf += d.toString(); process.stderr.write(d); });

const waitForReady = async () => {
  const deadline = Date.now() + TIMEOUT_MS;
  while (Date.now() < deadline) {
    try {
      const r = await fetch(`http://localhost:${PORT}/`);
      if (r.status < 500) return;
    } catch { /* not ready */ }
    await sleep(1000);
  }
  throw new Error("vercel dev did not become ready in time");
};

const cleanup = () => { try { child.kill("SIGTERM"); } catch {} };
process.on("exit", cleanup);
process.on("SIGINT", () => { cleanup(); process.exit(130); });

try {
  await waitForReady();
  console.log("\n--- Smoke tests ---");

  const failures = [];
  for (const t of TARGETS) {
    const url = `http://localhost:${PORT}${t.path}`;
    const res = await fetch(url, { redirect: "manual" });
    const body = await res.text();
    const okStatus = res.status === t.expectStatus;
    const okBody = t.mustInclude.every((s) => body.includes(s));
    const status = okStatus && okBody ? "PASS" : "FAIL";
    console.log(`[${status}] ${t.path} -> ${res.status}`);
    if (!okStatus) failures.push(`${t.path}: expected ${t.expectStatus} got ${res.status}`);
    if (!okBody) {
      const missing = t.mustInclude.filter((s) => !body.includes(s));
      failures.push(`${t.path}: body missing ${JSON.stringify(missing)}`);
    }
  }

  if (failures.length) {
    console.error("\nSmoke test failures:");
    for (const f of failures) console.error("  - " + f);
    cleanup();
    process.exit(1);
  }
  console.log("\nAll smoke tests passed.");
  cleanup();
  process.exit(0);
} catch (err) {
  console.error("Smoke runner error:", err);
  cleanup();
  process.exit(1);
}
