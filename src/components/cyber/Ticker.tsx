import { TICKER_ITEMS } from "@/lib/cyber-data";

export function Ticker() {
  const all = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-surface border-y border-border">
      <div className="flex items-center">
        <div className="shrink-0 px-4 py-2 bg-accent text-accent-foreground font-mono-cyber text-xs tracking-widest flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyber-red animate-blink" />
          LIVE FEED
        </div>
        <div className="flex-1 overflow-hidden">
          <div className="flex animate-ticker whitespace-nowrap">
            {all.map((item, i) => (
              <span
                key={i}
                className="px-8 py-2 font-mono-cyber text-sm text-cyber-text"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
