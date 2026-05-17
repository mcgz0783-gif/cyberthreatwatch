import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — CyberSec Updates" },
      { name: "description", content: "Submit a tip, request research, or get in touch with the CyberSec Updates team." },
      { property: "og:title", content: "Contact — CyberSec Updates" },
      { property: "og:description", content: "Reach the CyberSec Updates team — tips, research, partnerships." },
      { property: "og:url", content: "https://cyberhawk-ug.store/contact" },
    ],
    links: [{ rel: "canonical", href: "https://cyberhawk-ug.store/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  return (
    <>
      <PageHero
        eyebrow="// open channel"
        title="Contact"
        subtitle="Tips, research collaboration, press inquiries — drop a secure line."
      />
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid gap-10 lg:grid-cols-[1fr_2fr]">
        <aside className="space-y-6">
          {[
            { icon: "📧", label: "Email", val: "ops@cybersec.updates", href: "mailto:ops@cybersec.updates" },
            { icon: "📞", label: "Phone", val: "0783 699 626", href: "tel:+254783699626" },
            { icon: "💬", label: "WhatsApp", val: "0788 213 106", href: "https://wa.me/254788213106" },
            { icon: "🔐", label: "PGP Key", val: "0xDEAD BEEF C0DE F00D" },
            { icon: "🛰️", label: "Signal", val: "@cybersec.42" },
            { icon: "🌐", label: "HQ", val: "Distributed / Global" },
          ].map((c) => (
            <div key={c.label} className="card-cyber rounded p-5">
              <div className="text-2xl mb-2">{c.icon}</div>
              <div className="font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mb-1">
                {c.label}
              </div>
              {c.href ? (
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="font-mono-cyber text-sm text-cyber-white break-all hover:text-accent transition"
                >
                  {c.val}
                </a>
              ) : (
                <div className="font-mono-cyber text-sm text-cyber-white break-all">{c.val}</div>
              )}
            </div>
          ))}
        </aside>

        <div className="card-cyber rounded p-8">
          {sent ? (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">✓</div>
              <div className="font-display font-bold text-2xl text-cyber-white uppercase tracking-widest mb-2">
                Transmission Received
              </div>
              <p className="text-muted-foreground">
                We'll respond on the same channel within 24-48 hours.
              </p>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
              }}
              className="space-y-4"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mb-2">
                    Name
                  </label>
                  <input required value={form.name} onChange={update("name")} className="input-cyber" placeholder="Agent name" />
                </div>
                <div>
                  <label className="block font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mb-2">
                    Email
                  </label>
                  <input required type="email" value={form.email} onChange={update("email")} className="input-cyber" placeholder="you@domain.com" />
                </div>
              </div>
              <div>
                <label className="block font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mb-2">
                  Subject
                </label>
                <input required value={form.subject} onChange={update("subject")} className="input-cyber" placeholder="Tip / research / press" />
              </div>
              <div>
                <label className="block font-mono-cyber text-[11px] tracking-widest text-muted-foreground uppercase mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={6}
                  value={form.message}
                  onChange={update("message")}
                  className="input-cyber resize-y"
                  placeholder="Encrypted preferred. Plain text accepted."
                />
              </div>
              <button type="submit" className="btn-cyber w-full">
                ▸ Transmit Message
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
