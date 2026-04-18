"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function AddDestinationForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    location: "",
    price: "",
    category: "",
    images: "",
  });

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/destinations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...form,
        price: parseFloat(form.price),
        images: form.images.split(",").map((s) => s.trim()).filter(Boolean),
      }),
    });

    setLoading(false);

    if (res.ok) {
      router.push("/destinations");
    } else {
      const data = await res.json();
      alert(data.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Title</label>
        <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Slug (URL-friendly name)</label>
        <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="e.g. paris-city-tour" required />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent min-h-[100px] outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Location</label>
        <Input value={form.location} onChange={(e) => set("location", e.target.value)} required />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Price per night ($)</label>
        <Input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} required />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Category</label>
        <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Beach, Mountain, City" required />
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Image URLs (comma-separated)</label>
        <Input value={form.images} onChange={(e) => set("images", e.target.value)} placeholder="https://..., https://..." />
      </div>

      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Adding..." : "Add Destination"}
      </Button>
    </form>
  );
}
