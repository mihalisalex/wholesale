export type ConsentValue = "accepted" | "declined";

const STORAGE_KEY = "herve-cookie-consent";
export const COOKIE_CONSENT_EVENT = "herve-cookie-consent-changed";

export function getStoredConsent(): ConsentValue | null {
  if (typeof window === "undefined") return null;
  const value = window.localStorage.getItem(STORAGE_KEY);
  return value === "accepted" || value === "declined" ? value : null;
}

export function setStoredConsent(value: ConsentValue): void {
  window.localStorage.setItem(STORAGE_KEY, value);
  window.dispatchEvent(new CustomEvent(COOKIE_CONSENT_EVENT, { detail: value }));
}
