"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/config/site.config";
import { buildClosedMessage, buildTelLink, buildWhatsAppLink, isWithinBusinessHours } from "@/lib/contact";

export function FloatingContactButtons() {
  // Product pages already have an inline "Ask about this product" WhatsApp link plus a
  // sticky Add Package bar, and Quick Order has its own sticky summary bar — on short
  // pages a fixed-position floating button can end up sitting on top of either one at
  // rest, not just mid-scroll, so skip rendering it there rather than chase overlap.
  const pathname = usePathname();
  const hideOnThisPage = pathname?.startsWith("/product/") || pathname === "/quick-order";

  const [isOpenNow, setIsOpenNow] = useState<boolean | null>(null);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Business hours depend on the current time, which isn't known during SSR —
  // compute once on mount so the server/client markup matches, then it's static per page view.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- current time isn't known during SSR, see comment above
    setIsOpenNow(isWithinBusinessHours());
  }, []);

  // Fade out mid-scroll so the buttons never sit on top of card content while flicking
  // through a list, per the brief's "never interfere with scrolling" — they reappear
  // ~400ms after the page settles.
  useEffect(() => {
    function handleScroll() {
      setIsScrolling(true);
      clearTimeout(scrollTimeout.current);
      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 400);
    }
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearTimeout(scrollTimeout.current);
    };
  }, []);

  if (hideOnThisPage) return null;

  return (
    <div
      className={`md:hidden fixed right-4 bottom-[calc(4.5rem+env(safe-area-inset-bottom))] z-30 flex flex-col gap-3 transition-opacity duration-200 ${
        isScrolling ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      {isOpenNow !== false && (
        <a
          href={buildTelLink()}
          aria-label={`Call us now — ${siteConfig.contact.businessHours.weekdayLabel}`}
          className="w-14 h-14 rounded-full bg-ink text-cream shadow-brand flex items-center justify-center active:scale-95 transition-transform"
        >
          <svg viewBox="0 0 24 24" className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="1.7">
            <path
              d="M5 4h3l1.5 4.5-2 1.5a12 12 0 0 0 6.5 6.5l1.5-2L20 16v3a1 1 0 0 1-1 1C11.8 20 4 12.2 4 5a1 1 0 0 1 1-1Z"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
      )}

      <a
        href={buildWhatsAppLink(isOpenNow === false ? buildClosedMessage() : undefined)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={isOpenNow === false ? "We're closed — message us on WhatsApp" : "Chat with us on WhatsApp"}
        className="w-14 h-14 rounded-full bg-accent-2 text-white shadow-brand flex items-center justify-center active:scale-95 transition-transform"
      >
        <svg viewBox="0 0 24 24" className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="1.7">
          <path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.6-1.3A9 9 0 1 0 12 3Z" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8.5 9.8c.3 2.7 2 4.4 4.7 4.7.9.1 1.6-.5 1.6-1.3v-.5l-1.9-.7-.6.7c-1-.5-1.8-1.3-2.3-2.3l.7-.6-.7-1.9h-.5c-.8 0-1.4.7-1.3 1.6Z" />
        </svg>
      </a>
    </div>
  );
}
