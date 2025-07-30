"use client"; // Client-side component directive

import { Geist, Geist_Mono } from "next/font/google";
import { useState, useEffect } from "react";
import Loader from "@/app/components/loader";  // Ensure correct import
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      // Wait for at least 5 seconds
      setLoading(false);
      // Check if window is already loaded before the 5-second timeout
      window.onload = () => {
        clearTimeout(timeout); // Clear the timeout if page loads before 5 seconds
        setLoading(false); // Remove the loader once the page is ready
      };
    }, 3000);



    return () => {
      clearTimeout(timeout); // Cleanup timeout
      window.onload = null; // Cleanup window.onload handler
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Localive</title>
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased `}>
        {loading ? <Loader /> : children}
        {/* {children} */}
      </body>
    </html>
  );
}