import { useRef, useState } from "react";
import { useIsMobile } from "@/hooks/useIsMobile";
import { IconArrowPath, IconCog, IconPie, IconLink, IconShield, IconTrendingUp, IconChevronDown } from "./Icons";

export type Feature = {
  id: string;
  title: string;
  blurb: string;
  body: string;
  icon: React.ReactNode;
  size: "lg" | "md" | "sm";
  accent?: "yellow" | "saffron" | "mint";
  visual: React.ReactNode;
};

const features: Feature[] = [
  {
    id: "agents",
    title: "Self-improving agent fleet",
    blurb: "Spin up specialised agents — extractor, validator, enricher — that learn from every run.",
    body: "Each agent ships with a typed contract, a reasoning trace and an evaluator. Promote, pause or branch any policy without re-deploying. Built-in evals catch regressions before they hit production.",
    icon: <IconCog width={18} height={18} />,
    size: "lg",
    accent: "yellow",
    visual: <AgentFleetVisual />,
  },
  {
    id: "pipelines",
    title: "Visual pipelines, code-grade",
    blurb: "Drag a step in, get a typed, version-controlled pipeline out.",
    body: "Every node compiles to deterministic SQL and Python. Branching, retries, side-effects and back-pressure are first-class. Roll back any deploy in one click.",
    icon: <IconArrowPath width={18} height={18} />,
    size: "md",
    visual: <PipelineVisual />,
  },
  {
    id: "insights",
    title: "Insight surfacing",
    blurb: "Anomalies, trends and cohort shifts pushed to the right channel.",
    body: "Forecasting and root-cause models run continuously across your warehouse.",
    icon: <IconTrendingUp width={18} height={18} />,
    size: "md",
    accent: "saffron",
    visual: <InsightsVisual />,
  },
  {
    id: "connect",
    title: "200+ connectors",
    blurb: "Snowflake, BigQuery, Postgres, Kafka, S3, Stripe, Salesforce — out of the box.",
    body: "Bring your own connector with a 40-line TypeScript SDK.",
    icon: <IconLink width={18} height={18} />,
    size: "sm",
    visual: <ConnectorsVisual />,
  },
  {
    id: "governance",
    title: "Governance & policy",
    blurb: "Row-level masking, lineage, audit-ready evidence on every record.",
    body: "PII detection runs at ingest. Every prompt, model and output is signed and reproducible.",
    icon: <IconShield width={18} height={18} />,
    size: "sm",
    accent: "mint",
    visual: <GovernanceVisual />,
  },
  {
    id: "metrics",
    title: "One source of metric truth",
    blurb: "Semantic layer that BI, agents and apps query identically.",
    body: "Define a metric once. Slack, dashboards, agents and reverse-ETL all return the same number.",
    icon: <IconPie width={18} height={18} />,
    size: "md",
    visual: <MetricsVisual />,
  },
];

export function FeatureSection() {
  const isMobile = useIsMobile(768);
  // Shared persisted activeIndex across bento and accordion
  const [active, setActive] = useState(0);

  return (
    <section id="features" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="max-w-2xl">
          <div className="chip"><span className="dot" /> The platform</div>
          <h2 className="mt-5 font-display text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-semibold">
            Six surfaces. One <span className="text-[var(--yellow)]">autonomous</span> data stack.
          </h2>
          <p className="mt-5 text-[color:var(--muted)] text-[17px]">
            The same primitives power exploratory notebooks and mission-critical pipelines. No vendor lock-in, no glue code.
          </p>
        </header>

        <div className="mt-12">
          {isMobile === null ? (
            // Pre-hydration skeleton — matches SSR markup so both desktop and
            // mobile users avoid a mount-flash before the viewport is known.
            <div aria-hidden className="min-h-[420px] rounded-2xl border border-[var(--line)] bg-white/[.02]" />
          ) : isMobile ? (
            <FeatureAccordion features={features} active={active} setActive={setActive} />
          ) : (
            <FeatureBento features={features} active={active} setActive={setActive} />
          )}
        </div>

      </div>
    </section>
  );
}

function FeatureBento({ features, active, setActive }: { features: Feature[]; active: number; setActive: (n: number) => void }) {
  return (
    <div className="grid grid-cols-12 auto-rows-[180px] gap-4">
      {features.map((f, i) => {
        const span =
          f.size === "lg" ? "col-span-12 lg:col-span-7 row-span-2"
          : f.size === "md" ? "col-span-6 lg:col-span-5 row-span-2"
          : "col-span-6 lg:col-span-4 row-span-2";
        const isActive = active === i;
        return (
          <BentoCard
            key={f.id}
            feature={f}
            className={span}
            isActive={isActive}
            onActivate={() => setActive(i)}
          />
        );
      })}
    </div>
  );
}

function BentoCard({ feature, className, isActive, onActivate }: { feature: Feature; className: string; isActive: boolean; onActivate: () => void }) {
  const ref = useRef<HTMLButtonElement>(null);
  function onMove(e: React.MouseEvent) {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  }
  const accent = feature.accent === "saffron" ? "var(--saffron)" : feature.accent === "mint" ? "var(--mint)" : "var(--yellow)";
  return (
    <button
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      className={`card text-left p-6 flex flex-col ${className} ${isActive ? "ring-1 ring-white/15" : ""}`}
      style={{ ["--accent" as string]: accent }}
    >
      <span className="card-spot" />
      <div className="flex items-center justify-between">
        <span className="w-9 h-9 grid place-items-center rounded-lg border border-[var(--line)] text-[var(--paper)] bg-white/[.03]" style={{ color: accent }}>
          {feature.icon}
        </span>
        <span className="font-display text-[10px] tracking-[.18em] uppercase text-[color:var(--muted)]">0{features.indexOf(feature) + 1}</span>
      </div>
      <h3 className="mt-5 font-display text-lg lg:text-xl tracking-tight leading-snug">{feature.title}</h3>
      <p className="mt-2 text-sm text-[color:var(--muted)] line-clamp-2">{feature.blurb}</p>
      <div className="mt-auto pt-4 flex-1 min-h-0 -mx-2 -mb-2">
        <div className="h-full w-full rounded-xl overflow-hidden">{feature.visual}</div>
      </div>
    </button>
  );
}

function FeatureAccordion({ features, active, setActive }: { features: Feature[]; active: number; setActive: (n: number) => void }) {
  return (
    <div className="divide-y divide-[var(--line)] border border-[var(--line)] rounded-2xl overflow-hidden">
      {features.map((f, i) => {
        const open = i === active;
        return (
          <div key={f.id}>
            <button
              onClick={() => setActive(i)}
              aria-expanded={open}
              className="w-full flex items-center gap-4 px-5 py-4 text-left transition-colors duration-200 hover:bg-white/[.03]"
            >
              <span className="w-9 h-9 grid place-items-center rounded-lg border border-[var(--line)] bg-white/[.03] text-[var(--yellow)]">{f.icon}</span>
              <span className="flex-1">
                <span className="block font-display text-[15px] tracking-tight">{f.title}</span>
                <span className="block text-xs text-[color:var(--muted)] mt-0.5 line-clamp-1">{f.blurb}</span>
              </span>
              <span className={`text-[color:var(--muted)] transition-transform duration-300 ${open ? "rotate-180" : ""}`}>
                <IconChevronDown width={18} height={18} />
              </span>
            </button>
            <div className={`acc-panel ${open ? "open" : ""}`}>
              <div>
                <div className="px-5 pb-5 pt-1 text-sm text-[color:var(--muted)] space-y-4">
                  <p>{f.body}</p>
                  <div className="h-44 rounded-xl overflow-hidden border border-[var(--line)] bg-white/[.02]">{f.visual}</div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ---------- mini visuals (pure SVG/CSS) ---------- */

function AgentFleetVisual() {
  return (
    <div className="relative h-full w-full bg-gradient-to-br from-white/[.04] to-transparent">
      <svg viewBox="0 0 400 200" className="absolute inset-0 w-full h-full">
        <defs>
          <linearGradient id="ln" x1="0" x2="1">
            <stop offset="0" stopColor="#FFC801" stopOpacity="0" />
            <stop offset=".5" stopColor="#FFC801" stopOpacity=".8" />
            <stop offset="1" stopColor="#FFC801" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[40, 100, 160].map((y, i) => (
          <g key={i}>
            <line x1="20" y1={y} x2="380" y2={y} stroke="rgba(241,246,244,.08)" />
            <line x1="20" y1={y} x2="380" y2={y} stroke="url(#ln)" strokeWidth="1.5" strokeDasharray="6 200" style={{ animation: `dash ${6 + i}s linear infinite` }} />
          </g>
        ))}
        {[
          [60, 40, "Extract"], [180, 40, "Validate"], [300, 40, "Enrich"],
          [80, 100, "Score"], [220, 100, "Reconcile"],
          [120, 160, "Publish"], [260, 160, "Notify"],
        ].map(([x, y, l], i) => (
          <g key={i} transform={`translate(${x},${y})`}>
            <rect x="-44" y="-12" width="88" height="24" rx="12" fill="#172B36" stroke="rgba(241,246,244,.14)" />
            <circle cx="-30" cy="0" r="3" fill="#FFC801" />
            <text x="-22" y="4" fontSize="10" fill="#F1F6F4" fontFamily="JetBrains Mono">{l as string}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function PipelineVisual() {
  return (
    <div className="relative h-full w-full p-3">
      <div className="grid grid-cols-3 gap-2 h-full">
        {["ingest.kafka", "transform.dbt", "deliver.api"].map((n, i) => (
          <div key={n} className="rounded-lg border border-[var(--line)] bg-[var(--ink-soft)]/60 p-3 flex flex-col justify-between">
            <div className="text-[10px] tracking-widest uppercase text-[color:var(--muted)] font-display">step 0{i+1}</div>
            <div className="font-display text-xs">{n}</div>
            <div className="flex gap-1">
              {Array.from({ length: 8 }).map((_, k) => <span key={k} className="h-1 flex-1 rounded-full" style={{ background: k < 6 ? "var(--yellow)" : "rgba(241,246,244,.1)" }} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function InsightsVisual() {
  const points = "0,40 20,36 40,32 60,34 80,24 100,28 120,18 140,22 160,12 180,16 200,8";
  return (
    <div className="relative h-full w-full">
      <svg viewBox="0 0 200 60" className="w-full h-full" preserveAspectRatio="none">
        <polyline points={points} fill="none" stroke="#FF9932" strokeWidth="1.5" />
        <polyline points={`${points} 200,60 0,60`} fill="rgba(255,153,50,.18)" stroke="none" />
        <circle cx="160" cy="12" r="3" fill="#FF9932" />
        <circle cx="160" cy="12" r="6" fill="none" stroke="#FF9932" style={{ transformOrigin: "160px 12px", animation: "pulse-ring 1.6s ease-out infinite" }} />
      </svg>
      <div className="absolute right-3 top-3 text-[10px] font-display text-[var(--saffron)] tnum">+18.4%</div>
    </div>
  );
}

function ConnectorsVisual() {
  const logos = ["snow", "bq", "pg", "kfk", "s3", "stp", "sf", "gh"];
  return (
    <div className="grid grid-cols-4 gap-1 p-2 h-full">
      {logos.map((l) => (
        <div key={l} className="rounded-md border border-[var(--line)] bg-white/[.02] grid place-items-center font-display text-[10px] uppercase text-[color:var(--muted)]">{l}</div>
      ))}
    </div>
  );
}

function GovernanceVisual() {
  return (
    <div className="h-full w-full p-3 flex flex-col gap-1.5 font-display text-[10px]">
      {[
        ["user.email", "•••@nexel.ai", true],
        ["card.pan", "•••• 4242", true],
        ["country", "DE", false],
        ["plan", "enterprise", false],
      ].map(([k, v, masked], i) => (
        <div key={i} className="flex items-center justify-between rounded-md border border-[var(--line)] px-2 py-1.5 bg-white/[.02]">
          <span className="text-[color:var(--muted)]">{k}</span>
          <span className={masked ? "text-[var(--mint)]" : ""}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function MetricsVisual() {
  return (
    <div className="h-full w-full grid grid-cols-3 gap-2 p-2">
      {[
        ["ARR", "$42.1M"],
        ["NRR", "131%"],
        ["MAU", "2.4M"],
      ].map(([k, v]) => (
        <div key={k} className="rounded-lg border border-[var(--line)] bg-[var(--ink-soft)]/60 p-3 flex flex-col justify-between">
          <div className="font-display text-[10px] uppercase tracking-widest text-[color:var(--muted)]">{k}</div>
          <div className="font-display text-lg tnum">{v}</div>
        </div>
      ))}
    </div>
  );
}
