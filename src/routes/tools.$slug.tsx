import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { TOOLS, findTool } from "@/lib/cyber-data";

const BASE = "https://cyberthreatwatch.lovable.app";

export const Route = createFileRoute("/tools/$slug")({
  loader: ({ params }) => {
    const tool = findTool(params.slug);
    if (!tool) throw notFound();
    return { tool };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      {
        title: `${loaderData?.tool.name} (${loaderData?.tool.provider}) — Free Cybersecurity Tool`,
      },
      { name: "description", content: loaderData?.tool.about ?? loaderData?.tool.desc },
      { property: "og:title", content: `${loaderData?.tool.name} — ${loaderData?.tool.provider}` },
      { property: "og:description", content: loaderData?.tool.desc },
      { property: "og:url", content: `${BASE}/tools/${params.slug}` },
      { property: "og:type", content: "article" },
    ],
    links: [{ rel: "canonical", href: `${BASE}/tools/${params.slug}` }],
    scripts: loaderData
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: loaderData.tool.name,
              applicationCategory: "SecurityApplication",
              operatingSystem: "Any",
              description: loaderData.tool.about,
              url: loaderData.tool.url,
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              provider: { "@type": "Organization", name: loaderData.tool.provider },
            }),
          },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-3xl text-cyber-white mb-4">Tool not found</h1>
      <Link to="/tools" className="btn-cyber">
        ← Back to tools
      </Link>
    </div>
  ),
  component: ToolDetail,
});

function ToolDetail() {
  const { tool } = Route.useLoaderData();
  const related = TOOLS.filter((t) => t.category === tool.category && t.slug !== tool.slug).slice(
    0,
    3,
  );

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/tools" className="font-mono-cyber text-xs text-accent hover:underline">
        ← All tools
      </Link>

      <header className="mt-6 mb-10 flex flex-wrap items-start gap-6">
        <div className="w-20 h-20 rounded bg-accent/10 border border-accent/30 flex items-center justify-center text-4xl shrink-0">
          {tool.icon}
        </div>
        <div className="flex-1 min-w-[260px]">
          <div className="eyebrow mb-2">▸ {tool.category}</div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-cyber-white leading-tight">
            {tool.name}
          </h1>
          <p className="mt-2 font-mono-cyber text-sm text-muted-foreground">
            Provided by {tool.provider}
          </p>
          <p className="mt-4 text-cyber-text">{tool.about}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a
              href={tool.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-cyber !py-2 !px-4 !text-xs"
            >
              ↗ Open {tool.provider}
            </a>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(tool.name + " " + tool.provider + " documentation")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost-cyber !py-2 !px-4 !text-xs"
            >
              📚 Docs
            </a>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-2 gap-6">
        <section className="card-cyber rounded p-6">
          <h2 className="font-display font-bold text-lg text-cyber-white mb-3">✨ Key Features</h2>
          <ul className="space-y-2 text-sm text-cyber-text">
            {tool.features.map((f: string) => (
              <li key={f} className="flex gap-2">
                <span className="text-accent">▸</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </section>
        <section className="card-cyber rounded p-6">
          <h2 className="font-display font-bold text-lg text-cyber-white mb-3">🚀 How to Use</h2>
          <ol className="space-y-2 text-sm text-cyber-text list-decimal pl-5">
            {tool.howTo.map((step: string) => (
              <li key={step}>{step}</li>
            ))}
          </ol>
        </section>
      </div>

      <section className="mt-10 card-cyber rounded p-6">
        <h2 className="font-display font-bold text-lg text-cyber-white mb-3">🔒 Safety Notes</h2>
        <p className="text-sm text-cyber-text">
          Cyber Threat Watch is not affiliated with {tool.provider}. We curate this directory to
          help defenders find reputable, free platforms. Always validate downloads with checksums,
          use official URLs, and review the provider's privacy policy before submitting sensitive
          data.
        </p>
      </section>

      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="font-display font-bold text-lg text-cyber-white mb-4">
            More in {tool.category}
          </h2>
          <div className="grid gap-4 sm:grid-cols-3">
            {related.map((r) => (
              <Link
                key={r.slug}
                to="/tools/$slug"
                params={{ slug: r.slug }}
                className="card-cyber rounded p-4 hover:border-accent transition"
              >
                <div className="text-2xl">{r.icon}</div>
                <div className="font-display font-bold text-sm text-cyber-white mt-2">{r.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{r.desc}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
