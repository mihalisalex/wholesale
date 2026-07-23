"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SeoSettings } from "@/types/seo";

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold";
const labelClasses = "block text-xs font-semibold mb-1.5";

export default function AdminSeoPage() {
  const [seo, setSeo] = useState<SeoSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/seo")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSeo(data.seo);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!seo) return;
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const res = await fetch("/api/admin/seo", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(seo),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.message ?? "Could not save SEO settings.");
      setIsSubmitting(false);
      return;
    }
    setSeo(data.seo);
    setMessage("Saved. Changes apply on the next page load.");
    setIsSubmitting(false);
  }

  if (!seo) {
    return <p className="text-sm text-ink/40">Loading…</p>;
  }

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Marketing</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">SEO Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {error && <p className="text-sm text-accent-3 bg-accent-3/10 rounded-brand-sm px-4 py-3">{error}</p>}
        {message && <p className="text-sm text-accent-2 bg-accent-2/10 rounded-brand-sm px-4 py-3">{message}</p>}

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Global</h2>
          <div>
            <label className={labelClasses}>Site name</label>
            <input className={inputClasses} value={seo.siteName} onChange={(e) => setSeo({ ...seo, siteName: e.target.value })} />
          </div>
          <div>
            <label className={labelClasses}>Title template</label>
            <input
              className={inputClasses}
              value={seo.titleTemplate}
              onChange={(e) => setSeo({ ...seo, titleTemplate: e.target.value })}
            />
            <p className="text-xs text-ink/40 mt-1">Use %s where the page title should be inserted.</p>
          </div>
          <div>
            <label className={labelClasses}>Default meta description</label>
            <textarea
              rows={3}
              className={inputClasses}
              value={seo.defaultDescription}
              onChange={(e) => setSeo({ ...seo, defaultDescription: e.target.value })}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Default OG image path</label>
              <input
                className={inputClasses}
                value={seo.defaultOgImage}
                onChange={(e) => setSeo({ ...seo, defaultOgImage: e.target.value })}
              />
            </div>
            <div>
              <label className={labelClasses}>Twitter handle (optional)</label>
              <input
                className={inputClasses}
                placeholder="@handle"
                value={seo.twitterHandle}
                onChange={(e) => setSeo({ ...seo, twitterHandle: e.target.value })}
              />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              id="robotsIndexable"
              type="checkbox"
              checked={seo.robotsIndexable}
              onChange={(e) => setSeo({ ...seo, robotsIndexable: e.target.checked })}
              className="accent-gold"
            />
            <label htmlFor="robotsIndexable" className="text-sm">
              Allow search engines to index the site
            </label>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Home page</h2>
          <div>
            <label className={labelClasses}>Title</label>
            <input
              className={inputClasses}
              value={seo.pages.home.title}
              onChange={(e) => setSeo({ ...seo, pages: { ...seo.pages, home: { ...seo.pages.home, title: e.target.value } } })}
            />
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              rows={2}
              className={inputClasses}
              value={seo.pages.home.description}
              onChange={(e) =>
                setSeo({ ...seo, pages: { ...seo.pages, home: { ...seo.pages.home, description: e.target.value } } })
              }
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Catalog page</h2>
          <div>
            <label className={labelClasses}>Title</label>
            <input
              className={inputClasses}
              value={seo.pages.catalog.title}
              onChange={(e) =>
                setSeo({ ...seo, pages: { ...seo.pages, catalog: { ...seo.pages.catalog, title: e.target.value } } })
              }
            />
          </div>
          <div>
            <label className={labelClasses}>Description</label>
            <textarea
              rows={2}
              className={inputClasses}
              value={seo.pages.catalog.description}
              onChange={(e) =>
                setSeo({ ...seo, pages: { ...seo.pages, catalog: { ...seo.pages.catalog, description: e.target.value } } })
              }
            />
          </div>
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save SEO Settings"}
        </Button>
      </form>
    </div>
  );
}
