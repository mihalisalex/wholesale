import { readJsonFile, writeJsonFile } from "@/lib/admin/data-store";
import type { SiteSettings } from "@/types/site-settings";

const SETTINGS_FILE = "site-settings.json";

/**
 * Server-only, for the admin settings API route. The rest of the app reads
 * these values via `config/site.config.ts` (a static import, safe to use
 * from client components too) — that file loads the same JSON at build
 * time, so settings changes made here apply on the next dev recompile or
 * production rebuild/restart, same as editing the JSON file by hand.
 */
export function getSiteSettings(): SiteSettings {
  return readJsonFile<SiteSettings>(SETTINGS_FILE);
}

export function saveSiteSettings(settings: SiteSettings): SiteSettings {
  writeJsonFile(SETTINGS_FILE, settings);
  return settings;
}
