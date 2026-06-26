import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { IconSearch, IconArrowRight, IconX } from "./Icons";

const links = [
  { label: "Platform", href: "#features" },
  { label: "Workflows", href: "#workflows" },
  { label: "Pricing", href: "#pricing" },
  { label: "Customers", href: "#customers" },
  { label: "Docs", href: "#docs" },
];

export function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => { document.documentElement.style.overflow = ""; };
  }, [open]);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-[color:var(--ink)]/70 border-b border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 h-16 flex items-center justify-between gap-3">
        <Logo />
        <nav className="hidden md:flex items-center gap-1 text-sm text-[color:var(--muted)]">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="px-3 py-2 rounded-full hover:text-[var(--paper)] hover:bg-white/[.04] transition-colors duration-150">
              {l.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <button aria-label="Search" className="hidden md:inline-flex w-9 h-9 items-center justify-center rounded-full border border-[var(--line)] text-[color:var(--muted)] hover:text-[var(--paper)] hover:border-white/20 transition-colors">
            <IconSearch width={16} height={16} />
          </button>
          <a href="#pricing" className="btn btn-ghost hidden sm:inline-flex">Sign in</a>
          <a href="#pricing" className="btn btn-primary hidden sm:inline-flex">
            Start free <IconArrowRight width={16} height={16} />
          </a>
          <button
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden w-10 h-10 grid place-items-center rounded-full border border-[var(--line)] text-[var(--paper)]"
          >
            {open ? <IconX width={18} height={18} /> : (
              <span className="flex flex-col gap-[5px]">
                <span className="block w-4 h-px bg-current" />
                <span className="block w-4 h-px bg-current" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile sheet */}
      <div
        className={`md:hidden overflow-hidden transition-[max-height,opacity] duration-300 ${open ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"}`}
        aria-hidden={!open}
      >
        <div className="px-5 pb-6 pt-2 border-t border-[var(--line)] bg-[color:var(--ink)]/95 backdrop-blur-md">
          <nav className="flex flex-col">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="py-3.5 border-b border-[var(--line)] font-display text-base flex items-center justify-between text-[var(--paper)]"
              >
                {l.label}
                <IconArrowRight width={14} height={14} className="text-[color:var(--muted)]" />
              </a>
            ))}
          </nav>
          <div className="mt-5 flex flex-col gap-2">
            <a href="#pricing" onClick={() => setOpen(false)} className="btn btn-ghost justify-center w-full">Sign in</a>
            <a href="#pricing" onClick={() => setOpen(false)} className="btn btn-primary justify-center w-full">
              Start free <IconArrowRight width={16} height={16} />
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
