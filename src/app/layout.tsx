"use client";

import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/navbar/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Loading from "@/components/loading/loading";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const start = setTimeout(() => setLoading(true), 0);
    const end = setTimeout(() => setLoading(false), 300);

    return () => {
      clearTimeout(start);
      clearTimeout(end);
    };
  }, [pathname]);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <Navbar wishlistCount={0} />
          {loading && <Loading />}
          <div className={loading ? "opacity-50 pointer-events-none" : ""}>{children}</div>
        </UserProvider>
      </body>
    </html>
  );
}
