"use client";

import { useLayoutEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { shouldLoadAnalytics } from "@/lib/analyticsExclusion";

export function Ga4() {
  const pathname = usePathname();
  const [loadAnalytics, setLoadAnalytics] = useState(null);

  const GA_ID = (process.env.NEXT_PUBLIC_GA_ID || "G-5LKZXSQLML").trim();

  useLayoutEffect(() => {
    setLoadAnalytics(shouldLoadAnalytics(pathname));
  }, [pathname]);

  if (!GA_ID || loadAnalytics !== true) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_ID}');
        `}
      </Script>
    </>
  );
}