"use client";

import { useState, useTransition } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const categories = ["All", "Heritage", "Adventure", "Culture", "Wildlife", "City"];

export default function SearchFilters() {
  const router = useRouter();
  const params = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const [q, setQ] = useState(params.get("q") ?? "");
  const [category, setCategory] = useState(params.get("category") ?? "All");
  const [minPrice, setMinPrice] = useState(params.get("minPrice") ?? "");
  const [maxPrice, setMaxPrice] = useState(params.get("maxPrice") ?? "");
  const [minRating, setMinRating] = useState(params.get("minRating") ?? "");
  const [showFilters, setShowFilters] = useState(false);

  function apply() {
    const p = new URLSearchParams();
    if (q) p.set("q", q);
    if (category !== "All") p.set("category", category);
    if (minPrice) p.set("minPrice", minPrice);
    if (maxPrice) p.set("maxPrice", maxPrice);
    if (minRating) p.set("minRating", minRating);
    startTransition(() => router.push(`/destinations?${p.toString()}`));
  }

  function clear() {
    setQ(""); setCategory("All"); setMinPrice(""); setMaxPrice(""); setMinRating("");
    startTransition(() => router.push("/destinations"));
  }

  const hasFilters = q || category !== "All" || minPrice || maxPrice || minRating;

  return (
    <div className="bg-card border-b px-4 py-4">
      <div className="max-w-6xl mx-auto space-y-3">
        {/* Search bar */}
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              className="pl-9"
              placeholder="Search destinations, locations..."
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && apply()}
            />
          </div>
          <Button onClick={() => setShowFilters(!showFilters)} variant="outline" className="gap-2">
            <SlidersHorizontal className="w-4 h-4" />
            Filters
            {hasFilters && <span className="w-2 h-2 rounded-full bg-primary" />}
          </Button>
          <Button onClick={apply} disabled={isPending}>
            {isPending ? "..." : "Search"}
          </Button>
          {hasFilters && (
            <Button onClick={clear} variant="ghost" size="sm">
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`px-3 py-1 rounded-full text-xs font-semibold border transition-all ${
                category === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Advanced filters */}
        {showFilters && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t">
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Min Price ($)</label>
              <Input type="number" placeholder="0" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Max Price ($)</label>
              <Input type="number" placeholder="500" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground uppercase mb-1 block">Min Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(e.target.value)}
                className="w-full border border-input rounded-lg px-3 py-1.5 text-sm bg-background outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="">Any</option>
                <option value="3">3+ ⭐</option>
                <option value="4">4+ ⭐</option>
                <option value="4.5">4.5+ ⭐</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
