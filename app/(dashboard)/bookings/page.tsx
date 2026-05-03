import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Calendar, Users, MapPin } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function BookingsPage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const bookings = await prisma.booking.findMany({
    where: { userId: session.user.id },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="p-4 md:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Bookings</h1>
        <p className="text-muted-foreground">Manage your upcoming and past trips</p>
      </div>

      {bookings.length === 0 ? (
        <div className="text-center py-20 border border-dashed rounded-xl">
          <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
          <h2 className="text-xl font-semibold mb-2">No bookings yet</h2>
          <p className="text-muted-foreground mb-6">Ready for an adventure in Ethiopia?</p>
          <Link href="/destinations" className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium">
            Find a Destination
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {bookings.map((booking) => (
            <div key={booking.id} className="flex flex-col md:flex-row bg-card border rounded-xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative w-full md:w-64 h-48 md:h-auto">
                  <Image
                  src={booking.destination.images[0] || "/images/placeholder.jpg"}
                  alt={booking.destination.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 256px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-xl">{booking.destination.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      booking.status === "CONFIRMED" ? "bg-green-100 text-green-700" :
                      booking.status === "CANCELLED" ? "bg-red-100 text-red-700" :
                      "bg-yellow-100 text-yellow-700"
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground mb-4">
                    <MapPin className="w-4 h-4 mr-1" />
                    {booking.destination.location}
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Dates</p>
                        <p className="font-medium">
                          {booking.checkIn.toLocaleDateString()} - {booking.checkOut.toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Users className="w-4 h-4 text-primary flex-shrink-0" />
                      <div>
                        <p className="text-xs text-muted-foreground">Guests</p>
                        <p className="font-medium">{booking.guests} travelers</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row justify-between items-center pt-4 border-t gap-4">
                  <p className="font-bold text-lg">Total: ${booking.totalPrice}</p>
                  <Link href={`/destinations/${booking.destination.slug}`} className="text-sm text-primary font-semibold hover:underline border border-primary px-4 py-2 rounded-lg">
                    View Destination
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
