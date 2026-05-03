import { getAuthSession } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
import Image from "next/image";
import ProfileForm from "@/components/profile/profile-form";
import { Calendar, Heart, Award, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ProfilePage() {
  const session = await getAuthSession();
  if (!session) redirect("/auth/login");

  const userId = session.user.id;
  
  // Fetch user data along with aggregate counts
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { 
      id: true, name: true, email: true, avatar: true, role: true, createdAt: true,
      _count: {
        select: {
          bookings: true,
          favorites: true,
        }
      }
    },
  });

  if (!user) redirect("/auth/login");

  return (
    <div className="min-h-screen pb-10">
      {/* Header */}
      <div
        className="py-12 px-6 text-white relative overflow-hidden"
        style={{ background: "linear-gradient(135deg, #078930, #1a5c2a)" }}
      >
        <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
          {/* Decorative pattern could go here */}
        </div>
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-yellow-400 flex items-center justify-center text-gray-900 text-4xl font-bold border-4 border-white/20 shadow-xl flex-shrink-0">
            {user.avatar ? (
              <Image
                src={user.avatar}
                alt={user.name ?? ""}
                width={128}
                height={128}
                unoptimized
                className="h-full w-full rounded-full object-cover"
              />
            ) : (
              user.name?.charAt(0)?.toUpperCase() ?? "?"
            )}
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold">{user.name}</h1>
            <p className="text-green-200 mt-1">{user.email}</p>
            <div className="mt-4 flex flex-wrap gap-2 justify-center md:justify-start">
              <span className="inline-flex items-center gap-1 text-xs bg-yellow-400 text-gray-900 px-3 py-1 rounded-full font-semibold">
                <Award className="w-3 h-3" /> {user.role}
              </span>
              <span className="inline-flex items-center gap-1 text-xs bg-white/20 text-white px-3 py-1 rounded-full font-semibold backdrop-blur-sm">
                <Clock className="w-3 h-3" /> Member since {new Date(user.createdAt).getFullYear()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="eth-stripe h-1.5 w-full" />

      <div className="max-w-4xl mx-auto px-4 py-10">
        
        {/* Dynamic Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <div className="border rounded-2xl p-5 bg-card flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-3">
              <Calendar className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{user._count.bookings}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Bookings</p>
          </div>
          
          <div className="border rounded-2xl p-5 bg-card flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-red-500/10 flex items-center justify-center text-red-500 mb-3">
              <Heart className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{user._count.favorites}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Favorites</p>
          </div>
          
          <div className="border rounded-2xl p-5 bg-card flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
            <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
              <Award className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold capitalize">{user.role.toLowerCase()}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Status</p>
          </div>

          <div className="border rounded-2xl p-5 bg-card flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow">
             <div className="w-10 h-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <p className="text-2xl font-bold">{new Date(user.createdAt).toLocaleDateString("en-US", { month: "short", year: "2-digit" })}</p>
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Joined</p>
          </div>
        </div>

        {/* Edit form */}
        <div className="border rounded-2xl p-6 bg-card shadow-sm">
          <h2 className="text-xl font-bold mb-6">Profile Settings</h2>
          <ProfileForm user={{ name: user.name ?? "", email: user.email, avatar: user.avatar ?? "" }} />
        </div>
      </div>
    </div>
  );
}
