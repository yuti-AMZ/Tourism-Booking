"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useLang } from "@/lib/language-context";
import BookingConfirmation from "./booking-confirmation";

export default function BookingForm({
  destinationId,
  pricePerNight,
  destinationTitle,
  destinationLocation,
}: {
  destinationId: string;
  pricePerNight: number;
  destinationTitle: string;
  destinationLocation: string;
}) {
  const { data: session } = useSession();
  const { t } = useLang();
  const [form, setForm] = useState({ checkIn: "", checkOut: "", guests: 1 });
  const [loading, setLoading] = useState(false);
  const [confirmation, setConfirmation] = useState<any>(null);

  const days =
    form.checkIn && form.checkOut
      ? Math.max(0, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / (1000 * 60 * 60 * 24)))
      : 0;

  const total = days * pricePerNight * form.guests;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("/api/bookings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ destinationId, ...form }),
    });

    setLoading(false);

    if (res.ok) {
      const booking = await res.json();
      toast.success("Booking confirmed! 🎉");
      setConfirmation({
        id: booking.id,
        destination: destinationTitle,
        location: destinationLocation,
        checkIn: form.checkIn,
        checkOut: form.checkOut,
        guests: form.guests,
        totalPrice: total,
        userName: session?.user?.name ?? "Guest",
        userEmail: session?.user?.email ?? "",
      });
    } else {
      const data = await res.json();
      toast.error(data.error ?? "Something went wrong");
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4 border rounded-xl p-6 bg-card">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium mb-1 block">{t.booking.checkIn}</label>
            <Input
              type="date"
              value={form.checkIn}
              min={new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, checkIn: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">{t.booking.checkOut}</label>
            <Input
              type="date"
              value={form.checkOut}
              min={form.checkIn || new Date().toISOString().split("T")[0]}
              onChange={(e) => setForm({ ...form, checkOut: e.target.value })}
              required
            />
          </div>
        </div>

        <div>
          <label className="text-sm font-medium mb-1 block">{t.booking.guests}</label>
          <Input
            type="number"
            min={1}
            max={20}
            value={form.guests}
            onChange={(e) => setForm({ ...form, guests: Number(e.target.value) })}
            required
          />
        </div>

        {days > 0 && (
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-3 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>{days} night{days > 1 ? "s" : ""} × ${pricePerNight} × {form.guests} guest{form.guests > 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between font-bold text-primary mt-1 text-base">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        )}

        <Button type="submit" className="w-full font-semibold" disabled={loading}>
          {loading ? t.booking.booking : t.booking.confirm}
        </Button>
      </form>

      {confirmation && (
        <BookingConfirmation
          booking={confirmation}
          onClose={() => {
            setConfirmation(null);
            window.location.href = "/dashboard";
          }}
        />
      )}
    </>
  );
}
