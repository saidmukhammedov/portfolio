import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { me } from "@/lib/content";

const bricolage = localFont({
  src: "./fonts/bricolage-grotesque.woff2",
  variable: "--font-bricolage",
  weight: "200 900",
  display: "swap",
});

const clepto = localFont({
  src: "./fonts/clepto.otf",
  variable: "--font-clepto-local",
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${me.fullName}, ${me.role}`,
  description: me.heroSub,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${bricolage.variable} ${clepto.variable} font-sans`}>
        {children}
      </body>
    </html>
  );
}
