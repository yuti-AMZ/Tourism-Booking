import { getAuthSession } from "@/lib/auth";
import Sidebar from "./Sidebar";

export default async function AppShell({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();

  if (!session) return <>{children}</>;

  const isAdmin = (session.user as any)?.role === "ADMIN";
  const userName = session.user?.name ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <div className="flex min-h-screen">
      <Sidebar isAdmin={isAdmin} userName={userName} userInitial={userInitial} />
      <div className="flex-1 ml-56">
        {children}
      </div>
    </div>
  );
}
