import type { ReactNode } from "react";

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

interface BlogItem {
  title: string; author: string; date: string; read: string;
  cat: string; summary: string; img: string; featured: boolean;
}

export function BlogCard({ item }: { item: BlogItem }) {
  return (
    <article className="card-cyber rounded overflow-hidden flex flex-col h-full">
      <div className="relative h-40 bg-gradient-accent flex items-center justify-center text-6xl">
        {item.img}
        {item.featured && (
          <span className="absolute top-3 left-3 tag-cyber !text-cyber-white !border-cyber-white bg-background/40 backdrop-blur-sm">
            ★ FEATURED
          </span>
        )}
      </div>
      <div className="p-6 flex flex-col gap-3 flex-1">
        <Tag>{item.cat}</Tag>
        <h3 className="font-display font-bold text-lg text-cyber-white leading-tight">
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
    </article>
  );
}

interface BookItem {
  title: string; author: string; year: number; cat: string;
  desc: string; pages: number; icon: string;
}

export function BookCard({ item }: { item: BookItem }) {
  return (
    <article className="card-cyber rounded overflow-hidden flex flex-col h-full">
      <div className="h-40 bg-surface border-b border-border flex items-center justify-center text-6xl relative">
        {item.icon}
        <span className="absolute top-2 right-2 tag-cyber">{item.year}</span>
      </div>
      <div className="p-5 flex flex-col gap-2 flex-1">
        <Tag>{item.cat}</Tag>
        <h3 className="font-display font-bold text-base text-cyber-white leading-tight">
          {item.title}
        </h3>
        <div className="text-xs font-mono-cyber text-muted-foreground">
          by {item.author} · {item.pages}p
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">
          {item.desc}
        </p>
        <div className="flex gap-2 pt-3 border-t border-border">
          <button className="btn-cyber !py-1.5 !px-3 !text-xs flex-1">📖 Read</button>
          <button className="btn-ghost-cyber !py-1.5 !px-3 !text-xs flex-1">⬇ PDF</button>
        </div>
      </div>
    </article>
  );
}

interface InsightItem {
  title: string; author: string; date: string; read: string;
  cat: string; key: string; img: string;
}

export function InsightCard({ item }: { item: InsightItem }) {
  return (
    <article className="card-cyber rounded p-6 flex gap-5 h-full">
      <div className="shrink-0 w-16 h-16 rounded bg-gradient-accent flex items-center justify-center text-3xl shadow-glow">
        {item.img}
      </div>
      <div className="flex-1 flex flex-col gap-3">
        <div className="flex items-center justify-between gap-3">
          <Tag>{item.cat}</Tag>
          <span className="font-mono-cyber text-xs text-muted-foreground">{item.date}</span>
        </div>
        <h3 className="font-display font-bold text-lg text-cyber-white leading-tight">
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
    </article>
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
