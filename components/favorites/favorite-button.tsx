"use client";

import { useState } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function FavoriteButton({
  destinationId,
  initialFavorited,
}: {
  destinationId: string;
  initialFavorited: boolean;
}) {
  const [favorited, setFavorited] = useState(initialFavorited);
  const [loading, setLoading] = useState(false);

  async function toggle() {
    setLoading(true);
    const res = await fetch("/api/favorites", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId }),
    });
    const data = await res.json();
    setFavorited(data.favorited);
    setLoading(false);
    toast.success(data.favorited ? "Added to favorites ❤️" : "Removed from favorites");
  }

  return (
    <Button variant="outline" size="sm" onClick={toggle} disabled={loading}>
      <Heart className={`w-4 h-4 mr-1 ${favorited ? "fill-red-500 text-red-500" : ""}`} />
      {favorited ? "Saved" : "Save"}
    </Button>
  );
}
