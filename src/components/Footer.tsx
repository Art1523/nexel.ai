import { useState } from "react";
import { Logo } from "./Logo";
import { IconArrowRight, IconCheck } from "./Icons";

const cols = [
  { title: "Product", links: ["Platform", "Agents", "Pipelines", "Governance", "Changelog"] },
  { title: "Solutions", links: ["Analytics teams", "Engineering", "Finance ops", "Marketing", "Healthcare"] },
  { title: "Resources", links: ["Docs", "API reference", "Status", "Blog", "Customer stories"] },
  { title: "Company", links: ["About", "Careers", "Security", "Contact", "Press"] },
];

export function Footer() {
  const [sent, setSent] = useState(false);
  return (
    <footer className="relative border-t border-[var(--line)]">
      {/* CTA band */}
      <div className="mx-auto max-w-7xl px-5 lg:px-8 py-16 sm:py-20">
        <div className="card relative p-8 sm:p-10 lg:p-14 overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" aria-hidden />
          <div className="relative grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl tracking-[-0.03em] leading-[1.05] font-semibold">
                Ship your first agent<br /><span className="text-[color:var(--muted)]">before stand-up tomorrow.</span>
              </h2>
            </div>
            {sent ? (
              <div className="flex items-center gap-3 rounded-full border border-[var(--yellow)]/40 bg-[var(--yellow)]/10 px-5 py-3 text-sm">
                <span className="grid place-items-center w-6 h-6 rounded-full bg-[var(--yellow)] text-[var(--ink)]">
                  <IconCheck width={14} height={14} />
                </span>
                Check your inbox — onboarding link on the way.
              </div>
            ) : (
              <form className="flex flex-col sm:flex-row gap-2" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
                <label className="sr-only" htmlFor="email">Work email</label>
                <input id="email" type="email" required placeholder="you@company.com"
                  className="flex-1 bg-white/[.04] border border-[var(--line)] rounded-full px-5 py-3 text-sm placeholder:text-[color:var(--muted)] focus:outline-none focus:border-[var(--yellow)] transition-colors" />
                <button className="btn btn-primary justify-center">Get started <IconArrowRight width={16} height={16} /></button>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 lg:px-8 pb-12">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-10">
          <div className="col-span-2">
            <Logo />
            <p className="mt-4 text-sm text-[color:var(--muted)] max-w-xs">
              The autonomous data automation platform for teams that refuse to choose between speed and trust.
            </p>
            <div className="mt-6 flex gap-2">
              {["x", "li", "gh", "yt"].map((s) => (
                <a key={s} href="#" aria-label={s} className="w-9 h-9 grid place-items-center rounded-full border border-[var(--line)] text-[color:var(--muted)] hover:text-[var(--paper)] hover:border-white/20 transition-colors font-display text-xs uppercase">
                  {s}
                </a>
              ))}
            </div>
          </div>
          {cols.map((c) => (
            <div key={c.title}>
              <div className="font-display text-xs uppercase tracking-[.18em] text-[color:var(--muted)]">{c.title}</div>
              <ul className="mt-4 space-y-2.5 text-sm">
                {c.links.map((l) => (
                  <li key={l}><a href="#" className="hover:text-[var(--yellow)] transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="hairline mt-12" />
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[color:var(--muted)]">
          <span>© {new Date().getFullYear()} Nexel Systems Inc. All rights reserved.</span>
          <span className="font-display tracking-widest">v3.2.1 · all systems nominal <span className="inline-block w-1.5 h-1.5 rounded-full bg-[var(--yellow)] align-middle" /></span>
        </div>
      </div>
    </footer>
  );
}
