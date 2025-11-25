"use client";

import "./globals.css";
import { UserProvider } from "@/context/UserContext";
import Navbar from "@/components/navbar/navbar";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <UserProvider>
          <Navbar wishlistCount={0} />

          <div>{children}</div>

          {/* Global Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 3000,
              style: {
                borderRadius: "10px",
                background: "#13cd35ff",
                color: "#fff",
              },
            }}
          />
        </UserProvider>
      </body>
    </html>
  );
}
