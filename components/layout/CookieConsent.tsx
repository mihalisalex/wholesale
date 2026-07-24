"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getStoredConsent, setStoredConsent, type ConsentValue } from "@/lib/cookie-consent";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage (unavailable during SSR) on mount
    setVisible(getStoredConsent() === null);
  }, []);

  if (!visible) return null;

  function choose(value: ConsentValue) {
    setStoredConsent(value);
    setVisible(false);
  }

  return (
    <div
      role="dialog"
      aria-label="Cookie preferences"
      className="fixed inset-x-0 bottom-16 md:bottom-0 z-[190] bg-ink text-cream/85 border-t border-cream/10"
    >
      <div className="max-w-[1200px] mx-auto px-5 md:px-8 py-5 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6">
        <p className="text-sm flex-1 leading-relaxed">
          We use your browser&rsquo;s local storage to remember your cart — that&rsquo;s essential and always on. Optional
          analytics, if we ever enable it, only runs after you accept. See our{" "}
          <Link href="/cookies" className="underline hover:text-cream">
            Cookie Policy
          </Link>
          .
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            type="button"
            onClick={() => choose("declined")}
            className="rounded-full border border-cream/25 px-5 py-2.5 text-sm font-semibold hover:bg-white/5 transition-colors"
          >
            Decline
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="rounded-full bg-cream text-ink px-5 py-2.5 text-sm font-semibold hover:bg-white transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
