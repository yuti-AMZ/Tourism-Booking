import type { Metadata, Viewport } from "next";

import "./globals.css";
import Providers from "./providers";
import PWARegister from "@/components/PWARegister";

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
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
          {children}
        </Providers>
      </body>
    </html>
  );
}
