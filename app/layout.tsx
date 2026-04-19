import type { Metadata, Viewport } from "next";

type UserWithRole = {
  name?: string;
  role?: string;
};
import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import PWARegister from "@/components/PWARegister";
import PageTransition from "@/components/layout/PageTransition";
import { getAuthSession } from "@/lib/auth";
import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "EthioTour – Discover Ethiopia",
  description: "Discover and book amazing Ethiopian travel destinations",
  manifest: "/manifest.json",
  appleWebApp: { capable: true, statusBarStyle: "default", title: "EthioTour" },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#078930",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  const isLoggedIn = !!session;
  const user = session?.user as UserWithRole | undefined;
  const isAdmin = user?.role === "ADMIN";
  const userName = user?.name ?? "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="167x167" href="/icons/icon-167x167.png" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-title" content="EthioTour" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>
        <Providers>
          <PWARegister />
          {isLoggedIn ? (
            <div className="flex min-h-screen">
              <Sidebar isAdmin={isAdmin} userName={userName} userInitial={userInitial} />
              <div className="flex-1 ml-0 md:ml-56 min-w-0">
                <PageTransition>{children}</PageTransition>
              </div>
            </div>
          ) : (
            <>
              <Navbar />
              <main>
                <PageTransition>{children}</PageTransition>
              </main>
            </>
          )}
        </Providers>
      </body>
    </html>
  );
}
