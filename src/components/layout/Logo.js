import Image from "next/image";
import Link from "next/link";

const BRAND_VERSION = "4";

/** @typedef {"compact" | "full"} LogoVariant */

/**
 * @param {{ className?: string; variant?: LogoVariant; priority?: boolean }} props
 */
export function Logo({ className = "", variant = "compact", priority = false }) {
  if (variant === "compact") {
    return (
      <Link
        href="/"
        className={`group display text-[1.15rem] font-semibold tracking-[-0.02em] text-white transition hover:text-white/90 sm:text-xl ${className}`}
      >
        Mayonity
      </Link>
    );
  }

  const src = `/images/brand/mayonity-logo.png?v=${BRAND_VERSION}`;

  return (
    <Link
      href="/"
      className={`group inline-flex max-w-full items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white/40 ${className}`}
    >
      <Image
        src={src}
        alt="Mayonity Tech Solutions"
        width={1024}
        height={1024}
        sizes="(max-width: 640px) 160px, 200px"
        className="h-[5.5rem] w-auto max-w-[11rem] object-contain object-left transition group-hover:brightness-110 sm:h-28 sm:max-w-[13rem]"
        priority={priority}
        unoptimized
      />
    </Link>
  );
}