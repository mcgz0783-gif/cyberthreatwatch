import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — CyberSec Updates" },
      { name: "description", content: "How CyberSec Updates handles your data, cookies, and newsletter subscriptions." },
      { property: "og:title", content: "Privacy Policy — CyberSec Updates" },
      { property: "og:description", content: "How CyberSec Updates handles your data and protects your privacy." },
      { property: "og:url", content: "https://cyberthreatwatch.lovable.app/privacy" },
    ],
    links: [{ rel: "canonical", href: "https://cyberthreatwatch.lovable.app/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="Last updated: May 2026" />
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8 text-cyber-text leading-relaxed">
        <div>
          <h2 className="font-display text-xl text-cyber-white mb-2">1. What we collect</h2>
          <p>CyberSec Updates is a static publication. We do not run a backend database. Email addresses you submit to our newsletter form are stored locally in your browser only — they never leave your device.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cyber-white mb-2">2. Cookies</h2>
          <p>We do not set tracking cookies. Our hosting provider may log standard request metadata (IP, user-agent) for abuse prevention.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cyber-white mb-2">3. Third-party links</h2>
          <p>Our toolkit links to external services (VirusTotal, Kaspersky, OpenVPN, NIST NVD, etc.). Their privacy policies apply when you visit them.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cyber-white mb-2">4. Your rights</h2>
          <p>You may clear your local subscription at any time by clearing browser storage for this site. Contact us via the contact form for any other requests.</p>
        </div>
        <div>
          <h2 className="font-display text-xl text-cyber-white mb-2">5. Contact</h2>
          <p>Questions about this policy? Reach us through the <a href="/contact" className="text-accent hover:underline">contact page</a>.</p>
        </div>
      </section>
    </>
  );
}
