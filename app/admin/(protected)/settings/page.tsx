"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import type { SiteSettings } from "@/types/site-settings";

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold";
const labelClasses = "block text-xs font-semibold mb-1.5";

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/admin/settings")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setSettings(data.settings);
      });
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!settings) return;
    setIsSubmitting(true);
    setError(null);
    setMessage(null);

    const res = await fetch("/api/admin/settings", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(settings),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.message ?? "Could not save settings.");
      setIsSubmitting(false);
      return;
    }
    setSettings(data.settings);
    setMessage("Saved. Changes apply on the next page load / server restart.");
    setIsSubmitting(false);
  }

  if (!settings) {
    return <p className="text-sm text-ink/40">Loading…</p>;
  }

  return (
    <div>
      <p className="text-[0.72rem] uppercase tracking-wider font-bold text-gold mb-2">Business</p>
      <h1 className="font-serif text-2xl font-semibold mb-8">Site Settings</h1>

      <form onSubmit={handleSubmit} className="space-y-8 max-w-2xl">
        {error && <p className="text-sm text-accent-3 bg-accent-3/10 rounded-brand-sm px-4 py-3">{error}</p>}
        {message && <p className="text-sm text-accent-2 bg-accent-2/10 rounded-brand-sm px-4 py-3">{message}</p>}

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Company</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Display name</label>
              <input
                className={inputClasses}
                value={settings.company.name}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, name: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClasses}>Legal name</label>
              <input
                className={inputClasses}
                value={settings.company.legalName}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, legalName: e.target.value } })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Email</label>
              <input
                type="email"
                className={inputClasses}
                value={settings.company.email}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, email: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClasses}>Phone</label>
              <input
                className={inputClasses}
                value={settings.company.phone}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, phone: e.target.value } })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Website</label>
              <input
                className={inputClasses}
                value={settings.company.website}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, website: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClasses}>VAT number</label>
              <input
                className={inputClasses}
                value={settings.company.vatNumber}
                onChange={(e) => setSettings({ ...settings, company: { ...settings.company, vatNumber: e.target.value } })}
              />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Street address</label>
            <input
              className={inputClasses}
              value={settings.company.address.line1}
              onChange={(e) =>
                setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, line1: e.target.value } } })
              }
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>City</label>
              <input
                className={inputClasses}
                value={settings.company.address.city}
                onChange={(e) =>
                  setSettings({ ...settings, company: { ...settings.company, address: { ...settings.company.address, city: e.target.value } } })
                }
              />
            </div>
            <div>
              <label className={labelClasses}>Postal code</label>
              <input
                className={inputClasses}
                value={settings.company.address.postalCode}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, address: { ...settings.company.address, postalCode: e.target.value } },
                  })
                }
              />
            </div>
            <div>
              <label className={labelClasses}>Country</label>
              <input
                className={inputClasses}
                value={settings.company.address.country}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    company: { ...settings.company, address: { ...settings.company.address, country: e.target.value } },
                  })
                }
              />
            </div>
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Banking (shown on the Pro Forma Invoice)</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelClasses}>Bank name</label>
              <input
                className={inputClasses}
                value={settings.banking.bankName}
                onChange={(e) => setSettings({ ...settings, banking: { ...settings.banking, bankName: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClasses}>SWIFT / BIC</label>
              <input
                className={inputClasses}
                value={settings.banking.swiftBic}
                onChange={(e) => setSettings({ ...settings, banking: { ...settings.banking, swiftBic: e.target.value } })}
              />
            </div>
          </div>
          <div>
            <label className={labelClasses}>IBAN</label>
            <input
              className={inputClasses}
              value={settings.banking.iban}
              onChange={(e) => setSettings({ ...settings, banking: { ...settings.banking, iban: e.target.value } })}
            />
          </div>
          <div>
            <label className={labelClasses}>Account holder</label>
            <input
              className={inputClasses}
              value={settings.banking.accountHolder}
              onChange={(e) => setSettings({ ...settings, banking: { ...settings.banking, accountHolder: e.target.value } })}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Commerce</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className={labelClasses}>Currency code</label>
              <input
                className={inputClasses}
                value={settings.commerce.currency}
                onChange={(e) => setSettings({ ...settings, commerce: { ...settings.commerce, currency: e.target.value.toUpperCase() } })}
              />
            </div>
            <div>
              <label className={labelClasses}>Currency symbol</label>
              <input
                className={inputClasses}
                value={settings.commerce.currencySymbol}
                onChange={(e) => setSettings({ ...settings, commerce: { ...settings.commerce, currencySymbol: e.target.value } })}
              />
            </div>
            <div>
              <label className={labelClasses}>Tax rate (%)</label>
              <input
                type="number"
                min={0}
                max={100}
                step={0.1}
                className={inputClasses}
                value={settings.commerce.taxRatePercent}
                onChange={(e) =>
                  setSettings({ ...settings, commerce: { ...settings.commerce, taxRatePercent: Number(e.target.value) } })
                }
              />
            </div>
          </div>
          <div>
            <label className={labelClasses}>Minimum order note</label>
            <input
              className={inputClasses}
              value={settings.commerce.minOrderPackagesNote}
              onChange={(e) =>
                setSettings({ ...settings, commerce: { ...settings.commerce, minOrderPackagesNote: e.target.value } })
              }
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Shipping</h2>
          <div>
            <label className={labelClasses}>Methods</label>
            <div className="space-y-2">
              {settings.shipping.methods.map((method, i) => (
                <div key={i} className="flex gap-2">
                  <input
                    className={inputClasses}
                    placeholder="value (e.g. fob)"
                    value={method.value}
                    onChange={(e) => {
                      const methods = [...settings.shipping.methods];
                      methods[i] = { ...methods[i], value: e.target.value };
                      setSettings({ ...settings, shipping: { ...settings.shipping, methods } });
                    }}
                  />
                  <input
                    className={inputClasses}
                    placeholder="label (e.g. FOB (Free On Board))"
                    value={method.label}
                    onChange={(e) => {
                      const methods = [...settings.shipping.methods];
                      methods[i] = { ...methods[i], label: e.target.value };
                      setSettings({ ...settings, shipping: { ...settings.shipping, methods } });
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => {
                      const methods = settings.shipping.methods.filter((_, idx) => idx !== i);
                      setSettings({ ...settings, shipping: { ...settings.shipping, methods } });
                    }}
                    className="text-xs text-accent-3 shrink-0 px-2"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() =>
                setSettings({
                  ...settings,
                  shipping: { ...settings.shipping, methods: [...settings.shipping.methods, { value: "", label: "" }] },
                })
              }
              className="text-xs text-gold font-semibold mt-2"
            >
              + Add shipping method
            </button>
          </div>
          <div>
            <label className={labelClasses}>Estimated lead time</label>
            <input
              className={inputClasses}
              value={settings.shipping.estimatedLeadTime}
              onChange={(e) => setSettings({ ...settings, shipping: { ...settings.shipping, estimatedLeadTime: e.target.value } })}
            />
          </div>
        </section>

        <section className="space-y-4">
          <h2 className="font-serif text-lg font-semibold">Terms</h2>
          <div>
            <label className={labelClasses}>Default payment terms</label>
            <textarea
              rows={3}
              className={inputClasses}
              value={settings.terms.paymentTerms}
              onChange={(e) => setSettings({ ...settings, terms: { ...settings.terms, paymentTerms: e.target.value } })}
            />
          </div>
          <div>
            <label className={labelClasses}>Terms & conditions (shown on the Pro Forma Invoice)</label>
            <textarea
              rows={4}
              className={inputClasses}
              value={settings.terms.termsAndConditions}
              onChange={(e) => setSettings({ ...settings, terms: { ...settings.terms, termsAndConditions: e.target.value } })}
            />
          </div>
        </section>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving…" : "Save Settings"}
        </Button>
      </form>
    </div>
  );
}
