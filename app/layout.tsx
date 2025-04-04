import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Search from "@/components/search";
import { aktive, aktivThin, aktiveBold, aktiveMedium } from "@/fonts/font";
import Footer from "@/components/footer";
import Initialize from "@/components/initialize";
import { NavigationProgress } from "@/components/progress";

export const metadata: Metadata = {
  title: "0xscan",
  description:
    "0xscan is a platform that provides real-time data on crypto trades.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={` ${aktive.variable} ${aktivThin.variable} ${aktiveBold.variable}  ${aktiveMedium.variable} antialiased text-white overflow-x-hidden`}
      >
        <Navbar />
        <div className="lg:mt-[20px] mt-[27px]" />

        <NavigationProgress />
        <Initialize>{children}</Initialize>
        <Footer />
      </body>
    </html>
  );
}
