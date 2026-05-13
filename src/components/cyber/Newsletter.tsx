import { useState } from "react";
import { addSubscriber } from "@/lib/subscribers";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [state, setState] = useState<"idle" | "ok" | "error">("idle");
  const [msg, setMsg] = useState("");

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = addSubscriber(email);
    if (r.ok) {
      setState("ok");
      setMsg("✓ SUBSCRIBED — WELCOME TO THE NETWORK");
    } else {
      setState("error");
      setMsg(r.reason === "duplicate" ? "Already subscribed." : "Please enter a valid email.");
    }
  };

  return (
    <section className="relative overflow-hidden border-y border-border bg-surface">
      <div className="absolute inset-0 grid-bg opacity-50" />
      <div className="relative max-w-3xl mx-auto px-6 py-16 text-center">
        <div className="text-5xl mb-4 animate-pulse-glow">📡</div>
        <h2 className="section-title mb-3">Stay in the Loop</h2>
        <p className="text-muted-foreground max-w-xl mx-auto mb-8">
          Real-time threat intelligence, curated news, and deep-dive analysis
          delivered to your inbox.
        </p>
        {state === "ok" ? (
          <div className="font-mono-cyber text-cyber-green text-sm tracking-widest">{msg}</div>
        ) : (
          <form onSubmit={onSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="agent@domain.com"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setState("idle"); }}
              className="input-cyber"
            />
            <button type="submit" className="btn-cyber">Subscribe</button>
          </form>
        )}
        {state === "error" && (
          <div className="mt-3 font-mono-cyber text-cyber-red text-xs">{msg}</div>
        )}
      </div>
    </section>
  );
}
