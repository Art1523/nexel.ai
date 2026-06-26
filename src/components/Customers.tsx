const logos = ["Lumen", "Vector", "Northwind", "Helios", "Parallax", "Quanta", "Orbital", "Specter", "Forge", "Atlas"];

const testimonials = [
  {
    quote: "Nexel collapsed three vendor contracts into one and cut our data-to-decision time from days to minutes. It feels like having a 12-person data team on retainer.",
    author: "Mara Vidal",
    role: "VP Data · Northwind",
  },
  {
    quote: "The agent runtime is the first system we've trusted to auto-remediate pipeline failures in production. Audit story alone paid for the platform.",
    author: "Priya Subramanian",
    role: "Director of Platform · Helios",
  },
  {
    quote: "We moved off Fivetran + dbt + a custom orchestrator. Same SLAs, a quarter of the headcount, and our analysts ship features without waiting on us.",
    author: "Jonas Weber",
    role: "Head of Engineering · Parallax",
  },
];

export function Customers() {
  return (
    <section id="customers" className="py-20 lg:py-28 border-t border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="text-center font-display text-[11px] tracking-[.24em] uppercase text-[color:var(--muted)]">
          Trusted by data teams shipping at the edge of scale
        </p>

        {/* Marquee */}
        <div className="mt-10 overflow-hidden relative" style={{ maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)" }}>
          <div className="marquee-track flex gap-14 w-max">
            {[...logos, ...logos].map((l, i) => (
              <span key={i} className="font-display text-2xl lg:text-3xl tracking-tight text-[color:var(--muted)] hover:text-[var(--paper)] transition-colors">
                {l.toLowerCase()}<span className="text-[var(--yellow)]">.</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {testimonials.map((t, i) => (
            <figure key={i} className="card p-7 flex flex-col">
              <svg width="22" height="22" viewBox="0 0 24 24" className="text-[var(--yellow)]" fill="currentColor" aria-hidden>
                <path d="M7.17 6A5.17 5.17 0 0 0 2 11.17V18h6.83v-6.83H5.5A1.67 1.67 0 0 1 7.17 9.5V6Zm10 0A5.17 5.17 0 0 0 12 11.17V18h6.83v-6.83H15.5A1.67 1.67 0 0 1 17.17 9.5V6Z" />
              </svg>
              <blockquote className="mt-4 text-[15px] leading-relaxed text-[var(--paper)]">"{t.quote}"</blockquote>
              <figcaption className="mt-6 pt-5 border-t border-[var(--line)]">
                <div className="font-display text-sm">{t.author}</div>
                <div className="text-xs text-[color:var(--muted)] mt-0.5">{t.role}</div>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-14 grid sm:grid-cols-3 gap-3">
          {[
            ["SOC 2", "Type II audited"],
            ["GDPR · HIPAA", "Enterprise compliant"],
            ["99.99%", "Uptime SLA"],
          ].map(([k, v]) => (
            <div key={k} className="card p-6 flex items-center justify-between">
              <span className="font-display text-2xl tracking-tight">{k}</span>
              <span className="text-xs text-[color:var(--muted)]">{v}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
