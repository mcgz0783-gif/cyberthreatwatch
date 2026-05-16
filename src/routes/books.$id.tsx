import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BOOKS } from "@/lib/cyber-data";
import { generateBookPdf } from "@/lib/pdf";
import { useEffect, useRef, useState } from "react";

const BASE = "https://cyberthreatwatch.lovable.app";

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
  head: ({ params, loaderData }) => ({
    meta: [
      { title: `${loaderData?.book.title} — CyberSec Library` },
      { name: "description", content: loaderData?.book.desc },
      { property: "og:title", content: loaderData?.book.title },
      { property: "og:description", content: loaderData?.book.desc },
      { property: "og:image", content: loaderData?.book.cover },
      { property: "og:type", content: "book" },
      { property: "og:url", content: `${BASE}/books/${params.id}` },
    ],
    links: [{ rel: "canonical", href: `${BASE}/books/${params.id}` }],
    scripts: loaderData
      ? [{
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Book",
            name: loaderData.book.title,
            author: { "@type": "Person", name: loaderData.book.author },
            datePublished: String(loaderData.book.year),
            numberOfPages: loaderData.book.pages,
            bookFormat: "https://schema.org/EBook",
            image: loaderData.book.cover,
            description: loaderData.book.desc,
          }),
        }]
      : [],
  }),
});

const FONT_SIZES = ["text-sm", "text-base", "text-lg", "text-xl"] as const;

function BookReader() {
  const { book } = Route.useLoaderData();
  const storageKey = `cw:book:${book.id}`;
  const [chapter, setChapter] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const readerRef = useRef<HTMLDivElement | null>(null);

  // Restore last position
  useEffect(() => {
    try {
      const raw = localStorage.getItem(storageKey);
      if (raw) {
        const p = JSON.parse(raw);
        if (typeof p.chapter === "number") setChapter(Math.min(p.chapter, book.chapters.length - 1));
        if (typeof p.font === "number") setFontIdx(p.font);
      }
    } catch {}
  }, [storageKey, book.chapters.length]);

  // Persist
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify({ chapter, font: fontIdx }));
    } catch {}
  }, [chapter, fontIdx, storageKey]);

  // Scroll to top of reader on chapter change
  useEffect(() => {
    readerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTocOpen(false);
  }, [chapter]);

  const ch = book.chapters[chapter];
  const progress = ((chapter + 1) / book.chapters.length) * 100;

  const goPrev = () => setChapter((c) => Math.max(0, c - 1));
  const goNext = () => setChapter((c) => Math.min(book.chapters.length - 1, c + 1));

  // Keyboard nav
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  });

  return (
    <article className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Reading progress bar (sticky) */}
      <div className="sticky top-16 z-30 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 bg-background/85 backdrop-blur-md border-b border-border py-2">
        <div className="flex items-center gap-3">
          <Link to="/books" className="font-mono-cyber text-xs text-accent hover:underline shrink-0">← Library</Link>
          <div className="flex-1 h-1.5 bg-surface rounded overflow-hidden">
            <div className="h-full bg-accent transition-all duration-500" style={{ width: `${progress}%` }} />
          </div>
          <span className="font-mono-cyber text-[10px] text-muted-foreground shrink-0">
            {chapter + 1}/{book.chapters.length}
          </span>
        </div>
      </div>

      <header className="mt-6 mb-10 grid md:grid-cols-[200px_1fr] gap-8 items-start">
        <img src={book.cover} alt={book.title} className="w-full rounded border border-border shadow-glow" />
        <div>
          <div className="eyebrow mb-3">▸ {book.cat}</div>
          <h1 className="font-display font-black text-3xl sm:text-4xl text-cyber-white leading-tight">{book.title}</h1>
          <p className="mt-2 text-muted-foreground font-mono-cyber text-sm">
            by {book.author} · {book.year} · {book.pages} pages · {book.chapters.length} chapters
          </p>
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
            <button
              onClick={() => { try { localStorage.removeItem(storageKey); } catch {} setChapter(0); }}
              className="btn-ghost-cyber !py-2 !px-4 !text-xs"
            >
              ↺ Restart
            </button>
          </div>
        </div>
      </header>

      {/* Mobile TOC dropdown */}
      <div className="md:hidden mb-6">
        <button
          onClick={() => setTocOpen((v) => !v)}
          className="w-full flex items-center justify-between border border-border rounded px-4 py-3 text-sm text-cyber-white bg-surface"
        >
          <span className="font-mono-cyber text-xs text-muted-foreground">CHAPTER {chapter + 1}</span>
          <span className="text-accent">{tocOpen ? "▲" : "▼"}</span>
        </button>
        {tocOpen && (
          <div className="mt-2 border border-border rounded bg-surface max-h-72 overflow-auto">
            {book.chapters.map((c: { title: string; body: string }, i: number) => (
              <button
                key={i}
                onClick={() => setChapter(i)}
                className={`block w-full text-left text-sm px-4 py-2.5 border-b border-border/40 ${i === chapter ? "text-accent bg-accent/5" : "text-muted-foreground hover:text-cyber-white"}`}
              >
                <span className="font-mono-cyber text-[10px] mr-2">{String(i + 1).padStart(2, "0")}</span>
                {c.title}
              </button>
            ))}
          </div>
        )}
      </div>

      <div ref={readerRef} className="grid md:grid-cols-[220px_1fr] gap-8 scroll-mt-24">
        <nav className="hidden md:block md:sticky md:top-32 md:self-start space-y-1 max-h-[calc(100vh-10rem)] overflow-auto pr-2">
          <div className="eyebrow mb-2">Chapters</div>
          {book.chapters.map((c: { title: string; body: string }, i: number) => (
            <button
              key={i}
              onClick={() => setChapter(i)}
              className={`block w-full text-left text-sm px-3 py-2 rounded border ${i === chapter ? "border-accent text-accent bg-accent/5" : "border-border text-muted-foreground hover:text-cyber-white hover:border-accent/40"}`}
            >
              <span className="font-mono-cyber text-[10px] mr-2 opacity-60">{String(i + 1).padStart(2, "0")}</span>
              {c.title}
            </button>
          ))}
        </nav>

        <section className="card-cyber rounded p-6 sm:p-10">
          {/* Reader controls */}
          <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
            <span className="font-mono-cyber text-xs text-muted-foreground">
              Chapter {chapter + 1} of {book.chapters.length}
            </span>
            <div className="flex items-center gap-1" aria-label="Adjust font size">
              <button
                onClick={() => setFontIdx((i) => Math.max(0, i - 1))}
                disabled={fontIdx === 0}
                className="px-2 py-1 border border-border rounded text-xs text-cyber-white disabled:opacity-30"
                aria-label="Decrease font size"
              >
                A−
              </button>
              <button
                onClick={() => setFontIdx((i) => Math.min(FONT_SIZES.length - 1, i + 1))}
                disabled={fontIdx === FONT_SIZES.length - 1}
                className="px-2 py-1 border border-border rounded text-xs text-cyber-white disabled:opacity-30"
                aria-label="Increase font size"
              >
                A+
              </button>
            </div>
          </div>

          <h2 className="font-display font-bold text-2xl sm:text-3xl text-cyber-white mb-6">{ch.title}</h2>

          {ch.images && ch.images.length > 0 && (
            <figure className="mb-8 rounded overflow-hidden border border-border">
              <img
                src={ch.images[0]}
                alt={`${ch.title} — illustration`}
                loading="lazy"
                className="w-full h-64 sm:h-80 object-cover"
              />
              <figcaption className="px-4 py-2 text-xs font-mono-cyber text-muted-foreground bg-surface border-t border-border">
                FIG. {chapter + 1}.1 — {ch.title.replace(/^Chapter \d+:\s*/, "")}
              </figcaption>
            </figure>
          )}

          {(() => {
            const paragraphs = ch.body.split(/\n\n+/);
            const extraImgs = ch.images?.slice(1) ?? [];
            return paragraphs.map((para: string, i: number) => (
              <div key={i}>
                <p className={`text-cyber-text leading-relaxed mb-6 ${FONT_SIZES[fontIdx]}`}>
                  {para}
                </p>
                {extraImgs[i] && (
                  <figure className="my-8 rounded overflow-hidden border border-border">
                    <img
                      src={extraImgs[i]}
                      alt={`${ch.title} — figure ${i + 2}`}
                      loading="lazy"
                      className="w-full h-56 sm:h-72 object-cover"
                    />
                    <figcaption className="px-4 py-2 text-xs font-mono-cyber text-muted-foreground bg-surface border-t border-border">
                      FIG. {chapter + 1}.{i + 2} — Visual reference
                    </figcaption>
                  </figure>
                )}
              </div>
            ));
          })()}

          <div className="mt-10 pt-6 border-t border-border flex items-center justify-between gap-3">
            <button
              disabled={chapter === 0}
              onClick={goPrev}
              className="btn-ghost-cyber !py-2 !px-4 !text-xs disabled:opacity-30"
            >
              ← Previous
            </button>
            <span className="hidden sm:block font-mono-cyber text-xs text-muted-foreground">
              Use ← → keys to navigate
            </span>
            <button
              disabled={chapter === book.chapters.length - 1}
              onClick={goNext}
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
