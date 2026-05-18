#!/usr/bin/env node
// Static sanity check of vercel.json so misconfigured routing fails CI early.
import { readFileSync } from "node:fs";

const cfg = JSON.parse(readFileSync(new URL("../vercel.json", import.meta.url), "utf8"));
const errors = [];

if (cfg.outputDirectory !== "dist/client") {
  errors.push(`outputDirectory must be "dist/client" (got ${JSON.stringify(cfg.outputDirectory)})`);
}

if (!cfg.functions || !cfg.functions["api/index.ts"]) {
  errors.push(`functions["api/index.ts"] is missing`);
}

const rewrites = cfg.rewrites ?? [];
const hasAssetsPassthrough = rewrites.some(
  (r) => r.source === "/assets/(.*)" && r.destination === "/assets/$1",
);
const hasSsrFallback = rewrites.some(
  (r) => r.source === "/(.*)" && r.destination === "/api/index",
);

if (!hasAssetsPassthrough) {
  errors.push(`Missing "/assets/(.*)" -> "/assets/$1" rewrite (static assets would be SSR'd)`);
}
if (!hasSsrFallback) {
  errors.push(`Missing catch-all "/(.*)" -> "/api/index" rewrite (SSR not invoked)`);
}

// Assets rewrite MUST come before the catch-all, otherwise SSR steals everything.
const assetsIdx = rewrites.findIndex((r) => r.source === "/assets/(.*)");
const fallbackIdx = rewrites.findIndex((r) => r.source === "/(.*)");
if (assetsIdx > fallbackIdx) {
  errors.push(`/assets rewrite must come BEFORE the "/(.*)" catch-all`);
}

if (errors.length) {
  console.error("vercel.json validation failed:");
  for (const e of errors) console.error("  - " + e);
  process.exit(1);
}

console.log("vercel.json OK");
console.log(`  outputDirectory: ${cfg.outputDirectory}`);
console.log(`  function:        api/index.ts (${cfg.functions["api/index.ts"].runtime})`);
console.log(`  rewrites:        ${rewrites.length} rule(s), assets-before-fallback OK`);
