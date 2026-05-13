import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BLOGS } from "@/lib/cyber-data";
import { Tag } from "@/components/cyber/Cards";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = BLOGS.find((b) => b.slug === params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.post.title} — CyberSec Blog` },
      { name: "description", content: loaderData?.post.summary },
      { property: "og:title", content: loaderData?.post.title },
      { property: "og:description", content: loaderData?.post.summary },
      { property: "og:image", content: loaderData?.post.cover },
      { property: "og:type", content: "article" },
    ],
  }),
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-3xl text-cyber-white mb-4">Article not found</h1>
      <Link to="/blog" className="btn-cyber">← Back to blog</Link>
    </div>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post } = Route.useLoaderData();
  return (
    <article>
      <div className="relative h-[40vh] min-h-[280px] overflow-hidden border-b border-border">
        <img src={post.cover} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/20" />
        <div className="absolute inset-0 grid-bg opacity-40" />
        <div className="relative max-w-4xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-10">
          <div className="mb-3"><Tag>{post.cat}</Tag></div>
          <h1 className="font-display font-black text-3xl sm:text-5xl text-cyber-white leading-tight max-w-3xl">{post.title}</h1>
          <p className="mt-3 font-mono-cyber text-xs text-muted-foreground">
            {post.author} · {post.date} · ⏱ {post.read}
          </p>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 prose-cyber">
        <p className="text-lg text-cyber-text mb-10 leading-relaxed border-l-2 border-accent pl-5">
          {post.summary}
        </p>
        {post.content.map((s: { heading: string; body: string }, i: number) => (
          <section key={i} className="mb-10">
            <h2 className="font-display font-bold text-2xl text-cyber-white mb-3">{s.heading}</h2>
            <p className="text-cyber-text leading-relaxed">{s.body}</p>
          </section>
        ))}

        <div className="mt-16 pt-8 border-t border-border flex flex-wrap justify-between items-center gap-4">
          <Link to="/blog" className="btn-ghost-cyber !py-2 !px-4 !text-xs">← All posts</Link>
          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
            target="_blank"
            rel="noreferrer noopener"
            className="btn-cyber !py-2 !px-4 !text-xs"
          >
            Share on X
          </a>
        </div>
      </div>
    </article>
  );
}
