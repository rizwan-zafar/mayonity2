"use client";

import { useLayoutEffect, useState } from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { shouldLoadAnalytics } from "@/lib/analyticsExclusion";

const CLARITY_ID = "zi2q27msj4";

export function ClarityScript() {
  const pathname = usePathname();
  const [loadAnalytics, setLoadAnalytics] = useState<boolean | null>(null);

  useLayoutEffect(() => {
    setLoadAnalytics(shouldLoadAnalytics(pathname));
  }, [pathname]);

  if (process.env.NODE_ENV !== "production") return null;
  if (loadAnalytics !== true) return null;

  return (
    <Script id="microsoft-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}