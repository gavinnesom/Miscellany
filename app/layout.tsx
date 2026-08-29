import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Gavin's Miscellany",
  description: "A personal encyclopedia and learning curriculum for things worth remembering.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
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
