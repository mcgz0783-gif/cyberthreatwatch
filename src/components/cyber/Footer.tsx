import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-md">
            Real-time cybersecurity intelligence, threat analysis, and deep-dive
            research for defenders, builders, and decision-makers.
          </p>
          <div className="flex gap-3 font-mono-cyber text-xs text-muted-foreground">
            <span>SECURE</span>
            <span className="text-accent">/</span>
            <span>CURATED</span>
            <span className="text-accent">/</span>
            <span>INDEPENDENT</span>
          </div>
        </div>
        <div>
          <h4 className="font-display font-bold text-cyber-white text-sm tracking-widest uppercase mb-4">
            Sections
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/news" className="hover:text-accent transition">News</Link></li>
            <li><Link to="/insights" className="hover:text-accent transition">Insights</Link></li>
            <li><Link to="/blog" className="hover:text-accent transition">Blog</Link></li>
            <li><Link to="/books" className="hover:text-accent transition">Books</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-display font-bold text-cyber-white text-sm tracking-widest uppercase mb-4">
            Company
          </h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/about" className="hover:text-accent transition">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition">Contact</Link></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row gap-3 items-center justify-between text-xs font-mono-cyber text-muted-foreground">
          <span>© {new Date().getFullYear()} CYBERSEC UPDATES // ALL SYSTEMS NOMINAL</span>
          <span className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyber-green animate-blink" />
            UPLINK_STATUS: SECURE
          </span>
        </div>
      </div>
    </footer>
  );
}
