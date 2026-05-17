import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { NEWS } from "@/lib/cyber-data";
import { NewsCard } from "@/components/cyber/Cards";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "Threat News — CyberSec Updates" },
      { name: "description", content: "The latest cybersecurity news: zero-days, breaches, ransomware, nation-state activity, and emerging threats." },
      { property: "og:title", content: "Threat News — CyberSec Updates" },
      { property: "og:description", content: "Curated cybersecurity news and active threat reporting." },
      { property: "og:url", content: "https://cyberhawk-ug.store/news" },
    ],
    links: [{ rel: "canonical", href: "https://cyberhawk-ug.store/news" }],
  }),
  component: NewsPage,
});

function NewsPage() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("All");
  const cats = ["All", ...Array.from(new Set(NEWS.map((n) => n.cat)))];

  const filtered = useMemo(
    () =>
      NEWS.filter((n) => {
        const inCat = cat === "All" || n.cat === cat;
        const inQ =
          !q ||
          (n.title + n.summary + n.tags.join(" ")).toLowerCase().includes(q.toLowerCase());
        return inCat && inQ;
      }),
    [q, cat]
  );

  return (
    <>
      <PageHero
        eyebrow="Live Feed"
        title="Threat News"
        subtitle="Active disclosures, exploits in the wild, and defensive guidance — curated daily."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">🔍</span>
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search threats, CVEs, vendors..."
              className="input-cyber pl-10"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {cats.map((c) => (
              <button
                key={c}
                onClick={() => setCat(c)}
                className={`px-4 py-2 font-mono-cyber text-xs tracking-widest uppercase border rounded transition ${
                  cat === c
                    ? "bg-accent text-accent-foreground border-accent"
                    : "border-border text-muted-foreground hover:border-accent hover:text-accent"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 font-mono-cyber text-muted-foreground">
            NO_RESULTS_FOUND
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filtered.map((n) => (
              <NewsCard key={n.id} item={n} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
