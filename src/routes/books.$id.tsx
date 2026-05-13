import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BOOKS } from "@/lib/cyber-data";
import { generateBookPdf } from "@/lib/pdf";
import { useState } from "react";

export const Route = createFileRoute("/books/$id")({
  component: BookReader,
  notFoundComponent: () => (
    <div className="max-w-3xl mx-auto px-4 py-24 text-center">
      <h1 className="font-display text-3xl text-cyber-white mb-4">Book not found</h1>
      <Link to="/books" className="btn-cyber">← Back to library</Link>
    </div>
  ),
  loader: ({ params }) => {
    const book = BOOKS.find((b) => String(b.id) === params.id);
    if (!book) throw notFound();
    return { book };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.book.title} — CyberSec Library` },
      { name: "description", content: loaderData?.book.desc },
      { property: "og:title", content: loaderData?.book.title },
      { property: "og:description", content: loaderData?.book.desc },
      { property: "og:image", content: loaderData?.book.cover },
      { property: "og:type", content: "book" },
    ],
  }),
});

function BookReader() {
  const { book } = Route.useLoaderData();
  const [chapter, setChapter] = useState(0);
  const ch = book.chapters[chapter];

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/books" className="font-mono-cyber text-xs text-accent hover:underline">← Library</Link>

      <header className="mt-6 mb-10 grid md:grid-cols-[200px_1fr] gap-8 items-start">
        <img src={book.cover} alt={book.title} className="w-full rounded border border-border shadow-glow" />
        <div>
          <div className="eyebrow mb-3">▸ {book.cat}</div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-cyber-white leading-tight">{book.title}</h1>
          <p className="mt-2 text-muted-foreground font-mono-cyber text-sm">by {book.author} · {book.year} · {book.pages} pages</p>
          <p className="mt-4 text-cyber-text">{book.desc}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <button
              onClick={() => generateBookPdf({ title: book.title, author: book.author, year: book.year, chapters: book.chapters })}
              className="btn-cyber !py-2 !px-4 !text-xs"
            >
              ⬇ Download PDF
            </button>
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(book.title + " " + book.author)}+free+pdf`}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost-cyber !py-2 !px-4 !text-xs"
            >
              🔍 Find Online
            </a>
          </div>
        </div>
      </header>

      <div className="grid md:grid-cols-[220px_1fr] gap-8">
        <nav className="md:sticky md:top-24 md:self-start space-y-1">
          <div className="eyebrow mb-2">Chapters</div>
          {book.chapters.map((c: { title: string; body: string }, i: number) => (
            <button
              key={i}
              onClick={() => setChapter(i)}
              className={`block w-full text-left text-sm px-3 py-2 rounded border ${i === chapter ? "border-accent text-accent bg-accent/5" : "border-border text-muted-foreground hover:text-cyber-white hover:border-accent/40"}`}
            >
              {c.title}
            </button>
          ))}
        </nav>

        <section className="card-cyber rounded p-6 sm:p-10">
          <h2 className="font-display font-bold text-2xl text-cyber-white mb-6">{ch.title}</h2>
          <p className="text-cyber-text leading-relaxed whitespace-pre-line">{ch.body}</p>

          <div className="mt-10 pt-6 border-t border-border flex justify-between">
            <button
              disabled={chapter === 0}
              onClick={() => setChapter((c) => Math.max(0, c - 1))}
              className="btn-ghost-cyber !py-2 !px-4 !text-xs disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="font-mono-cyber text-xs text-muted-foreground self-center">
              {chapter + 1} / {book.chapters.length}
            </span>
            <button
              disabled={chapter === book.chapters.length - 1}
              onClick={() => setChapter((c) => Math.min(book.chapters.length - 1, c + 1))}
              className="btn-cyber !py-2 !px-4 !text-xs disabled:opacity-30"
            >
              Next →
            </button>
          </div>
        </section>
      </div>
    </article>
  );
}
