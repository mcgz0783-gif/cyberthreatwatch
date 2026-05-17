import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { INSIGHTS } from "@/lib/cyber-data";
import { Tag } from "@/components/cyber/Cards";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => {
    const item = INSIGHTS.find((i) => i.slug === params.slug);
    if (!item) throw notFound();
    return { item };
  },
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.item.title} — CyberSec Insights` },
      { name: "description", content: loaderData?.item.key },
      { property: "og:title", content: loaderData?.item.title },
      { property: "og:description", content: loaderData?.item.key },
      { property: "og:image", content: loaderData?.item.cover },
      { property: "og:type", content: "article" },
      { property: "og:url", content: `https://cyberhawk-ug.store/insights/${params.slug}` },
    ],
    links: [{ rel: "canonical", href: `https://cyberhawk-ug.store/insights/${params.slug}` }],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-3xl text-cyber-white mb-4">Insight not found</h1>
      <Link to="/insights" className="btn-cyber">← Back to insights</Link>
    </div>
  ),
  component: InsightDetail,
});

function InsightDetail() {
  const { item } = Route.useLoaderData();
  return (
    <article>
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden border-b border-border">
        <img src={item.cover} alt={item.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <div className="mb-3"><Tag>{item.cat}</Tag></div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-cyber-white leading-tight max-w-3xl">{item.title}</h1>
          <p className="mt-3 font-mono-cyber text-xs text-muted-foreground">
            {item.author} · {item.date} · ⏱ {item.read}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="card-cyber rounded p-6 mb-10 border-l-4 border-accent">
          <div className="eyebrow mb-2">▸ Key Finding</div>
          <p className="text-cyber-white text-lg italic">🔑 {item.key}</p>
        </div>
        {item.content.map((s: { heading: string; body: string }, i: number) => (
          <section key={i} className="mb-10">
            <h2 className="font-display font-bold text-2xl text-cyber-white mb-3">{s.heading}</h2>
            <p className="text-cyber-text leading-relaxed">{s.body}</p>
          </section>
        ))}

        <div className="mt-12 pt-8 border-t border-border">
          <Link to="/insights" className="btn-ghost-cyber !py-2 !px-4 !text-xs">← All insights</Link>
        </div>
      </div>
    </article>
  );
}
