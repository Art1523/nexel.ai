import { useEffect, useRef, useState } from "react";
import { IconArrowRight, IconBolt, IconArrowPath, IconCube, IconPie, IconCog, IconCheck } from "./Icons";

const HEADLINE_LINE_1 = ["Data", "automation,"];
const HEADLINE_LINE_2 = ["engineered", "by"];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-grid pointer-events-none" aria-hidden />
      {/* Ambient teal + saffron glows behind glass */}
      <div className="pointer-events-none absolute -top-32 -left-32 w-[520px] h-[520px] rounded-full bg-[var(--teal)]/30 blur-[120px]" aria-hidden />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-[460px] h-[460px] rounded-full bg-[var(--yellow)]/10 blur-[140px]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-5 lg:px-8 pt-14 pb-20 sm:pt-20 sm:pb-24 lg:pt-28 lg:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          <div className="lg:col-span-7">
            <div className="chip rise"><span className="dot" /> New · Agent runtime v3.2 shipped</div>

            <h1 className="mt-5 font-display text-[36px] sm:text-[52px] lg:text-[72px] leading-[1.03] tracking-[-0.035em] font-semibold">
              <span className="block">
                {HEADLINE_LINE_1.map((w, i) => (
                  <span key={w} className="word" style={{ animationDelay: `${0.08 + i * 0.08}s` }}>
                    {w}{i < HEADLINE_LINE_1.length - 1 ? "\u00A0" : ""}
                  </span>
                ))}
              </span>
              <span className="block text-[color:var(--muted)]">
                {HEADLINE_LINE_2.map((w, i) => (
                  <span key={w} className="word" style={{ animationDelay: `${0.28 + i * 0.08}s` }}>
                    {w}{"\u00A0"}
                  </span>
                ))}
                <span className="relative inline-block align-baseline">
                  <span className="stamp inline-block bg-[var(--yellow)] text-[var(--ink)] px-2.5 sm:px-3 rounded-md" style={{ animationDelay: "0.48s" }}>
                    agents
                  </span>
                </span>
              </span>
            </h1>

            <p className="rise rise-3 mt-5 sm:mt-6 max-w-xl text-[15px] sm:text-[17px] leading-relaxed text-[color:var(--muted)]">
              Nexel orchestrates a fleet of self-improving AI agents that ingest, clean, enrich and route your data — from raw event streams to executive-ready dashboards, in minutes, not quarters.
            </p>
            <div className="rise rise-4 mt-7 sm:mt-8 flex flex-wrap gap-3">
              <a href="#pricing" className="btn btn-primary">Start 14-day trial <IconArrowRight width={16} height={16} /></a>
              <a href="#features" className="btn btn-ghost">Watch product tour</a>
            </div>
            <ul className="rise rise-5 mt-7 sm:mt-8 flex flex-wrap gap-x-6 gap-y-2 text-[13px] sm:text-sm text-[color:var(--muted)]">
              {["SOC 2 Type II", "GDPR · HIPAA", "Deploys in your VPC"].map((t) => (
                <li key={t} className="inline-flex items-center gap-2"><IconCheck width={16} height={16} className="text-[var(--yellow)]" /> {t}</li>
              ))}
            </ul>
          </div>

          {/* Hero visual */}
          <div className="lg:col-span-5 rise rise-2 -mx-2 sm:mx-0">
            <HeroVisual />
          </div>
        </div>

        {/* Hero stat strip */}
        <div className="rise rise-5 mt-12 sm:mt-16 grid grid-cols-2 sm:grid-cols-4 gap-px rounded-2xl border border-[var(--line)] overflow-hidden bg-[var(--line)]">
          <StatCell value={12} suffix="m" label="avg time-to-insight" />
          <StatCell value={98.4} suffix="%" decimals={1} label="agent accuracy" />
          <StatCell value={200} suffix="+" label="native connectors" />
          <StatCell value={99.99} suffix="%" decimals={2} label="uptime SLA" />
        </div>
      </div>
    </section>
  );
}

function StatCell({ value, suffix, decimals = 0, label }: { value: number; suffix?: string; decimals?: number; label: string }) {
  const display = useCountUp(value, 1400, decimals);
  return (
    <div className="bg-[var(--ink)] px-5 py-5 sm:py-6">
      <div className="font-display text-2xl sm:text-3xl tracking-tight tnum">
        {display}{suffix && <span className="text-[color:var(--muted)]">{suffix}</span>}
      </div>
      <div className="mt-1 text-xs text-[color:var(--muted)]">{label}</div>
    </div>
  );
}

function useCountUp(target: number, duration = 1200, decimals = 0) {
  const [val, setVal] = useState(0);
  const ref = useRef<number | null>(null);
  const started = useRef(false);
  useEffect(() => {
    if (started.current) return;
    started.current = true;
    if (typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setVal(target);
      return;
    }
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setVal(target * eased);
      if (t < 1) ref.current = requestAnimationFrame(tick);
    };
    ref.current = requestAnimationFrame(tick);
    return () => { if (ref.current) cancelAnimationFrame(ref.current); };
  }, [target, duration]);
  return decimals > 0 ? val.toFixed(decimals) : Math.round(val).toString();
}

function HeroVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const [pxy, setPxy] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      setPxy({ x, y });
    };
    const onLeave = () => setPxy({ x: 0, y: 0 });
    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => { el.removeEventListener("mousemove", onMove); el.removeEventListener("mouseleave", onLeave); };
  }, []);

  const px = (mult: number) => ({
    transform: `translate3d(${pxy.x * mult}px, ${pxy.y * mult}px, 0)`,
    transition: "transform 280ms cubic-bezier(.2,.7,.2,1)",
  });

  return (
    <div ref={wrap} className="relative aspect-square max-w-[520px] mx-auto">
      {/* Soft ambient rings */}
      <div className="absolute inset-0 grid place-items-center pointer-events-none" aria-hidden style={px(-6)}>
        <div className="absolute w-[96%] h-[96%] rounded-full border border-white/5" />
        <div className="absolute w-[78%] h-[78%] rounded-full border border-white/10" />
      </div>

      {/* Main frosted glass panel */}
      <div className="absolute inset-[6%] glass rounded-[36px] overflow-hidden" style={px(6)}>
        <div className="glass-shine" />
        {/* Inner aurora */}
        <div className="absolute -top-24 -left-16 w-72 h-72 rounded-full bg-[var(--teal)]/45 blur-[70px]" />
        <div className="absolute -bottom-20 -right-10 w-64 h-64 rounded-full bg-[var(--yellow)]/15 blur-[80px]" />

        <div className="relative h-full w-full p-5 sm:p-6 flex flex-col justify-between">
          {/* Header row */}
          <div className="flex items-start justify-between">
            <div className="flex flex-col gap-1">
              <span className="font-display text-[10px] tracking-[0.22em] uppercase text-[color:var(--muted)]">Kernel · v3.2</span>
              <span className="font-display text-base text-[var(--paper)]">Agent core</span>
            </div>
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[var(--yellow)] to-[var(--saffron)] p-[1px]">
              <div className="w-full h-full rounded-full bg-[var(--ink)] grid place-items-center">
                <span className="w-2 h-2 rounded-full bg-[var(--yellow)] shadow-[0_0_10px_var(--yellow)]" />
              </div>
            </div>
          </div>

          {/* Concentric frosted rings + core */}
          <div className="flex-1 relative grid place-items-center my-4">
            <div className="absolute w-[78%] aspect-square rounded-full glass-soft spin-slow" aria-hidden>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[var(--paper)] shadow-[0_0_10px_var(--paper)]" />
            </div>
            <div className="absolute w-[55%] aspect-square rounded-full glass-soft spin-slower" aria-hidden>
              <span className="absolute -top-1 left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[var(--saffron)] shadow-[0_0_10px_var(--saffron)]" />
            </div>
            <div className="absolute w-[34%] aspect-square rounded-full glass grid place-items-center">
              <div className="w-12 h-12 rounded-2xl bg-[var(--yellow)] grid place-items-center text-[var(--ink)] shadow-[0_0_40px_-4px_rgba(255,200,1,.7)]">
                <IconBolt width={22} height={22} />
              </div>
            </div>
          </div>

          {/* Metric tiles */}
          <div className="grid grid-cols-2 gap-3">
            <MetricTile label="Latency" value="12ms" />
            <MetricTile label="Accuracy" value="98.4%" accent />
          </div>
        </div>
      </div>

      {/* Floating glass chips */}
      <FloatChip icon={<IconArrowPath width={14} height={14} />} label="Stream ingest" x="-2%" y="10%" parallax={px(14)} />
      <FloatChip icon={<IconPie width={14} height={14} />} label="Auto-modeling" x="74%" y="2%" parallax={px(18)} />
      <FloatChip icon={<IconCog width={14} height={14} />} label="Policy guardrails" x="78%" y="78%" parallax={px(-14)} />
      <FloatChip icon={<IconCube width={14} height={14} />} label="Warehouse sync" x="-4%" y="76%" parallax={px(-18)} />

      {/* Sync accessory */}
      <div className="absolute -bottom-3 right-4 sm:right-8 glass rounded-2xl px-3.5 py-2.5 flex items-center gap-3" style={px(10)}>
        <span className="font-display text-[10px] tracking-[0.2em] uppercase text-[color:var(--muted)]">Sync</span>
        <span className="flex items-end gap-1 h-4">
          <span className="bar w-[3px] h-full rounded-full bg-[var(--yellow)]" style={{ animationDelay: "0s" }} />
          <span className="bar w-[3px] h-full rounded-full bg-[var(--yellow)]" style={{ animationDelay: ".18s" }} />
          <span className="bar w-[3px] h-full rounded-full bg-[var(--yellow)]" style={{ animationDelay: ".36s" }} />
        </span>
      </div>
    </div>
  );
}

function MetricTile({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div className="glass-soft rounded-xl px-3 py-2.5">
      <div className="font-display text-[9px] uppercase tracking-[0.2em] text-[color:var(--muted)]">{label}</div>
      <div className={`mt-1 font-display text-sm tnum ${accent ? "text-[var(--yellow)]" : "text-[var(--paper)]"}`}>{value}</div>
    </div>
  );
}

function FloatChip({ icon, label, x, y, parallax }: { icon: React.ReactNode; label: string; x: string; y: string; parallax: React.CSSProperties }) {
  return (
    <div className="absolute" style={{ left: x, top: y, ...parallax }}>
      <div className="drift glass rounded-full flex items-center gap-2 px-3 py-1.5 text-xs text-[var(--paper)]">
        <span className="text-[var(--yellow)]">{icon}</span>
        {label}
      </div>
    </div>
  );
}
