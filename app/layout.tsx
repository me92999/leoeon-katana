import type { Metadata } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "WOLFKATANA - Katana Swords for Sale",
  description:
    "Welcome to WOLFKATANA. We bring your favorite Movies, Video Games, and Anime Swords to life. Authentic replica swords for cosplays, collectors and die-hard fans.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="antialiased bg-dark text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
