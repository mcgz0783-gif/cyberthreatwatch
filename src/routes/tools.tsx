import { useMemo, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { TOOLS } from "@/lib/cyber-data";
import { PageHero } from "@/components/cyber/PageHero";

const BASE = "https://cyberthreatwatch.lovable.app";

export const Route = createFileRoute("/tools")({
  head: () => ({
    meta: [
      { title: "Cybersecurity Tools — Free Platforms Directory" },
      {
        name: "description",
        content:
          "Curated free cybersecurity tools — VPN, antivirus, CVE search, threat maps, malware sandboxes, breach lookups and more. Each links to a world-class platform.",
      },
      { property: "og:title", content: "Cybersecurity Tools — Free Platforms Directory" },
      {
        property: "og:description",
        content: "Free cybersecurity tools and platforms hand-picked for defenders.",
      },
      { property: "og:url", content: `${BASE}/tools` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/tools` }],
  }),
  component: ToolsPage,
});

function ToolsPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      TOOLS.filter(
        (t) =>
          !q || (t.name + t.provider + t.category + t.desc).toLowerCase().includes(q.toLowerCase()),
      ),
    [q],
  );

  return (
    <>
      <PageHero
        eyebrow="Toolkit"
        title="Operator Tools"
        subtitle="Free, world-class cybersecurity platforms — every tool below has its own briefing page and a direct link to the upstream provider."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative max-w-md mb-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search tools, provider, category..."
            className="input-cyber pl-10"
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <Link
              key={t.slug}
              to="/tools/$slug"
              params={{ slug: t.slug }}
              className="card-cyber rounded p-6 flex items-start gap-4 hover:border-accent transition group"
            >
              <div className="w-12 h-12 rounded bg-accent/10 border border-accent/30 flex items-center justify-center text-2xl shrink-0 group-hover:bg-accent/20 transition">
                {t.icon}
              </div>
              <div className="flex-1">
                <div className="text-[10px] font-mono-cyber text-muted-foreground uppercase tracking-widest">
                  {t.category}
                </div>
                <h3 className="font-display font-bold text-cyber-white tracking-wide uppercase text-sm group-hover:text-accent transition">
                  {t.name}
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{t.desc}</p>
                <p className="text-[10px] font-mono-cyber text-accent mt-2">→ {t.provider}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
