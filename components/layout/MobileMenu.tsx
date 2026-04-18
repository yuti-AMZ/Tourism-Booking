"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { signOut } from "next-auth/react";

interface Props {
  links: { href: string; label: string }[];
  session: boolean;
  isAdmin: boolean;
}

export default function MobileMenu({ links, session, isAdmin }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        className="p-2 rounded-lg hover:bg-muted transition-colors"
        aria-label="Toggle menu"
      >
        {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {open && (
        <div className="absolute top-[57px] left-0 right-0 z-50 bg-background border-b shadow-lg px-4 py-4 flex flex-col gap-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-sm font-medium text-muted-foreground hover:text-primary py-1.5 border-b border-border last:border-0"
            >
              {l.label}
            </Link>
          ))}

          {session ? (
            <>
              <Link href="/dashboard" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary py-1.5 border-b border-border">
                Dashboard
              </Link>
              <Link href="/profile" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary py-1.5 border-b border-border">
                Profile
              </Link>
              {isAdmin && (
                <Link href="/admin/destinations/new" onClick={() => setOpen(false)} className="text-sm font-medium text-muted-foreground hover:text-primary py-1.5 border-b border-border">
                  Add Destination
                </Link>
              )}
              <button
                onClick={() => { signOut({ callbackUrl: "/" }); setOpen(false); }}
                className="text-sm font-medium text-left text-red-600 hover:text-red-700 py-1.5"
              >
                Logout
              </button>
            </>
          ) : (
            <div className="flex gap-3 pt-1">
              <Link href="/auth/login" onClick={() => setOpen(false)} className="flex-1 text-center border border-primary text-primary py-2 rounded-lg text-sm font-semibold">
                Login
              </Link>
              <Link href="/auth/register" onClick={() => setOpen(false)} className="flex-1 text-center bg-primary text-primary-foreground py-2 rounded-lg text-sm font-semibold">
                Register
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
