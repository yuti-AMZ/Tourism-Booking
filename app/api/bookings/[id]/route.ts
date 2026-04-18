import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const { status } = await req.json();

  const booking = await prisma.booking.findUnique({ where: { id } });
  if (!booking) return NextResponse.json({ error: "Not found" }, { status: 404 });
  if (booking.userId !== (session.user as any).id) return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const updated = await prisma.booking.update({
    where: { id },
    data: { status },
  });

  return NextResponse.json(updated);
}
