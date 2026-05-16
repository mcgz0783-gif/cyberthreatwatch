import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/cyber/PageHero";
import { SectionHeader } from "@/components/cyber/Cards";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — CyberSec Updates" },
      {
        name: "description",
        content:
          "CyberSec Updates is an independent cybersecurity intelligence platform serving defenders, builders, and researchers worldwide.",
      },
      { property: "og:title", content: "About — CyberSec Updates" },
      { property: "og:description", content: "Who we are and why we built CyberSec Updates." },
      { property: "og:url", content: "https://cyberthreatwatch.lovable.app/about" },
    ],
    links: [{ rel: "canonical", href: "https://cyberthreatwatch.lovable.app/about" }],
  }),
  component: AboutPage,
});

const VALUES = [
  {
    icon: "🎯",
    title: "Signal Over Noise",
    desc: "We curate ruthlessly. No clickbait, no PR-driven coverage — just what defenders need to know.",
  },
  {
    icon: "🔬",
    title: "Research First",
    desc: "Every claim is sourced. Every IoC is verified. We cite, we link, we show our work.",
  },
  {
    icon: "🌐",
    title: "Independent",
    desc: "No vendor sponsorships influence editorial. Our readers are our customers.",
  },
  {
    icon: "⚡",
    title: "Real-Time",
    desc: "Threat intel delivered in minutes, not days. The wire is live 24/7/365.",
  },
];

function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="// who we are"
        title="About CyberSec Updates"
        subtitle="An independent intelligence platform built by security practitioners for security practitioners."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert max-w-none space-y-5 text-cyber-text leading-relaxed text-lg">
          <p>
            CyberSec Updates was founded in 2023 by a small team of incident responders, threat
            intel analysts, and red team operators frustrated by the fragmented state of
            cybersecurity reporting. Critical disclosures buried under press releases. Ransomware
            coverage written for executives instead of the people actually defending the network.
          </p>
          <p>
            We built the platform we wished existed: a real-time feed of vetted threat intelligence,
            deep-dive analysis from working practitioners, and a curated knowledge base — all
            without paywalls, sponsored content, or vendor influence.
          </p>
          <p>
            Today we serve over 80,000 security professionals across more than 60 countries, from
            solo SOC analysts to Fortune 100 CISOs.
          </p>
        </div>
      </section>

      <section className="bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <SectionHeader eyebrow="Operating Principles" title="What We Stand For" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((v) => (
              <div key={v.title} className="card-cyber rounded p-6">
                <div className="text-3xl mb-3">{v.icon}</div>
                <h3 className="font-display font-bold text-cyber-white uppercase tracking-wide text-sm mb-2">
                  {v.title}
                </h3>
                <p className="text-sm text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
