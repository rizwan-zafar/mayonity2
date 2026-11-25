"use client";

import { useEffect } from "react";
import { recordSourcePath } from "@/lib/trackEvent";

/**
 * @param {{ path: string }} props
 */
export function AttributionTracker({ path }) {
  useEffect(() => {
    recordSourcePath(path);
  }, [path]);

  return null;
}