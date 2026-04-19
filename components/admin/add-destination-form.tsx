"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

  const router = useRouter();
  const initialForm = {
    title: "",
    slug: "",
    description: "",
    location: "",
    price: "",
    category: "",
    images: "",
  };
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  function set(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  function validate(form: typeof initialForm) {
    const errors: Record<string, string> = {};
    if (!form.title.trim()) errors.title = "Title is required.";
    if (!form.slug.trim()) errors.slug = "Slug is required.";
    else if (!/^[a-z0-9-]+$/.test(form.slug)) errors.slug = "Slug must be URL-friendly (lowercase, numbers, hyphens).";
    if (!form.description.trim()) errors.description = "Description is required.";
    if (!form.location.trim()) errors.location = "Location is required.";
    if (!form.price.trim() || isNaN(Number(form.price)) || Number(form.price) <= 0) errors.price = "Price must be a positive number.";
    if (!form.category.trim()) errors.category = "Category is required.";
    // images is optional
    return errors;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validation = validate(form);
    setErrors(validation);
    if (Object.keys(validation).length > 0) return;

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

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
    setUploading(false);
    if (res.ok) {
      const data = await res.json();
      setForm((prev) => ({ ...prev, images: data.url }));
    } else {
      alert("Image upload failed");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="text-sm font-medium mb-1 block">Title</label>
        <Input value={form.title} onChange={(e) => set("title", e.target.value)} required />
        {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Slug (URL-friendly name)</label>
        <Input value={form.slug} onChange={(e) => set("slug", e.target.value)} placeholder="e.g. lalibela" required />
        {errors.slug && <p className="text-xs text-red-500 mt-1">{errors.slug}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Description</label>
        <textarea
          className="w-full border rounded-lg px-3 py-2 text-sm bg-transparent min-h-25 outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={form.description}
          onChange={(e) => set("description", e.target.value)}
          required
        />
        {errors.description && <p className="text-xs text-red-500 mt-1">{errors.description}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Location</label>
        <Input value={form.location} onChange={(e) => set("location", e.target.value)} required />
        {errors.location && <p className="text-xs text-red-500 mt-1">{errors.location}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Price per night ($)</label>
        <Input type="number" min="0" value={form.price} onChange={(e) => set("price", e.target.value)} required />
        {errors.price && <p className="text-xs text-red-500 mt-1">{errors.price}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Category</label>
        <Input value={form.category} onChange={(e) => set("category", e.target.value)} placeholder="e.g. Beach, Mountain, City" required />
        {errors.category && <p className="text-xs text-red-500 mt-1">{errors.category}</p>}
      </div>
      <div>
        <label className="text-sm font-medium mb-1 block">Image Upload</label>
        <Input type="file" accept="image/*" onChange={handleImageUpload} />
        {uploading && <p className="text-xs text-blue-500 mt-1">Uploading...</p>}
        {form.images && (
          <img src={form.images} alt="Preview" className="mt-2 rounded w-32 h-32 object-cover border" />
        )}
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
