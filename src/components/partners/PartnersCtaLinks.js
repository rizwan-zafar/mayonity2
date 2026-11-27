"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/trackEvent";

const PRIMARY_LABEL = "Send us a brief";

export function PartnersCtaLinks() {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
      <Link
        href="/contact?source=partners&type=agency"
        onClick={() =>
          trackEvent("budget_cta_click", {
            page_path: "/partners",
            link_text: PRIMARY_LABEL,
          })
        }
        className="inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
      >
        {PRIMARY_LABEL}
      </Link>
      <Link href="/website-cost-calculator" className="text-sm text-cyan hover:underline">
        See what a typical website costs
      </Link>
    </div>
  );
}