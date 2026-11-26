"use client";

import Script from "next/script";
import { NOTRACK_COOKIE_NAME, NOTRACK_STORAGE_KEY } from "@/lib/analyticsExclusion";

const bootstrapScript = `(function(){
  var key=${JSON.stringify(NOTRACK_STORAGE_KEY)};
  var cookieName=${JSON.stringify(NOTRACK_COOKIE_NAME)};
  var params=new URLSearchParams(window.location.search);
  var v=params.get("notrack");
  if(v==="1"){
    try{localStorage.setItem(key,"1");}catch(e){}
    document.cookie=cookieName+"=1; Max-Age=31536000; Path=/; SameSite=Lax";
  }else if(v==="0"){
    try{localStorage.removeItem(key);}catch(e){}
    document.cookie=cookieName+"=; Max-Age=0; Path=/; SameSite=Lax";
  }
})();`;

export function NotrackBootstrap() {
  return (
    <Script id="mayonity-notrack-bootstrap" strategy="beforeInteractive">
      {bootstrapScript}
    </Script>
  );
}