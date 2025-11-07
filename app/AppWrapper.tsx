"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import CookieConsent from "@/components/CookieConsent";
import { Navbar } from "@/components/navbar";

function SplashLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-danger text-white">
      <div className="flex flex-col items-center gap-6">
        {/* Replace with your brand logo */}
        <Image
          alt="Brand Logo"
          className="animate-bounce"
          height={120}
          src="/logo.png"
          width={120}
        />

        {/* Animated company name */}
        <h1 className="text-4xl font-bold tracking-widest animate-pulse">
          {siteConfig.name}
        </h1>

        {/* Classy loading animation */}
        <div className="flex gap-2">
          <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0s]" />
          <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
          <span className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
        </div>
      </div>
    </div>
  );
}

export default function AppWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [showLoader, setShowLoader] = useState(true);

  useEffect(() => {
    const visited = localStorage.getItem("hasVisited");

    if (visited) {
      setShowLoader(false); // already visited → skip loader
    } else {
      // First visit → show loader, then hide
      const timer = setTimeout(() => {
        setShowLoader(false);
        localStorage.setItem("hasVisited", "true");
      }, 2500); // splash duration

      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoader) return <SplashLoader />;

  return (
    <>
      <CookieConsent />
      {/* 🔹 Global Background */}
      <div className="absolute inset-0 -z-10">
        <Image
          fill
          priority
          alt="Background"
          className="object-cover"
          src="/images/backdrop2.jpg"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-danger/40" />
      </div>

      <Providers themeProps={{ attribute: "class", defaultTheme: "dark" }}>
        <div className="flex flex-col min-h-screen relative z-10">
          <Navbar />
          <main
            className="container mx-auto max-w-7xl pt-16 px-6 flex-grow
              bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.2)]"
          >
            {children}
          </main>
        </div>
      </Providers>
    </>
  );
}
