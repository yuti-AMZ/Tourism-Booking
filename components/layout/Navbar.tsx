import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import NavLinks from "./NavLinks";
import { User, BarChart3, ShieldCheck } from "lucide-react";

export default async function Navbar() {
  const session = await getAuthSession();
  const isAdmin = (session?.user as any)?.role === "ADMIN";
  const userName = session?.user?.name;

  const links = [
    { href: "#destinations", label: "Destinations" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background">
      {/* Admin banner */}
      {isAdmin && (
        <div className="bg-primary text-primary-foreground text-xs font-semibold text-center py-1 flex items-center justify-center gap-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          Admin Mode — <Link href="/admin/analytics" className="underline">Go to Analytics</Link>
          {" · "}
          <Link href="/admin/destinations/new" className="underline">Add Destination</Link>
        </div>
      )}

      <div className="eth-stripe" />

      <nav className="px-4 md:px-6 py-3 flex items-center justify-between bg-background border-b border-border backdrop-blur-sm bg-background/95">
        <Link href={isAdmin ? "/admin/analytics" : "/"} className="flex items-center gap-2">
          <span className="text-2xl">🇪🇹</span>
          <span className="font-bold text-xl text-primary">
            EthioTour {isAdmin && <span className="text-xs text-yellow-600 font-normal ml-1">Admin</span>}
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-5 text-sm font-medium">

          {/* Admin sees admin links, user sees public links */}
          {isAdmin ? (
            <>
              <Link href="/admin/analytics" className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors">
                <BarChart3 className="w-4 h-4" /> Analytics
              </Link>
              <Link href="/admin/destinations/new" className="text-muted-foreground hover:text-primary transition-colors">
                Add Destination
              </Link>
              <Link href="/destinations" className="text-muted-foreground hover:text-primary transition-colors">
                Destinations
              </Link>
            </>
          ) : (
            <NavLinks />
          )}

          {session ? (
            <>
              {/* User dashboard — only for non-admins */}
              {!isAdmin && (
                <Link href="/dashboard" className="text-muted-foreground hover:text-primary transition-colors">
                  Dashboard
                </Link>
              )}

              {/* Profile avatar */}
              <Link href="/profile" className="flex items-center gap-1.5 text-muted-foreground hover:text-primary transition-colors">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold bg-primary text-primary-foreground`}>
                  {userName?.charAt(0)?.toUpperCase() ?? <User className="w-3 h-3" />}
                </div>
              </Link>

              <ThemeToggle />
              <LanguageToggle />
              <LogoutButton />
            </>
          ) : (
            <>
              <ThemeToggle />
              <LanguageToggle />
              <Link href="/auth/login" className="text-muted-foreground hover:text-primary transition-colors">
                Login
              </Link>
              <Link href="/auth/register" className="bg-primary text-primary-foreground px-4 py-1.5 rounded-lg text-sm font-semibold hover:opacity-90 transition-opacity">
                Register
              </Link>
            </>
          )}
        </div>

        {/* Mobile */}
        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu links={links} session={!!session} isAdmin={isAdmin} />
        </div>
      </nav>
    </header>
  );
}
