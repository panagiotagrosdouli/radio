import type { Metadata, Viewport } from "next";
import { RadioPlaybackProvider } from "@/hooks/use-radio-player";
import { PersistentRadioDock } from "@/components/persistent-radio-dock";
import "./globals.css";
import "./professional-theme.css";
import "./readable-theme.css";
import "./radio-station-theme.css";
import "./station-colour.css";
import "./on-air-layout.css";

export const metadata: Metadata = {
  title: { default: "Radio Live — Online Radio from Athens", template: "%s — Radio Live" },
  description: "Listen live to Radio Live, an online radio station from Athens. Music, shows and stories, streaming all day.",
  manifest: "/manifest.webmanifest",
  applicationName: "Radio Live",
  appleWebApp: {
    capable: true,
    title: "Radio Live",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#f6f4ee",
  colorScheme: "light",
};

export const dynamic = "force-static";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <RadioPlaybackProvider>
          {children}
          <PersistentRadioDock />
        </RadioPlaybackProvider>
      </body>
    </html>
  );
}
