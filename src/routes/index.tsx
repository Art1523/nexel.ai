import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { FeatureSection } from "@/components/FeatureSection";
import { PricingSection } from "@/components/PricingSection";
import { Customers } from "@/components/Customers";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nexel — Autonomous data automation for modern teams" },
      { name: "description", content: "Nexel orchestrates self-improving AI agents that ingest, model, govern and deliver your data — from raw streams to executive-ready insight, in minutes." },
      { property: "og:title", content: "Nexel — Autonomous data automation for modern teams" },
      { property: "og:description", content: "Self-improving AI agents for data ingestion, modeling, governance and delivery. Pay for outcomes, not seats." },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://nexel.app/" },
      { name: "twitter:title", content: "Nexel — Autonomous data automation for modern teams" },
      { name: "twitter:description", content: "Self-improving AI agents for data ingestion, modeling, governance and delivery. Pay for outcomes, not seats." },
    ],
    links: [{ rel: "canonical", href: "https://nexel.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Nexel",
          url: "https://nexel.app/",
          logo: "https://nexel.app/favicon.ico",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Nexel",
          url: "https://nexel.app/",
        }),
      },
    ],
  }),
  component: LandingPage,
});

function LandingPage() {
  return (
    <main>
      <Navbar />
      <Hero />
      <FeatureSection />
      <PricingSection />
      <Customers />
      <Footer />
    </main>
  );
}
