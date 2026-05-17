import type { ReactNode } from "react";

export function PageHero({
  eyebrow, title, subtitle, children,
}: { eyebrow: string; title: string; subtitle?: string; children?: ReactNode }) {
  return (
    <section className="relative overflow-hidden border-b border-border bg-gradient-hero">
      <div className="absolute inset-0 grid-bg opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
        <div className="eyebrow mb-4">▸ {eyebrow}</div>
        <h1 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl text-cyber-white tracking-tight uppercase leading-[1.05] text-glow">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-5 max-w-2xl text-base sm:text-lg text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </section>
  );
}
