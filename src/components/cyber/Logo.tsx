import { Link } from "@tanstack/react-router";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-3 group">
      <div className="relative w-10 h-10 flex items-center justify-center clip-hex bg-gradient-accent shadow-glow">
        <span className="text-background text-xl font-black">🛡</span>
      </div>
      <div className="leading-none">
        <div className="font-display font-black text-lg tracking-widest text-cyber-white">
          CYBER<span className="text-accent">SEC</span>
        </div>
        <div className="font-mono-cyber text-[10px] tracking-[0.3em] text-muted-foreground mt-0.5">
          UPDATES // v2.5
        </div>
      </div>
    </Link>
  );
}
