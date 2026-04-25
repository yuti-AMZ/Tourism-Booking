import Link from "next/link";
import { User, BarChart3, ShieldCheck } from "lucide-react";
import { getAuthSession } from "@/lib/auth";
import LogoutButton from "./LogoutButton";
import MobileMenu from "./MobileMenu";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";
import NavLinks from "./NavLinks";

export default async function Navbar() {
  const session = await getAuthSession();
  const isAdmin = session?.user?.role === "ADMIN";
  const userName = session?.user?.name;

  const links = [
    { href: "#destinations", label: "Destinations" },
    { href: "#gallery", label: "Gallery" },
    { href: "#about", label: "About" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <header className="sticky top-0 z-40 bg-background">
      {isAdmin && (
        <div className="bg-primary py-1 text-center text-xs font-semibold text-primary-foreground">
          <div className="flex items-center justify-center gap-2">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Admin Mode</span>
            <Link href="/admin/analytics" className="underline">
              Go to Analytics
            </Link>
            <span>|</span>
            <Link href="/admin/destinations/new" className="underline">
              Add Destination
            </Link>
          </div>
        </div>
      )}

      <div className="eth-stripe" />

      <nav className="flex items-center justify-between border-b border-border bg-background/95 px-4 py-3 backdrop-blur-sm md:px-6">
        <Link href={isAdmin ? "/admin/analytics" : "/"} className="flex items-center gap-2">
          <span className="text-sm font-black tracking-[0.2em] text-primary">ET</span>
          <span className="text-xl font-bold text-primary">
            EthioTour
            {isAdmin && <span className="ml-1 text-xs font-normal text-yellow-600">Admin</span>}
          </span>
        </Link>

        <div className="hidden items-center gap-5 text-sm font-medium md:flex">
          {isAdmin ? (
            <>
              <Link href="/admin/analytics" className="flex items-center gap-1 text-muted-foreground transition-colors hover:text-primary">
                <BarChart3 className="h-4 w-4" />
                Analytics
              </Link>
              <Link href="/admin/destinations/new" className="text-muted-foreground transition-colors hover:text-primary">
                Add Destination
              </Link>
              <Link href="/destinations" className="text-muted-foreground transition-colors hover:text-primary">
                Destinations
              </Link>
            </>
          ) : (
            <NavLinks />
          )}

          {session ? (
            <>
              {!isAdmin && (
                <Link href="/dashboard" className="text-muted-foreground transition-colors hover:text-primary">
                  Dashboard
                </Link>
              )}

              <Link href="/profile" className="flex items-center gap-1.5 text-muted-foreground transition-colors hover:text-primary">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {userName?.charAt(0)?.toUpperCase() ?? <User className="h-3 w-3" />}
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
              <Link href="/auth/login" className="text-muted-foreground transition-colors hover:text-primary">
                Login
              </Link>
              <Link href="/auth/register" className="rounded-lg bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90">
                Register
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 md:hidden">
          <ThemeToggle />
          <MobileMenu links={links} session={!!session} isAdmin={isAdmin} />
        </div>
      </nav>
    </header>
  );
}
