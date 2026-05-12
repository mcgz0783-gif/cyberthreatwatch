import { useMemo, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { BOOKS } from "@/lib/cyber-data";
import { BookCard } from "@/components/cyber/Cards";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/books")({
  head: () => ({
    meta: [
      { title: "Books — CyberSec Updates" },
      { name: "description", content: "Curated cybersecurity books across offensive security, blue team, threat intel, malware analysis, and architecture." },
      { property: "og:title", content: "Books — CyberSec Updates" },
      { property: "og:description", content: "Curated cybersecurity reading list." },
    ],
  }),
  component: BooksPage,
});

function BooksPage() {
  const [q, setQ] = useState("");
  const filtered = useMemo(
    () =>
      BOOKS.filter(
        (b) => !q || (b.title + b.author + b.cat + b.desc).toLowerCase().includes(q.toLowerCase())
      ),
    [q]
  );

  return (
    <>
      <PageHero
        eyebrow="Library"
        title="Books"
        subtitle="A curated reading list — from foundational classics to current practitioner manuals."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="relative max-w-md mb-8">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-accent">🔍</span>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search title, author, category..."
            className="input-cyber pl-10"
          />
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((b) => (
            <BookCard key={b.id} item={b} />
          ))}
        </div>
      </section>
    </>
  );
}
