"use client";

import { Share2 } from "lucide-react";
import { toast } from "sonner";

export default function ShareWishlist({ userId }: { userId: string }) {
  function share() {
    const url = `${window.location.origin}/wishlist/${userId}`;
    navigator.clipboard.writeText(url);
    toast.success("Wishlist link copied to clipboard! 🔗");
  }

  return (
    <button onClick={share} className="flex items-center gap-1.5 text-xs text-primary hover:underline font-medium">
      <Share2 className="w-3.5 h-3.5" /> Share wishlist
    </button>
  );
}
