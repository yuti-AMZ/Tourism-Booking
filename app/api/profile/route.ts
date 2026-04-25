import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/auth";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const session = await getAuthSession();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const userId = session.user.id;
  const { name, avatar } = await req.json();

  const updated = await prisma.user.update({
    where: { id: userId },
    data: {
      ...(name && { name }),
      ...(avatar && { avatar }),
    },
    select: { id: true, name: true, email: true, avatar: true, role: true },
  });

  return NextResponse.json(updated);
}
