import { getAuthSession } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";
import PageTransition from "@/components/layout/PageTransition";
import { redirect } from "next/navigation";

type UserWithRole = {
  name?: string;
  role?: string;
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  
  if (!session) {
    redirect("/auth/login");
  }
  
  const user = session?.user as UserWithRole | undefined;
  const isAdmin = user?.role === "ADMIN";
  const userName = user?.name ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={isAdmin} userName={userName} userInitial={userInitial} />
      <div className="flex-1 ml-0 md:ml-56 min-w-0 pt-16 md:pt-0">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
