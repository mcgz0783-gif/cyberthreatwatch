import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import type { BookItem, BlogPost, InsightItem } from "@/lib/cyber-data";
import { generateBookPdf } from "@/lib/pdf";

export function Tag({ children, color }: { children: ReactNode; color?: string }) {
  return (
    <span
      className="tag-cyber"
      style={color ? { color, borderColor: color } : { color: "var(--accent)" }}
    >
      {children}
    </span>
  );
}

interface NewsItem {
  cat: string; color: string; title: string; date: string;
  read: string; summary: string; tags: string[]; icon: string;
}

export function NewsCard({ item }: { item: NewsItem }) {
  return (
    <article className="card-cyber p-6 flex flex-col gap-3 h-full rounded">
      <div className="flex items-center justify-between">
        <Tag color={item.color}>{item.cat}</Tag>
        <span className="font-mono-cyber text-xs text-muted-foreground">{item.date}</span>
      </div>
      <div className="flex items-start gap-3">
        <div className="text-3xl">{item.icon}</div>
        <h3 className="font-display font-bold text-lg text-cyber-white leading-tight">
          {item.title}
        </h3>
      </div>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {item.summary}
      </p>
      <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-border">
        {item.tags.map((t) => (
          <Tag key={t}>{t}</Tag>
        ))}
        <span className="ml-auto font-mono-cyber text-xs text-muted-foreground">
          ⏱ {item.read}
        </span>
      </div>
    </article>
  );
}

export function BlogCard({ item }: { item: BlogPost }) {
  return (
    <Link
      to="/blog/$slug"
      params={{ slug: item.slug }}
      className="card-cyber rounded overflow-hidden flex flex-col h-full hover:border-accent transition group"
    >
      <div className="relative h-44 overflow-hidden bg-surface">
        <img
          src={item.cover}
          alt={item.title}
          loading="lazy"
          className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
        <div className="absolute top-3 left-3 text-2xl">{item.img}</div>
        {item.featured && (
          <span className="absolute top-3 right-3 tag-cyber !text-cyber-white !border-cyber-white bg-background/40 backdrop-blur-sm">
            ★ FEATURED
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Tag>{item.cat}</Tag>
        <h3 className="font-display font-bold text-lg text-cyber-white leading-tight group-hover:text-accent transition">
          {item.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {item.summary}
        </p>
        <div className="flex items-center justify-between pt-3 border-t border-border text-xs font-mono-cyber text-muted-foreground">
          <span>{item.author}</span>
          <span>⏱ {item.read}</span>
        </div>
      </div>
    </Link>
  );
}

export function BookCard({ item }: { item: BookItem }) {
  const handleDownload = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    generateBookPdf({
      title: item.title,
      author: item.author,
      year: item.year,
      chapters: item.chapters,
    });
  };

  return (
    <article className="card-cyber rounded overflow-hidden flex flex-col h-full">
      <Link to="/books/$id" params={{ id: String(item.id) }} className="block group">
        <div className="h-44 bg-surface border-b border-border relative overflow-hidden">
          <img
            src={item.cover}
            alt={item.title}
            loading="lazy"
            className="w-full h-full object-cover opacity-70 group-hover:opacity-100 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
          <div className="absolute bottom-2 left-2 text-3xl drop-shadow-lg">{item.icon}</div>
          <span className="absolute top-2 right-2 tag-cyber bg-background/70 backdrop-blur-sm">{item.year}</span>
        </div>
      </Link>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <Tag>{item.cat}</Tag>
        <Link to="/books/$id" params={{ id: String(item.id) }}>
          <h3 className="font-display font-bold text-base text-cyber-white leading-tight hover:text-accent transition">
            {item.title}
          </h3>
        </Link>
        <div className="text-xs font-mono-cyber text-muted-foreground">
          by {item.author} · {item.pages}p · {item.chapters.length} chapters
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{item.desc}</p>
        <div className="flex gap-2 pt-3 border-t border-border">
          <Link
            to="/books/$id"
            params={{ id: String(item.id) }}
            className="btn-cyber !py-1.5 !px-3 !text-xs flex-1 text-center"
          >
            📖 Read
          </Link>
          <button
            onClick={handleDownload}
            className="btn-ghost-cyber !py-1.5 !px-3 !text-xs flex-1"
          >
            ⬇ PDF
          </button>
        </div>
      </div>
    </article>
  );
}

export function InsightCard({ item }: { item: InsightItem }) {
  return (
    <Link
      to="/insights/$slug"
      params={{ slug: item.slug }}
      className="card-cyber rounded p-6 flex gap-5 h-full hover:border-accent transition group"
    >
      <div className="shrink-0 w-20 h-20 rounded overflow-hidden bg-gradient-accent flex items-center justify-center text-3xl shadow-glow relative">
        <img src={item.cover} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50" loading="lazy" />
        <span className="relative">{item.img}</span>
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Tag>{item.cat}</Tag>
          <span className="font-mono-cyber text-xs text-muted-foreground">{item.date}</span>
        </div>
        <h3 className="font-display font-bold text-lg text-cyber-white leading-tight group-hover:text-accent transition">
          {item.title}
        </h3>
        <div className="border-l-2 border-accent pl-3 text-sm text-cyber-text italic">
          🔑 {item.key}
        </div>
        <div className="flex items-center justify-between pt-2 text-xs font-mono-cyber text-muted-foreground mt-auto">
          <span>{item.author}</span>
          <span>⏱ {item.read}</span>
        </div>
      </div>
    </Link>
  );
}

export function SectionHeader({
  eyebrow, title, subtitle,
}: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="mb-10 max-w-3xl">
      {eyebrow && <div className="eyebrow mb-3">▸ {eyebrow}</div>}
      <h2 className="section-title">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-muted-foreground text-base sm:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
