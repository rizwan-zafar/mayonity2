"use client";

import Link from "next/link";
import { trackEvent } from "@/lib/trackEvent";

const BUTTON_LABEL = "Start a scoping sprint";

export function ScopingSprintCta() {
  return (
    <Link
      href="/contact?source=scoping-sprint"
      onClick={() =>
        trackEvent("budget_cta_click", {
          page_path: "/partners",
          link_text: "scoping_sprint",
        })
      }
      className="mt-6 inline-flex rounded-full bg-white px-6 py-3 text-sm font-medium text-black"
    >
      {BUTTON_LABEL}
    </Link>
  );
}