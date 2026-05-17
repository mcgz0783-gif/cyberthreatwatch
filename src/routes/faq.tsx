import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/cyber/PageHero";
import { useState } from "react";

const FAQS = [
  { q: "Is CyberSec Updates free?", a: "Yes. All news, insights, blog posts, books, and tools are free. No account required." },
  { q: "How do I download a book as PDF?", a: "Open any book from the Library and click the ⬇ Download PDF button. The full book is generated in your browser and downloaded instantly — no servers involved." },
  { q: "Where do tool links go?", a: "Each tool in the toolkit opens the respective free public platform: VirusTotal for hashes, Kaspersky cybermap for live attacks, NIST NVD for CVEs, OpenVPN for VPN, AbuseIPDB for IP reputation, and so on." },
  { q: "Is my newsletter email shared?", a: "No. Subscriptions are stored locally in your browser via localStorage. There is no backend collecting them." },
  { q: "Can I republish your articles?", a: "Reach out via the contact form. Most content is available under a non-commercial attribution license." },
  { q: "How often is content updated?", a: "News updates daily, insights weekly, blog posts and the library monthly." },
  { q: "Do you support mobile?", a: "Yes — the site is fully responsive across phones, tablets, desktops, and works on every modern browser and OS." },
  { q: "How do I report a security issue with this site?", a: "Email us via the contact page. We follow a 90-day coordinated disclosure window." },
];

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ — CyberSec Updates" },
      { name: "description", content: "Frequently asked questions about CyberSec Updates: how to read books, download PDFs, use the toolkit, and manage your subscription." },
      { property: "og:title", content: "FAQ — CyberSec Updates" },
      { property: "og:description", content: "Common questions about the publication, library, and toolkit." },
      { property: "og:url", content: "https://cyberhawk-ug.store/faq" },
    ],
    links: [{ rel: "canonical", href: "https://cyberhawk-ug.store/faq" }],
    scripts: [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: FAQS.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }),
    }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <>
      <PageHero eyebrow="Help" title="FAQ" subtitle="Common questions about the publication, library, and toolkit." />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-3">
        {FAQS.map((f, i) => (
          <details
            key={i}
            open={open === i}
            onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open ? i : null)}
            className="card-cyber rounded p-5 group"
          >
            <summary className="cursor-pointer flex justify-between items-center font-display text-cyber-white text-base">
              {f.q}
              <span className="text-accent ml-3 group-open:rotate-45 transition">+</span>
            </summary>
            <p className="mt-3 text-cyber-text leading-relaxed">{f.a}</p>
          </details>
        ))}
      </section>
    </>
  );
}
