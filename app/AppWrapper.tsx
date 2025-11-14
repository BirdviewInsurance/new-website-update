"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Script from "next/script";

import { Providers } from "./providers";
import { siteConfig } from "@/config/site";
import CookieConsent from "@/components/CookieConsent";
import { Navbar } from "@/components/navbar";

function SplashLoader() {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-br from-primary to-danger text-white">
      <div className="flex flex-col items-center gap-6">
        <Image
          alt="Brand Logo"
          className="animate-bounce"
          height={120}
          src="/logo.png"
          width={120}
        />

        <h1 className="text-4xl font-bold tracking-widest animate-pulse">
          {siteConfig.name}
        </h1>

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
      setShowLoader(false);
    } else {
      const timer = setTimeout(() => {
        setShowLoader(false);
        localStorage.setItem("hasVisited", "true");
      }, 2500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (showLoader) return <SplashLoader />;

  return (
    <>
      {/* 📊 Metricool Tracker */}
      {/* cSpell:ignore metricool */}
      <Script
        id="metricool"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            function loadScript(a) {
              var b = document.getElementsByTagName("head")[0],
                  c = document.createElement("script");
              c.type = "text/javascript";
              c.src = "https://tracker.metricool.com/resources/be.js";
              c.onreadystatechange = a;
              c.onload = a;
              b.appendChild(c);
            }
            loadScript(function() {
              beTracker.t({hash: "7617bfca2e36baaadb4c9ce7bf8a6683"});
            });
          `,
        }}
      />

      {/* 📊 Google Analytics */}
      <Script
        strategy="afterInteractive"
        src="https://www.googletagmanager.com/gtag/js?id=G-7BVE0901VN"
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-7BVE0901VN', {
              page_path: window.location.pathname,
            });
          `,
        }}
      />

      {/* 📊 Facebook Pixel */}
      <Script
        id="facebook-pixel"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', '1237876411208319');
            fbq('track', 'PageView');
          `,
        }}
      />

      {/* FB Pixel Fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: "none" }}
          src="https://www.facebook.com/tr?id=1237876411208319&ev=PageView&noscript=1"
        />
      </noscript>

      {/* -------------------------------------------------------- */}
      {/* 🔹 Page Layout */}
      {/* -------------------------------------------------------- */}

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
