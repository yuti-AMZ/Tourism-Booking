"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function CancelButton({ bookingId }: { bookingId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function cancel() {
    if (!confirm("Cancel this booking?")) return;
    setLoading(true);

    const res = await fetch(`/api/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "CANCELLED" }),
    });

    setLoading(false);

    if (res.ok) {
      toast.success("Booking cancelled");
      router.refresh();
    } else {
      toast.error("Failed to cancel booking");
    }
  }

  return (
    <button
      onClick={cancel}
      disabled={loading}
      className="text-xs text-red-500 hover:text-red-700 hover:underline disabled:opacity-50 mt-1"
    >
      {loading ? "Cancelling..." : "Cancel booking"}
    </button>
  );
}
