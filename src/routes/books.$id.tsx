import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { BOOKS } from "@/lib/cyber-data";
import { generateBookPdf } from "@/lib/pdf";
import { recordChapterDwell, recordChapterView } from "@/lib/analytics";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

const BASE = "https://cyberhawk-ug.store";

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
            hasPart: loaderData.book.chapters.map((c: { title: string }, i: number) => ({
              "@type": "Chapter",
              name: c.title,
              position: i + 1,
            })),
          }),
        }]
      : [],
  }),
});

const FONT_SIZES = ["text-sm", "text-base", "text-lg", "text-xl"] as const;

// Helper: upgrade Unsplash URL with a specific width/quality
const sized = (url: string, w: number, q = 70) =>
  url.replace(/[?&]w=\d+/, "").replace(/[?&]q=\d+/, "") + `&w=${w}&q=${q}`;

interface Lightbox {
  src: string;
  caption: string;
}

function BookReader() {
  const { book } = Route.useLoaderData();
  const storageKey = `cw:book:${book.id}`;
  const [chapter, setChapter] = useState(0);
  const [fontIdx, setFontIdx] = useState(1);
  const [tocOpen, setTocOpen] = useState(false);
  const [overviewOpen, setOverviewOpen] = useState(false);
  const [lightbox, setLightbox] = useState<Lightbox | null>(null);
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

  // Reading analytics — record a view + dwell time per chapter
  useEffect(() => {
    recordChapterView(String(book.id), book.title, chapter);
    const start = Date.now();
    const flush = (completed?: boolean) => {
      const secs = (Date.now() - start) / 1000;
      recordChapterDwell(String(book.id), book.title, chapter, secs, completed);
    };
    const onHide = () => { if (document.visibilityState === "hidden") flush(); };
    document.addEventListener("visibilitychange", onHide);
    window.addEventListener("pagehide", () => flush());
    return () => {
      document.removeEventListener("visibilitychange", onHide);
      const isLast = chapter === book.chapters.length - 1;
      flush(isLast);
    };
  }, [chapter, book.id, book.title, book.chapters.length]);

  const ch = book.chapters[chapter];
  const progress = ((chapter + 1) / book.chapters.length) * 100;

  const goPrev = useCallback(() => setChapter((c) => Math.max(0, c - 1)), []);
  const goNext = useCallback(
    () => setChapter((c) => Math.min(book.chapters.length - 1, c + 1)),
    [book.chapters.length],
  );

  // Per-chapter dynamic SEO — updates title, description, canonical, og tags
  useEffect(() => {
    if (typeof document === "undefined") return;
    const chapterUrl = `${BASE}/books/${book.id}?ch=${chapter + 1}`;
    const desc = `${ch.title} from "${book.title}" by ${book.author}. ${book.desc}`.slice(0, 280);
    document.title = `${ch.title} · ${book.title} — CyberSec Library`;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.head.querySelector<HTMLMetaElement>(selector);
      if (!el) {
        el = document.createElement("meta");
        const [, k, v] = selector.match(/\[(\w+)="([^"]+)"\]/) || [];
        if (k && v) el.setAttribute(k, v);
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };
    setMeta('meta[name="description"]', "content", desc);
    setMeta('meta[property="og:title"]', "content", `${ch.title} · ${book.title}`);
    setMeta('meta[property="og:description"]', "content", desc);
    setMeta('meta[property="og:url"]', "content", chapterUrl);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.setAttribute("rel", "canonical");
      document.head.appendChild(canonical);
    }
    canonical.setAttribute("href", chapterUrl);
  }, [chapter, ch.title, book.id, book.title, book.author, book.desc]);

  // Sync chapter to ?ch= query param (deep-link support, no full nav)
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const q = Number(params.get("ch"));
    if (Number.isFinite(q) && q >= 1 && q <= book.chapters.length) {
      setChapter(q - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("ch", String(chapter + 1));
    window.history.replaceState(null, "", url.toString());
  }, [chapter]);

  // Keyboard nav (+ Esc to close lightbox)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (lightbox) {
        if (e.key === "Escape") setLightbox(null);
        return;
      }
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [goPrev, goNext, lightbox]);

  // Lock body scroll while lightbox is open
  useEffect(() => {
    if (typeof document === "undefined") return;
    document.body.style.overflow = lightbox ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightbox]);

  // Preload next chapter's first image to avoid flash on Next
  const nextFirstImg = book.chapters[chapter + 1]?.images?.[0];
  useEffect(() => {
    if (!nextFirstImg || typeof window === "undefined") return;
    const img = new Image();
    img.src = sized(nextFirstImg, 800);
  }, [nextFirstImg]);

  const paragraphs = useMemo(() => ch.body.split(/\n\n+/), [ch.body]);
  const extraImgs = ch.images?.slice(1) ?? [];

  const openLightbox = (src: string, caption: string) =>
    setLightbox({ src: sized(src, 1600, 80), caption });

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
        <img
          src={sized(book.cover, 400)}
          alt={book.title}
          width={200}
          height={280}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          className="w-full rounded border border-border shadow-glow"
        />
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

      {/* Table of Contents overview (collapsible, full chapter listing) */}
      <section className="mb-10 border border-border rounded card-cyber overflow-hidden" aria-label="Table of contents">
        <button
          onClick={() => setOverviewOpen((v) => !v)}
          className="w-full flex items-center justify-between px-5 py-4 bg-surface hover:bg-surface/70 transition"
          aria-expanded={overviewOpen}
        >
          <span className="flex items-center gap-3">
            <span className="eyebrow !mb-0">▸ Table of Contents</span>
            <span className="font-mono-cyber text-[10px] text-muted-foreground">
              {book.chapters.length} chapters · {book.pages}p
            </span>
          </span>
          <span className="text-accent text-sm">{overviewOpen ? "− Hide" : "+ Show all"}</span>
        </button>
        {overviewOpen && (
          <ol className="divide-y divide-border/40">
            {book.chapters.map((c: typeof book.chapters[number], i: number) => (
              <li key={i}>
                <button
                  onClick={() => setChapter(i)}
                  className={`group w-full text-left flex items-start gap-4 px-5 py-3.5 ${i === chapter ? "bg-accent/5" : "hover:bg-surface/40"}`}
                >
                  <span className={`font-mono-cyber text-xs shrink-0 w-8 ${i === chapter ? "text-accent" : "text-muted-foreground"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1">
                    <span className={`block font-display text-sm font-semibold ${i === chapter ? "text-accent" : "text-cyber-white group-hover:text-accent"} transition`}>
                      {c.title}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-0.5 line-clamp-2">
                      {c.body.slice(0, 140)}…
                    </span>
                  </span>
                  {c.images && c.images.length > 0 && (
                    <span className="font-mono-cyber text-[10px] text-muted-foreground shrink-0 hidden sm:block">
                      🖼 {c.images.length}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>

      {/* Mobile TOC dropdown (current chapter quick jump) */}
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
            {book.chapters.map((c: typeof book.chapters[number], i: number) => (
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
          {book.chapters.map((c: typeof book.chapters[number], i: number) => (
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
            <figure className="mb-8 rounded overflow-hidden border border-border group">
              <button
                type="button"
                onClick={() => openLightbox(ch.images![0], `FIG. ${chapter + 1}.1 — ${ch.title.replace(/^Chapter \d+:\s*/, "")}`)}
                className="block w-full relative cursor-zoom-in"
                aria-label="Open figure in lightbox"
              >
                <img
                  src={sized(ch.images[0], 1000)}
                  alt={`${ch.title} — illustration`}
                  width={1000}
                  height={500}
                  loading="eager"
                  decoding="async"
                  className="w-full h-64 sm:h-80 object-cover transition group-hover:opacity-90"
                />
                <span className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm border border-border rounded px-2 py-1 text-[10px] font-mono-cyber text-cyber-white opacity-0 group-hover:opacity-100 transition">
                  ⤢ ZOOM
                </span>
              </button>
              <figcaption className="px-4 py-2 text-xs font-mono-cyber text-muted-foreground bg-surface border-t border-border">
                FIG. {chapter + 1}.1 — {ch.title.replace(/^Chapter \d+:\s*/, "")}
              </figcaption>
            </figure>
          )}

          {paragraphs.map((para: string, i: number) => {
            const caption = `FIG. ${chapter + 1}.${i + 2} — Visual reference`;
            return (
              <div key={i}>
                <p className={`text-cyber-text leading-relaxed mb-6 ${FONT_SIZES[fontIdx]}`}>
                  {para}
                </p>
                {extraImgs[i] && (
                  <figure className="my-8 rounded overflow-hidden border border-border group">
                    <button
                      type="button"
                      onClick={() => openLightbox(extraImgs[i], caption)}
                      className="block w-full relative cursor-zoom-in"
                      aria-label="Open figure in lightbox"
                    >
                      <img
                        src={sized(extraImgs[i], 900)}
                        alt={`${ch.title} — figure ${i + 2}`}
                        width={900}
                        height={450}
                        loading="lazy"
                        decoding="async"
                        className="w-full h-56 sm:h-72 object-cover transition group-hover:opacity-90"
                      />
                      <span className="absolute top-2 right-2 bg-background/70 backdrop-blur-sm border border-border rounded px-2 py-1 text-[10px] font-mono-cyber text-cyber-white opacity-0 group-hover:opacity-100 transition">
                        ⤢ ZOOM
                      </span>
                    </button>
                    <figcaption className="px-4 py-2 text-xs font-mono-cyber text-muted-foreground bg-surface border-t border-border">
                      {caption}
                    </figcaption>
                  </figure>
                )}
              </div>
            );
          })}

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

      {/* Lightbox modal */}
      {lightbox && (
        <div
          className="fixed inset-0 z-[100] bg-background/95 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 animate-in fade-in"
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.caption}
          onClick={() => setLightbox(null)}
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-border bg-surface/80 backdrop-blur text-cyber-white text-xl flex items-center justify-center hover:bg-accent hover:text-background transition"
            aria-label="Close lightbox"
          >
            ✕
          </button>
          <figure
            className="max-w-6xl w-full max-h-full flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.caption}
              className="w-full h-auto max-h-[80vh] object-contain rounded border border-border bg-black"
              decoding="async"
            />
            <figcaption className="mt-3 text-center font-mono-cyber text-xs text-cyber-white">
              {lightbox.caption}
              <span className="block mt-1 text-muted-foreground">Press ESC or click outside to close</span>
            </figcaption>
          </figure>
        </div>
      )}
    </article>
  );
}
