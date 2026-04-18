"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, MapPin, Heart, User,
  LogOut, BarChart3, PlusCircle, Home,
} from "lucide-react";
import ThemeToggle from "./ThemeToggle";
import LanguageToggle from "./LanguageToggle";

interface Props {
  isAdmin: boolean;
  userName: string;
  userInitial: string;
}

const userLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/destinations", label: "Destinations", icon: MapPin },
  { href: "/dashboard#favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/destinations/new", label: "Add Destination", icon: PlusCircle },
  { href: "/destinations", label: "Destinations", icon: MapPin },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar({ isAdmin, userName, userInitial }: Props) {
  const pathname = usePathname();
  const links = isAdmin ? adminLinks : userLinks;

  return (
    <aside className="fixed left-0 top-0 h-full w-56 bg-sidebar border-r border-sidebar-border flex flex-col z-30">
      <div className="p-4 border-b border-sidebar-border">
        <Link href={isAdmin ? "/admin/analytics" : "/dashboard"} className="flex items-center gap-2">
          <span className="text-xl">🇪🇹</span>
          <span className="font-bold text-base text-primary">EthioTour</span>
        </Link>
      </div>

      <div className="p-3 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0 ${
            isAdmin ? "bg-primary text-primary-foreground" : "bg-primary/10 text-primary"
          }`}>
            {userInitial}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold truncate">{userName}</p>
            <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "User"}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
        <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors">
          <Home className="w-4 h-4" />
          Home
        </Link>
        {links.map(({ href, label, icon: Icon }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                active
                  ? "bg-primary text-primary-foreground font-medium"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-sidebar-border space-y-2">
        <div className="flex items-center gap-2 px-1">
          <ThemeToggle />
          <LanguageToggle />
        </div>
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-destructive/10 hover:text-destructive transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>
    </aside>
  );
}
