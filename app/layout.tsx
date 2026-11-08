import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Radio Live — We’ve Got Rhythm", template: "%s — Radio Live" },
  description: "No ads. Just music, voices and stories worth staying for. Tune in to Radio Live from Athens, all day, every day, everywhere.",
  manifest: "/manifest.webmanifest",
  applicationName: "Radio Live",
  appleWebApp: {
    capable: true,
    title: "Radio Live",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export const viewport: Viewport = {
  themeColor: "#fff7e8",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
