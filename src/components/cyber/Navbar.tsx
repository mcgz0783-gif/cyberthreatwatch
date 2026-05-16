import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";

const NAV: Array<{ label: string; to: string }> = [
  { label: "Home", to: "/" },
  { label: "News", to: "/news" },
  { label: "Insights", to: "/insights" },
  { label: "Blog", to: "/blog" },
  { label: "Books", to: "/books" },
  { label: "Tools", to: "/tools" },
  { label: "FAQ", to: "/faq" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 border-b ${
        scrolled
          ? "bg-background/90 backdrop-blur-md border-border shadow-lg"
          : "bg-background/60 backdrop-blur-sm border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Logo />

        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <Link key={n.to} to={n.to} activeOptions={{ exact: n.to === "/" }} className="nav-link">
              {n.label}
            </Link>
          ))}
          <Link to="/contact" className="btn-cyber !py-2 !px-5 !text-xs">
            Subscribe
          </Link>
        </nav>

        <button
          aria-label="Toggle menu"
          onClick={() => setMobileOpen((v) => !v)}
          className="md:hidden text-accent border border-border px-3 py-1.5 rounded text-lg"
        >
          {mobileOpen ? "✕" : "☰"}
        </button>
      </div>

      {mobileOpen && (
        <nav className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <div className="flex flex-col px-6 py-4">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                activeOptions={{ exact: n.to === "/" }}
                onClick={() => setMobileOpen(false)}
                className="nav-link py-3 border-b border-border/40"
              >
                {n.label}
              </Link>
            ))}
          </div>
        </nav>
      )}
    </header>
  );
}
