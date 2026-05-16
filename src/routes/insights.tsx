import { createFileRoute } from "@tanstack/react-router";
import { INSIGHTS } from "@/lib/cyber-data";
import { InsightCard } from "@/components/cyber/Cards";
import { PageHero } from "@/components/cyber/PageHero";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — CyberSec Updates" },
      {
        name: "description",
        content:
          "Long-form cybersecurity research: ransomware reports, AI threat analysis, infrastructure briefs, and industry trends.",
      },
      { property: "og:title", content: "Insights — CyberSec Updates" },
      { property: "og:description", content: "Deep-dive cybersecurity research and analysis." },
      { property: "og:url", content: "https://cyberthreatwatch.lovable.app/insights" },
    ],
    links: [{ rel: "canonical", href: "https://cyberthreatwatch.lovable.app/insights" }],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="Research"
        title="Insights"
        subtitle="Original research, annual reports, and policy briefs from the CyberSec network."
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6 lg:grid-cols-2">
          {INSIGHTS.map((i) => (
            <InsightCard key={i.id} item={i} />
          ))}
        </div>
      </section>
    </>
  );
}
