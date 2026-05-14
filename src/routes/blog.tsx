import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BLOGS } from "@/lib/cyber-data";
import { BlogCard } from "@/components/cyber/Cards";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog — CyberSec Updates" },
      { name: "description", content: "Practitioner blog posts on Zero Trust, K8s security, SOC operations, bug bounty, threat intel, and more." },
      { property: "og:title", content: "Blog — CyberSec Updates" },
      { property: "og:description", content: "Practitioner blog posts from cybersecurity professionals." },
      { property: "og:url", content: "https://cyberthreatwatch.lovable.app/blog" },
    ],
    links: [{ rel: "canonical", href: "https://cyberthreatwatch.lovable.app/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      BLOGS.filter(
        (b) => !q || (b.title + b.summary + b.author + b.cat).toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <>
      <PageHero
        eyebrow="Field Notes"
        title="Blog"
        subtitle="Practical write-ups, post-mortems, and how-tos from working security engineers."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative max-w-md mb-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search articles, authors, topics..."
            className="input-cyber pl-10"
          />
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((b) => (
            <BlogCard key={b.id} item={b} />
          ))}
        </div>
      </section>
    </>
  );
}
