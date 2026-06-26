export function Logo({ className = "" }: { className?: string }) {
  return (
    <a href="#top" className={`flex items-center gap-2 ${className}`} aria-label="Nexel home">
      <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
        <rect x="1" y="1" width="30" height="30" rx="8" stroke="currentColor" strokeWidth="1.5" opacity=".35" />
        <path d="M9 22V10l14 12V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="23" cy="10" r="2" fill="#FFC801" />
      </svg>
      <span className="font-display text-[15px] tracking-tight font-semibold">nexel<span className="text-[var(--yellow)]">/</span>ai</span>
    </a>
  );
}
