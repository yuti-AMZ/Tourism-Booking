"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import {
  LayoutDashboard, MapPin, Heart, User,
  LogOut, BarChart3, PlusCircle, Calendar, Menu, X
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
  { href: "/bookings", label: "My Bookings", icon: Calendar },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

const adminLinks = [
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/destinations/new", label: "Add Destination", icon: PlusCircle },
  { href: "/destinations", label: "Destinations", icon: MapPin },
  { href: "/admin/bookings", label: "Manage Bookings", icon: Calendar },
  { href: "/favorites", label: "Favorites", icon: Heart },
  { href: "/profile", label: "Profile", icon: User },
];

export default function Sidebar({ isAdmin, userName, userInitial }: Props) {
  const pathname = usePathname();
  const links = isAdmin ? adminLinks : userLinks;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40 p-2 bg-primary text-primary-foreground rounded-md shadow-md"
      >
        <Menu className="w-5 h-5" />
      </button>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40" 
          onClick={() => setIsOpen(false)} 
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-56 bg-sidebar border-r border-sidebar-border flex flex-col z-50 transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-4 border-b border-sidebar-border flex justify-between items-center">
          <Link href={isAdmin ? "/admin/analytics" : "/dashboard"} className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
            <span className="text-xl">🇪🇹</span>
            <span className="font-bold text-base text-primary">EthioTour</span>
          </Link>
          <button className="md:hidden p-1 rounded-md hover:bg-accent" onClick={() => setIsOpen(false)}>
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
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
          {links.map(({ href, label, icon: Icon }) => {
            const active = pathname === href || pathname.startsWith(href + "/");
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setIsOpen(false)}
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
    </>
  );
}
