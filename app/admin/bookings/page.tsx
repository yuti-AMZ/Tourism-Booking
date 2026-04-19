import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AdminBookingsPage() {
  const session = await getAuthSession();
  if (!session || (session.user as any).role !== "ADMIN") redirect("/");

  const bookings = await prisma.booking.findMany({
    include: {
      user: { select: { name: true, email: true } },
      destination: { select: { title: true, slug: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  async function confirmBooking(id: string) {
    "use server";
    await prisma.booking.update({
      where: { id },
      data: { status: "CONFIRMED" },
    });
    redirect("/admin/bookings");
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold mb-6">Manage Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border">
          <thead>
            <tr className="bg-muted">
              <th className="p-2 text-left">User</th>
              <th className="p-2 text-left">Destination</th>
              <th className="p-2 text-left">Dates</th>
              <th className="p-2 text-left">Guests</th>
              <th className="p-2 text-left">Status</th>
              <th className="p-2 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b) => (
              <tr key={b.id} className="border-t">
                <td className="p-2">{b.user?.name ?? b.user?.email ?? "-"}</td>
                <td className="p-2">
                  <Link href={`/destinations/${b.destination.slug}`} className="text-primary underline">
                    {b.destination.title}
                  </Link>
                </td>
                <td className="p-2">{new Date(b.checkIn).toLocaleDateString()} - {new Date(b.checkOut).toLocaleDateString()}</td>
                <td className="p-2">{b.guests}</td>
                <td className="p-2 font-semibold">{b.status}</td>
                <td className="p-2">
                  {b.status === "PENDING" ? (
                    <form action={confirmBooking.bind(null, b.id)}>
                      <Button type="submit" size="sm">Confirm</Button>
                    </form>
                  ) : (
                    <span className="text-green-600">Confirmed</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
