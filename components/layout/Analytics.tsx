"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent, COOKIE_CONSENT_EVENT } from "@/lib/cookie-consent";

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

/**
 * Loads Plausible only once the visitor has accepted cookies and
 * NEXT_PUBLIC_PLAUSIBLE_DOMAIN is configured — no analytics provider is
 * wired in until both are true, so this renders nothing out of the box.
 */
export function Analytics() {
  const [accepted, setAccepted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads localStorage (unavailable during SSR) on mount
    setAccepted(getStoredConsent() === "accepted");
    function handleChange(e: Event) {
      setAccepted((e as CustomEvent<string>).detail === "accepted");
    }
    window.addEventListener(COOKIE_CONSENT_EVENT, handleChange);
    return () => window.removeEventListener(COOKIE_CONSENT_EVENT, handleChange);
  }, []);

  if (!PLAUSIBLE_DOMAIN || !accepted) return null;

  return <Script defer data-domain={PLAUSIBLE_DOMAIN} src="https://plausible.io/js/script.js" />;
}
