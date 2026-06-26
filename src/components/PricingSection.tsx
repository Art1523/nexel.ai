import { memo, useMemo } from "react";
import { IconCheck, IconArrowRight } from "./Icons";
import {
  type Currency,
  type Billing,
  setBilling,
  setCurrency,
  useBilling,
  useCurrency,
} from "./pricingStore";

const ANNUAL_DISCOUNT = 0.2; // exactly 20%

type Plan = { tier: string; tagline: string; basePrice: number | null; features: string[]; cta: string; featured?: boolean };
const pricingMatrix: Plan[] = [
  {
    tier: "Starter",
    tagline: "For analytics teams getting hands-on with agents.",
    basePrice: 49,
    features: ["Up to 3 active pipelines", "10 GB ingest / mo", "5 connectors", "Community support", "Single workspace"],
    cta: "Start free",
  },
  {
    tier: "Growth",
    tagline: "Production workloads with SLAs and team controls.",
    basePrice: 249,
    features: ["Unlimited pipelines", "1 TB ingest / mo", "All 200+ connectors", "Role-based access", "Priority support 24/5", "Custom agent policies"],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    tier: "Enterprise",
    tagline: "Self-hosted or VPC, with white-glove onboarding.",
    basePrice: null,
    features: ["VPC / on-prem deploy", "Unlimited ingest", "SSO · SCIM · audit logs", "Dedicated success engineer", "Custom model hosting", "99.99% uptime SLA"],
    cta: "Talk to sales",
  },
];

const currencyConfig: Record<Currency, { symbol: string; multiplier: number; regionalFactor: number; locale: string }> = {
  USD: { symbol: "$", multiplier: 1, regionalFactor: 1, locale: "en-US" },
  EUR: { symbol: "€", multiplier: 0.92, regionalFactor: 1, locale: "en-GB" },
  INR: { symbol: "₹", multiplier: 83, regionalFactor: 0.85, locale: "en-IN" },
};

function computePrice(basePrice: number, currency: Currency, billing: Billing) {
  const cfg = currencyConfig[currency];
  const monthly = basePrice * cfg.multiplier * cfg.regionalFactor;
  const final = billing === "annual" ? monthly * (1 - ANNUAL_DISCOUNT) : monthly;
  return Math.round(final);
}

function format(amount: number, currency: Currency) {
  const cfg = currencyConfig[currency];
  return `${cfg.symbol}${amount.toLocaleString(cfg.locale)}`;
}

export function PricingSection() {
  return (
    <section id="pricing" className="relative py-24 lg:py-32 border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <header className="max-w-2xl">
          <div className="chip"><span className="dot" /> Pricing</div>
          <h2 className="mt-5 font-display text-[34px] sm:text-[44px] lg:text-[54px] leading-[1.05] tracking-[-0.03em] font-semibold">
            Pay for outcomes,<br />not seats.
          </h2>
          <p className="mt-5 text-[color:var(--muted)] text-[17px]">
            Transparent, usage-aware pricing. Switch plans any time — your pipelines never miss a tick.
          </p>
        </header>

        <div className="mt-10 flex flex-wrap items-center gap-4">
          <BillingToggle />
          <CurrencySelector />
          <AnnualBadge />
        </div>

        <div className="mt-10 grid lg:grid-cols-3 gap-4">
          {pricingMatrix.map((p) => (
            <PricingCard key={p.tier} plan={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

// Isolated subscribers — each reads only the slice it needs from the external store.

function AnnualBadge() {
  const billing = useBilling();
  if (billing !== "annual") return null;
  return (
    <span className="text-xs font-display tracking-wider uppercase text-[var(--yellow)]">Save 20% billed annually</span>
  );
}

function BillingToggle() {
  const billing = useBilling();
  return (
    <div role="tablist" aria-label="Billing period" className="inline-flex p-1 rounded-full border border-[var(--line)] bg-white/[.03]">
      {(["monthly", "annual"] as const).map((b) => (
        <button
          key={b}
          role="tab"
          aria-selected={billing === b}
          onClick={() => setBilling(b)}
          className={`px-4 py-1.5 rounded-full text-sm font-display tracking-tight transition-colors duration-200 ${billing === b ? "bg-[var(--paper)] text-[var(--ink)]" : "text-[color:var(--muted)] hover:text-[var(--paper)]"}`}
        >
          {b === "monthly" ? "Monthly" : "Annual"}
        </button>
      ))}
    </div>
  );
}

function CurrencySelector() {
  const currency = useCurrency();
  const items: Currency[] = ["USD", "EUR", "INR"];
  return (
    <div role="radiogroup" aria-label="Currency" className="inline-flex p-1 rounded-full border border-[var(--line)] bg-white/[.03]">
      {items.map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={currency === c}
          onClick={() => setCurrency(c)}
          className={`px-3 py-1.5 rounded-full text-sm font-display tnum transition-colors duration-200 ${currency === c ? "bg-[var(--paper)] text-[var(--ink)]" : "text-[color:var(--muted)] hover:text-[var(--paper)]"}`}
        >
          {currencyConfig[c].symbol} {c}
        </button>
      ))}
    </div>
  );
}

// PricingCard does NOT subscribe to the store — it never re-renders on toggle.
// Only the PriceDisplay child (which subscribes) updates its text nodes.
const PricingCard = memo(function PricingCard({ plan }: { plan: Plan }) {
  return (
    <article className={`card relative p-7 flex flex-col transition-transform duration-300 hover:-translate-y-1 ${plan.featured ? "ring-1 ring-[var(--yellow)]/50" : ""}`}>
      {plan.featured && (
        <span className="absolute -top-3 left-7 chip" style={{ background: "var(--yellow)", color: "var(--ink)", borderColor: "transparent" }}>
          Most popular
        </span>
      )}
      <h3 className="font-display text-xl tracking-tight">{plan.tier}</h3>
      <p className="mt-2 text-sm text-[color:var(--muted)] min-h-[40px]">{plan.tagline}</p>

      <div className="mt-6">
        <PriceDisplay basePrice={plan.basePrice} />
      </div>

      <a href="#" className={`btn mt-6 justify-center ${plan.featured ? "btn-primary" : "btn-ghost"}`}>
        {plan.cta} <IconArrowRight width={16} height={16} />
      </a>

      <div className="hairline mt-7" />
      <ul className="mt-5 space-y-3 text-sm">
        {plan.features.map((f) => (
          <li key={f} className="flex items-start gap-3">
            <span className="mt-0.5 text-[var(--yellow)]"><IconCheck width={16} height={16} /></span>
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </article>
  );
});

// Subscribes to the store; the toggle/currency change re-renders only this leaf,
// which mutates the price text nodes — no parent reflow.
function PriceDisplay({ basePrice }: { basePrice: number | null }) {
  const currency = useCurrency();
  const billing = useBilling();
  const value = useMemo(
    () => (basePrice == null ? null : computePrice(basePrice, currency, billing)),
    [basePrice, currency, billing],
  );

  if (value == null) {
    return (
      <div>
        <div className="font-display text-5xl tracking-tight">Custom</div>
        <div className="text-xs text-[color:var(--muted)] mt-1">Tailored to your scale</div>
      </div>
    );
  }
  return (
    <div>
      <div className="flex items-baseline gap-1.5">
        <span className="font-display text-5xl tracking-tight tnum">{format(value, currency)}</span>
        <span className="text-sm text-[color:var(--muted)]">/ mo</span>
      </div>
      <div className="text-xs text-[color:var(--muted)] mt-1">
        {billing === "annual" ? `billed annually · ${format(value * 12, currency)} / yr` : "billed monthly"}
      </div>
    </div>
  );
}
