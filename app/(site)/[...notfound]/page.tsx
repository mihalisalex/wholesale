import { notFound } from "next/navigation";

/**
 * Catches any path under the site that doesn't match a real page (typos,
 * dead links, etc.) and routes it into `(site)/not-found.tsx` — which
 * renders inside this group's own layout (header/footer intact), unlike
 * Next's bare fallback for a path that matches no route group at all.
 */
export default function CatchAll() {
  notFound();
}
