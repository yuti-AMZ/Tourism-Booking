import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import { getAuthSession } from "@/lib/auth";
import { sendBookingConfirmation } from "@/lib/email";

export async function GET() {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const bookings = await prisma.booking.findMany({
    where: { userId: (session.user as any).id },
    include: { destination: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(bookings);
}

export async function POST(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { destinationId, checkIn, checkOut, guests } = await req.json();

  if (!destinationId || !checkIn || !checkOut || !guests) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const destination = await prisma.destination.findUnique({ where: { id: destinationId } });
  if (!destination) return NextResponse.json({ error: "Destination not found" }, { status: 404 });

  const days = Math.ceil(
    (new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24)
  );
  const totalPrice = days * destination.price * guests;

  const booking = await prisma.booking.create({
    data: {
      userId: (session.user as any).id,
      destinationId,
      checkIn: new Date(checkIn),
      checkOut: new Date(checkOut),
      guests,
      totalPrice,
    },
  });

  // Simulate booking confirmation email
  await sendBookingConfirmation({
    to: session.user?.email ?? "",
    name: session.user?.name ?? "Traveler",
    destination: destination.title,
    checkIn,
    checkOut,
    guests,
    totalPrice,
  });

  return NextResponse.json(booking, { status: 201 });
}
