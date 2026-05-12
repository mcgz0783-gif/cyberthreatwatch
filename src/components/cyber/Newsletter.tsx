import { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4 animate-pulse-glow">📡</div>
        <h2 className="section-title mb-3">Stay in the Loop</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Real-time threat intelligence, curated news, and deep-dive analysis
          delivered weekly to your inbox.
        </p>
        {sent ? (
          <div className="font-mono-cyber text-cyber-green text-sm tracking-widest">
            ✓ SUBSCRIBED — WELCOME TO THE NETWORK
          </div>
        ) : (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (email) setSent(true);
            }}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <input
              type="email"
              required
              placeholder="agent@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input-cyber"
            />
            <button type="submit" className="btn-cyber">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
