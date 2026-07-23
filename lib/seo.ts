import { readJsonFile, writeJsonFile } from "@/lib/admin/data-store";
import type { SeoSettings } from "@/types/seo";

const SEO_FILE = "seo.json";

export function getSeoSettings(): SeoSettings {
  return readJsonFile<SeoSettings>(SEO_FILE);
}

export function saveSeoSettings(settings: SeoSettings): SeoSettings {
  writeJsonFile(SEO_FILE, settings);
  return settings;
}
