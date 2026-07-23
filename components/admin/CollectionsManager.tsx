"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";
import type { Collection } from "@/types/collection";

const inputClasses =
  "w-full rounded-brand-sm border border-ink/15 bg-white px-3.5 py-2.5 text-sm focus:outline-none focus:border-gold";

function slugify(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

interface DraftValues {
  name: string;
  slug: string;
  description: string;
}

const emptyDraft: DraftValues = { name: "", slug: "", description: "" };

export function CollectionsManager({ collections }: { collections: Collection[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<DraftValues>(emptyDraft);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function startEdit(collection: Collection) {
    setEditingId(collection.id);
    setDraft({ name: collection.name, slug: collection.slug, description: collection.description });
    setError(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setDraft(emptyDraft);
    setError(null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const payload = { ...draft, slug: draft.slug || slugify(draft.name) };
    const url = editingId ? `/api/admin/collections/${editingId}` : "/api/admin/collections";
    const method = editingId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok || !data.success) {
      setError(data.message ?? "Could not save collection.");
      setIsSubmitting(false);
      return;
    }

    cancelEdit();
    setIsSubmitting(false);
    router.refresh();
  }

  async function handleDelete(collection: Collection) {
    if (!confirm(`Delete "${collection.name}"? Products already using it will keep the name as free text.`)) return;
    const res = await fetch(`/api/admin/collections/${collection.id}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json();
      alert(data.message ?? "Could not delete collection.");
      return;
    }
    router.refresh();
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">
      <div className="bg-white border border-ink/10 rounded-brand overflow-hidden">
        {collections.length === 0 ? (
          <p className="text-sm text-ink/50 p-6">No collections yet — add one on the right.</p>
        ) : (
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-ink/10 text-left text-xs uppercase tracking-wide text-ink/40">
                <th className="px-5 py-3 font-medium">Name</th>
                <th className="px-5 py-3 font-medium">Description</th>
                <th className="px-5 py-3 font-medium" />
              </tr>
            </thead>
            <tbody>
              {collections.map((collection) => (
                <tr key={collection.id} className="border-b border-ink/5 last:border-none">
                  <td className="px-5 py-3 font-medium">{collection.name}</td>
                  <td className="px-5 py-3 text-ink/50">{collection.description}</td>
                  <td className="px-5 py-3 text-right whitespace-nowrap">
                    <button type="button" onClick={() => startEdit(collection)} className="text-xs text-gold font-semibold mr-4">
                      Edit
                    </button>
                    <button type="button" onClick={() => handleDelete(collection)} className="text-xs text-accent-3 font-semibold">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <form onSubmit={handleSubmit} className="bg-white border border-ink/10 rounded-brand p-5 space-y-4 h-fit">
        <h2 className="font-serif text-base font-semibold">{editingId ? "Edit Collection" : "New Collection"}</h2>
        {error && <p className="text-xs text-accent-3">{error}</p>}
        <div>
          <label className="block text-xs font-semibold mb-1.5">Name</label>
          <input
            className={inputClasses}
            value={draft.name}
            onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            onBlur={() => !draft.slug && setDraft((d) => ({ ...d, slug: slugify(d.name) }))}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">Slug</label>
          <input className={inputClasses} value={draft.slug} onChange={(e) => setDraft((d) => ({ ...d, slug: e.target.value }))} />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5">Description</label>
          <textarea
            rows={3}
            className={inputClasses}
            value={draft.description}
            onChange={(e) => setDraft((d) => ({ ...d, description: e.target.value }))}
          />
        </div>
        <div className="flex gap-2">
          {editingId && (
            <Button type="button" variant="ghost" size="sm" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
          <Button type="submit" size="sm" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : editingId ? "Save" : "Add Collection"}
          </Button>
        </div>
      </form>
    </div>
  );
}
