import { createFileRoute, Link } from "@tanstack/react-router";
import { NEWS, BLOGS, INSIGHTS, STATS, TOOLS } from "@/lib/cyber-data";
import { NewsCard, BlogCard, InsightCard, SectionHeader } from "@/components/cyber/Cards";
import { Newsletter } from "@/components/cyber/Newsletter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CyberSec Updates — Real-Time Threat Intelligence" },
      { name: "description", content: "Live cyber threat feed, curated news, deep-dive insights, and a security knowledge base for defenders." },
      { property: "og:url", content: "https://cyberthreatwatch.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://cyberthreatwatch.lovable.app/" }],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
        <div className="absolute inset-0 grid-bg opacity-60" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32">
          <div className="max-w-3xl">
            <div className="eyebrow mb-5">
              <span className="w-2 h-2 rounded-full bg-cyber-green animate-blink" />
              SYSTEM ONLINE // {new Date().toLocaleDateString("en", { month: "short", day: "2-digit", year: "numeric" }).toUpperCase()}
            </div>
            <h1 className="font-display font-black text-5xl sm:text-6xl lg:text-7xl text-cyber-white uppercase leading-[1.02] tracking-tight">
              Cyber Threat
              <br />
              <span className="text-accent text-glow animate-pulse-glow">Watch</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-foreground max-w-2xl leading-relaxed">
              Real-time intelligence on the threats targeting your stack — vulnerabilities,
              breaches, nation-state campaigns, and the tools to stay ahead of them.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link to="/news" className="btn-cyber">Latest Threats →</Link>
              <Link to="/insights" className="btn-ghost-cyber">Read Insights</Link>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="card-cyber p-5 rounded">
                <div className="text-2xl mb-2">{s.icon}</div>
                <div className="font-mono-cyber text-3xl sm:text-4xl font-bold text-accent text-glow">
                  {s.val}
                </div>
                <div className="font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mt-1">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LATEST NEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeader eyebrow="Threat Feed" title="Latest News" subtitle="Critical incidents and disclosures from the last 72 hours." />
          <Link to="/news" className="btn-ghost-cyber !py-2 !px-4 !text-xs">View All →</Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {NEWS.slice(0, 3).map((n) => (
            <NewsCard key={n.id} item={n} />
          ))}
        </div>
      </section>

      {/* INSIGHTS */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <SectionHeader eyebrow="Deep Dive" title="Featured Insights" subtitle="Long-form analysis from researchers and CISOs across the industry." />
          <div className="grid gap-6 lg:grid-cols-2">
            {INSIGHTS.slice(0, 2).map((i) => (
              <InsightCard key={i.id} item={i} />
            ))}
          </div>
        </div>
      </section>

      {/* TOOLS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
          <SectionHeader eyebrow="Toolkit" title="Operator Tools" subtitle="Open intelligence and verification utilities — each links to a free, world-class platform." />
          <Link to="/tools" className="btn-ghost-cyber !py-2 !px-4 !text-xs">All Tools →</Link>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.slice(0, 6).map((t) => (
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

      {/* FROM THE BLOG */}
      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-10">
            <SectionHeader eyebrow="Field Notes" title="From the Blog" />
            <Link to="/blog" className="btn-ghost-cyber !py-2 !px-4 !text-xs">All Posts →</Link>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOGS.slice(0, 3).map((b) => (
              <BlogCard key={b.id} item={b} />
            ))}
          </div>
        </div>
      </section>

      <Newsletter />
    </>
  );
}
