import Link from "next/link";

export function Logo({ className = "" }) {
  return (
    <Link href="/" className={`group inline-flex items-center gap-3 ${className}`}>
      <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-xl border border-white/10 bg-white/5">
        <span className="absolute inset-0 bg-gradient-to-br from-accent/50 via-violet/30 to-cyan/20 opacity-80 transition group-hover:opacity-100" />
        <svg viewBox="0 0 32 32" className="relative h-5 w-5" aria-hidden="true">
          <path d="M6 24L16 6L26 24H21L16 15L11 24H6Z" fill="white" />
          <circle cx="16" cy="21" r="1.8" fill="#3ee0c8" />
        </svg>
      </span>
      <span className="display text-[1.05rem] font-semibold tracking-[0.18em]">MAYONITY</span>
    </Link>
  );
}
