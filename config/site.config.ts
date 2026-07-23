/**
 * Single source of truth for all business/admin-editable content.
 *
 * Backed by `data/site-settings.json`, editable from the admin dashboard at
 * `/admin/settings` (or by hand). Imported into both client and server code,
 * so it stays a plain static JSON import rather than a filesystem read —
 * changes apply on the next dev-server recompile automatically, and on the
 * next build/restart in production.
 *
 * Live-without-rebuild editing (products, collections, SEO) reads from disk
 * at request time instead — see `lib/products.ts`, `lib/collections.ts` and
 * `lib/seo.ts`, which are server-only and don't have this constraint.
 */
import siteSettingsData from "@/data/site-settings.json";
import type { SiteSettings } from "@/types/site-settings";

export const siteConfig: SiteSettings = siteSettingsData as SiteSettings;

export type { SiteSettings } from "@/types/site-settings";
