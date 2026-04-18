"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useLang } from "@/lib/language-context";

export default function ReviewForm({ destinationId }: { destinationId: string }) {
  const router = useRouter();
  const { t } = useLang();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (rating === 0) { toast.error("Please select a rating"); return; }    setLoading(true);

    const res = await fetch("/api/reviews", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId, rating, comment }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Review submitted!");
      setRating(0); setComment("");
      router.refresh();
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="border rounded-2xl p-5 bg-card space-y-4">
      <h3 className="font-bold">{t.reviews.write}</h3>

      {/* Star rating */}
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star className={`w-7 h-7 transition-colors ${
              star <= (hover || rating) ? "fill-yellow-400 text-yellow-400" : "text-muted-foreground"
            }`} />
          </button>
        ))}
        {rating > 0 && <span className="text-sm text-muted-foreground ml-2 self-center">{rating}/5</span>}
      </div>

      <textarea
        rows={3}
        placeholder={t.reviews.placeholder}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        className="w-full border border-input rounded-lg px-3 py-2 text-sm bg-transparent outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
      />

      <Button type="submit" disabled={loading} className="w-full">
        {loading ? t.reviews.submitting : t.reviews.submit}
      </Button>
    </form>
  );
}
