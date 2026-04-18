"use client";

import { X, Download, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingData {
  id: string;
  destination: string;
  location: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  userName: string;
  userEmail: string;
}

interface Props {
  booking: BookingData;
  onClose: () => void;
}

export default function BookingConfirmation({ booking, onClose }: Props) {
  const days = Math.ceil(
    (new Date(booking.checkOut).getTime() - new Date(booking.checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );

  async function downloadPDF() {
    const jsPDFModule = await import("jspdf");
    const jsPDF = jsPDFModule.default;
    const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageW = doc.internal.pageSize.getWidth();

    // Header background
    doc.setFillColor(7, 137, 48);
    doc.rect(0, 0, pageW, 45, "F");

    // Flag stripe
    doc.setFillColor(7, 137, 48);
    doc.rect(0, 45, pageW, 4, "F");
    doc.setFillColor(252, 221, 9);
    doc.rect(pageW / 3, 45, pageW / 3, 4, "F");
    doc.setFillColor(218, 18, 26);
    doc.rect((pageW / 3) * 2, 45, pageW / 3, 4, "F");

    // Logo / title
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(24);
    doc.setFont("helvetica", "bold");
    doc.text("EthioTour", pageW / 2, 20, { align: "center" });

    doc.setFontSize(11);
    doc.setFont("helvetica", "normal");
    doc.text("Booking Confirmation", pageW / 2, 30, { align: "center" });

    doc.setFontSize(9);
    doc.text("Discover Ethiopia — Land of Origins", pageW / 2, 38, { align: "center" });

    // Confirmation badge
    doc.setFillColor(240, 253, 244);
    doc.roundedRect(20, 58, pageW - 40, 22, 3, 3, "F");
    doc.setTextColor(22, 101, 52);
    doc.setFontSize(13);
    doc.setFont("helvetica", "bold");
    doc.text("✓  Booking Confirmed!", pageW / 2, 68, { align: "center" });
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.text(`Booking ID: ${booking.id.slice(-8).toUpperCase()}`, pageW / 2, 75, { align: "center" });

    // Section: Guest Info
    let y = 92;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, y - 6, pageW - 40, 32, 3, 3, "F");
    doc.setTextColor(7, 137, 48);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("GUEST INFORMATION", 28, y);
    y += 8;
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`Name:`, 28, y);
    doc.setFont("helvetica", "bold");
    doc.text(booking.userName, 60, y);
    y += 7;
    doc.setFont("helvetica", "normal");
    doc.text(`Email:`, 28, y);
    doc.setFont("helvetica", "bold");
    doc.text(booking.userEmail, 60, y);

    // Section: Trip Details
    y += 18;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(20, y - 6, pageW - 40, 60, 3, 3, "F");
    doc.setTextColor(7, 137, 48);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    doc.text("TRIP DETAILS", 28, y);
    y += 8;

    const details = [
      ["Destination:", booking.destination],
      ["Location:", booking.location],
      ["Check-in:", new Date(booking.checkIn).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
      ["Check-out:", new Date(booking.checkOut).toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })],
      ["Duration:", `${days} night${days > 1 ? "s" : ""}`],
      ["Guests:", `${booking.guests} guest${booking.guests > 1 ? "s" : ""}`],
    ];

    details.forEach(([label, value]) => {
      doc.setTextColor(100, 100, 100);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.text(label, 28, y);
      doc.setTextColor(30, 30, 30);
      doc.setFont("helvetica", "bold");
      doc.text(value, 70, y);
      y += 8;
    });

    // Total price
    y += 6;
    doc.setFillColor(7, 137, 48);
    doc.roundedRect(20, y - 6, pageW - 40, 18, 3, 3, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("TOTAL AMOUNT", 28, y + 2);
    doc.setFontSize(14);
    doc.text(`$${booking.totalPrice.toLocaleString()}`, pageW - 28, y + 2, { align: "right" });

    // Notes
    y += 26;
    doc.setTextColor(100, 100, 100);
    doc.setFontSize(8);
    doc.setFont("helvetica", "italic");
    doc.text("Please present this confirmation upon arrival. For support: hello@ethiopia-discovery.com", pageW / 2, y, { align: "center" });
    doc.text("+251 935 615 567  |  Bole, Addis Ababa, Ethiopia", pageW / 2, y + 6, { align: "center" });

    // Footer
    doc.setFillColor(7, 137, 48);
    doc.rect(0, 280, pageW, 17, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    doc.text("© 2026 EthioTour — Discover Ethiopia", pageW / 2, 290, { align: "center" });

    doc.save(`EthioTour-Booking-${booking.id.slice(-8).toUpperCase()}.pdf`);
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="bg-background rounded-2xl shadow-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="bg-primary p-6 text-white text-center relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white/70 hover:text-white">
            <X className="w-5 h-5" />
          </button>
          <CheckCircle className="w-12 h-12 mx-auto mb-2 text-yellow-300" />
          <h2 className="text-xl font-bold">Booking Confirmed!</h2>
          <p className="text-green-100 text-sm mt-1">ID: {booking.id.slice(-8).toUpperCase()}</p>
        </div>

        <div className="eth-stripe" />

        <div className="p-6 space-y-3">
          <div className="grid grid-cols-2 gap-3 text-sm">
            {[
              { label: "Destination", value: booking.destination },
              { label: "Location", value: booking.location },
              { label: "Check-in", value: new Date(booking.checkIn).toLocaleDateString() },
              { label: "Check-out", value: new Date(booking.checkOut).toLocaleDateString() },
              { label: "Duration", value: `${days} night${days > 1 ? "s" : ""}` },
              { label: "Guests", value: `${booking.guests} guest${booking.guests > 1 ? "s" : ""}` },
            ].map(({ label, value }) => (
              <div key={label} className="bg-muted/40 rounded-xl p-3">
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="font-semibold mt-0.5 text-sm">{value}</p>
              </div>
            ))}
          </div>

          <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 flex items-center justify-between">
            <span className="font-semibold text-sm">Total Amount</span>
            <span className="text-xl font-bold text-primary">${booking.totalPrice.toLocaleString()}</span>
          </div>

          <div className="flex gap-3 pt-2">
            <Button onClick={downloadPDF} className="flex-1 gap-2 font-semibold">
              <Download className="w-4 h-4" /> Download PDF
            </Button>
            <Button onClick={onClose} variant="outline" className="flex-1">
              Go to Dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
