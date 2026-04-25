import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProfileForm from "@/components/profile/profile-form";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const userId = session.user.id;
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, name: true, email: true, avatar: true, role: true, createdAt: true },
  });

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div
        className="py-12 px-6 text-white"
        style={{ background: "linear-gradient(135deg, #078930, #1a5c2a)" }}
      >
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-20 h-20 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 text-3xl font-bold mx-auto mb-4">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name ?? ""}
                width={80}
                height={80}
                unoptimized
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase() ?? "?"
            )}
          </div>
          <h1 className="text-2xl font-bold">{user.name}</h1>
          <p className="text-green-200 text-sm mt-1">{user.email}</p>
          <span className="inline-block mt-2 text-xs bg-yellow-400 text-gray-900 px-3 py-0.5 rounded-full font-semibold">
            {user.role}
          </span>
        </div>
      </div>

      <div className="eth-stripe" />

      <div className="max-w-2xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="border rounded-2xl p-4 bg-card text-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Member Since</p>
            <p className="font-bold">{new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}</p>
          </div>
          <div className="border rounded-2xl p-4 bg-card text-center">
            <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Account Type</p>
            <p className="font-bold capitalize">{user.role.toLowerCase()}</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="border rounded-2xl p-6 bg-card">
          <h2 className="text-lg font-bold mb-5">Edit Profile</h2>
          <ProfileForm user={{ name: user.name ?? "", email: user.email, avatar: user.avatar ?? "" }} />
        </div>
      </div>
    </div>
  );
}
