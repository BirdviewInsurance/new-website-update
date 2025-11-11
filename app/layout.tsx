import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@heroui/link";
import clsx from "clsx";
import Image from "next/image";

import { Providers } from "./providers";

import { siteConfig } from "@/config/site";
import { fontSans } from "@/config/fonts";
import { Navbar } from "@/components/navbar";
import CookieConsent from "@/components/CookieConsent";

// ✅ SEO metadata
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url || "https://birdviewmicroinsurance.com/"),
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    images: [
      {
        url: "/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} Cover`,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/images/og-image.jpg"],
    creator: "@BirdviewInsur",
  },
  manifest: "/manifest.json",
};

// ✅ Theme and viewport color config
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* ✅ SEO Meta */}
        <meta content="width=device-width, initial-scale=1" name="viewport" />
        <meta
          content="insurance, microinsurance, Birdview, Kenya insurance, medical cover, last expense, accident cover"
          name="keywords"
        />
        <meta content="Birdview Microinsurance" name="author" />
      </head>
      <body
        className={clsx(
          "min-h-screen text-foreground bg-background font-sans antialiased relative",
          fontSans.variable,
        )}
      >
        {/* ✅ Cookie Consent */}
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

        {/* ✅ Theming Provider */}
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="flex flex-col min-h-screen relative z-10">
            <Navbar />

            {/* ✅ Frosted main content */}
            <main
              className="relative flex-grow w-full min-h-[calc(100vh-4rem)]
              bg-white/10 dark:bg-black/20 backdrop-blur-xl
              border-t border-white/10
              shadow-[0_8px_30px_rgba(0,0,0,0.2)]
              overflow-hidden"
            >
              {children}
            </main>

            {/* ✅ Footer (kept identical) */}
            <footer className="w-full flex flex-col items-center justify-center py-6 bg-primary text-white border-t-4 border-danger">
              <div className="max-w-7xl w-full px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {/* About Section */}
                <div>
                  <h5 className="font-semibold text-lg mb-4">About</h5>
                  <div className="flex flex-col gap-3">
                    {[
                      { href: "/", label: "Home" },
                      { href: "/about", label: "About Us" },
                      {
                        href: "/our-leadership#board",
                        label: "Our Leadership",
                      },
                      {
                        href: "/our-leadership#executives",
                        label: "Our Management",
                      },
                      { href: "/our-leadership#advisors", label: "Advisors" },
                      { href: "/careers", label: "Careers" },
                      { href: "/contact-us", label: "Contact Us" },
                    ].map(({ href, label }) => (
                      <Link
                        key={label}
                        className="relative text-gray-200 hover:text-white transition-colors duration-300 group"
                        href={href}
                      >
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                        <span className="inline-block px-1 py-0.5 border border-transparent rounded group-hover:border-white transition-all duration-300">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Products Section */}
                <div>
                  <h5 className="font-semibold text-lg mb-4">Products</h5>
                  <div className="flex flex-col gap-3">
                    {[
                      {
                        href: "/products/evacuation_and_repatriation",
                        label: "Medical Insurance",
                      },
                      {
                        href: "/products/last_expense",
                        label: "Last Expense Cover",
                      },
                      { href: "/products/medical", label: "Medical" },
                      {
                        href: "/products/hospital_cash",
                        label: "Hospital Cash",
                      },
                      {
                        href: "/products/personal_accident",
                        label: "Personal Accident",
                      },
                      {
                        href: "/products/bodaboda_welfare",
                        label: "BodaBoda Welfare Cover",
                      },
                      {
                        href: "/products/tuktuk_welfare",
                        label: "Tuktuk Welfare Cover",
                      },
                      {
                        href: "/products/probation_guard",
                        label: "Probation Guard",
                      },
                    ].map(({ href, label }) => (
                      <Link
                        key={label}
                        className="relative text-gray-200 hover:text-white transition-colors duration-300 group"
                        href={href}
                      >
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                        <span className="inline-block px-1 py-0.5 border border-transparent rounded group-hover:border-white transition-all duration-300">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Legal Section */}
                <div>
                  <h5 className="font-semibold text-lg mb-4">Legal</h5>
                  <div className="flex flex-col gap-3">
                    {[
                      { href: "/cookie-policy", label: "Cookie Policy" },
                      { href: "/privacy-policy", label: "Privacy Policy" },
                    ].map(({ href, label }) => (
                      <Link
                        key={label}
                        className="relative text-gray-200 hover:text-white transition-colors duration-300 group"
                        href={href}
                      >
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                        <span className="inline-block px-1 py-0.5 border border-transparent rounded group-hover:border-white transition-all duration-300">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Resources Section */}
                <div>
                  <h5 className="font-semibold text-lg mb-4">Resources</h5>
                  <div className="flex flex-col gap-3">
                    {[
                      { href: "/blog", label: "Blogs" },
                      { href: "/newsroom", label: "News" },
                      { href: "/faq", label: "FAQ" },
                      { href: "/downloads", label: "Downloads" },
                      { href: "/providers", label: "Providers" },
                      { href: "/pictorial", label: "Pictorial" },
                    ].map(({ href, label }) => (
                      <Link
                        key={label}
                        className="relative text-gray-200 hover:text-white transition-colors duration-300 group"
                        href={href}
                      >
                        <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-white transition-all duration-300 group-hover:w-full" />
                        <span className="inline-block px-1 py-0.5 border border-transparent rounded group-hover:border-white transition-all duration-300">
                          {label}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              <hr className="w-full border-t border-white mt-6 mb-4" />

              {/* ✅ Location + Socials */}
              <div className="max-w-7xl w-full px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white">
                <p>
                  Location: Ground Floor, Fidelity Center, Waiyaki Way,
                  Westlands, Nairobi, Kenya
                </p>

                <div className="max-w-7xl w-full px-6 py-2 flex justify-center text-sm text-white text-center">
                  <p>
                    © {new Date().getFullYear()} Birdview Microinsurance. All
                    rights reserved. Regulated by the Insurance Regulatory
                    Authority.
                  </p>
                </div>

                <div className="flex items-center gap-6">
                  {/* ✅ Social Media Links */}
                  {[
                    {
                      href: "https://www.facebook.com/share/17HhNv62FW/",
                      label: "Facebook",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 5 3.657 9.128 8.438 9.876v-6.988H7.898v-2.888h2.54V9.797c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.465h-1.26c-1.242 0-1.63.771-1.63 1.562v1.875h2.773l-.443 2.888h-2.33v6.988C18.343 21.128 22 17 22 12z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://twitter.com/BirdviewInsur",
                      label: "Twitter",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23 3a10.9 10.9 0 01-3.14 1.53A4.48 4.48 0 0022.4.36a9.09 9.09 0 01-2.88 1.1A4.52 4.52 0 0016.5 0c-2.66 0-4.8 2.14-4.8 4.8 0 .38.04.75.12 1.11C7.69 6.7 4.07 4.84 1.64 1.84a4.8 4.8 0 00-.65 2.41c0 1.66.85 3.13 2.14 3.99A4.48 4.48 0 012 7.3v.06c0 2.32 1.65 4.25 3.84 4.7a4.5 4.5 0 01-2.15.08 4.8 4.8 0 004.48 3.32A9.06 9.06 0 010 19.54a12.78 12.78 0 006.92 2.03c8.3 0 12.84-6.88 12.84-12.84 0-.2 0-.39-.02-.58A9.22 9.22 0 0024 4.56a9.15 9.15 0 01-2.61.72A4.48 4.48 0 0023 3z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.instagram.com/birdviewinsurance/",
                      label: "Instagram",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2.2c3.2 0 3.584.012 4.85.07 1.17.054 1.97.23 2.43.38a4.92 4.92 0 011.78 1.15 4.92 4.92 0 011.15 1.78c.15.46.326 1.26.38 2.43.058 1.266.07 1.65.07 4.85s-.012 3.584-.07 4.85c-.054 1.17-.23 1.97-.38 2.43a4.92 4.92 0 01-1.15 1.78 4.92 4.92 0 01-1.78 1.15c-.46.15-1.26.326-2.43.38-1.266.058-1.65.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.97-.23-2.43-.38a4.92 4.92 0 01-1.78-1.15 4.92 4.92 0 01-1.15-1.78c-.15-.46-.326-1.26-.38-2.43C2.212 15.584 2.2 15.2 2.2 12s.012-3.584.07-4.85c.054-1.17.23-1.97.38-2.43a4.92 4.92 0 011.15-1.78 4.92 4.92 0 011.78-1.15c.46-.15 1.26-.326 2.43-.38C8.416 2.212 8.8 2.2 12 2.2zm0-2.2C8.736 0 8.332.013 7.053.072 5.77.13 4.878.308 4.126.55a7.085 7.085 0 00-2.58 1.07A7.085 7.085 0 00.47 4.2c-.242.752-.42 1.644-.478 2.927C-.014 8.332 0 8.736 0 12c0 3.264.013 3.668.072 4.947.058 1.283.236 2.175.478 2.927a7.085 7.085 0 001.07 2.58 7.085 7.085 0 002.58 1.07c.752.242 1.644.42 2.927.478C8.332 23.986 8.736 24 12 24s3.668-.014 4.947-.072c1.283-.058 2.175-.236 2.927-.478a7.085 7.085 0 002.58-1.07 7.085 7.085 0 001.07-2.58c.242-.752.42-1.644.478-2.927.058-1.279.072-1.683.072-4.947s-.014-3.668-.072-4.947c-.058-1.283-.236-2.175-.478-2.927a7.085 7.085 0 00-1.07-2.58 7.085 7.085 0 00-2.58-1.07c-.752-.242-1.644-.42-2.927-.478C15.668.014 15.264 0 12 0z" />
                          <circle cx="12" cy="12" r="3.2" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.tiktok.com/@birdviewinsurance",
                      label: "TikTok",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12.8 2h3.2c.2 1 .8 2 1.6 2.8.9.9 2.1 1.4 3.4 1.6v3.3c-1.3 0-2.6-.3-3.8-.9v6.8c0 3.7-3 6.7-6.7 6.7-1.8 0-3.5-.7-4.8-2s-2-3-2-4.8c0-3.7 3-6.7 6.7-6.7.2 0 .4 0 .6.1v3.4c-.2 0-.4-.1-.6-.1-1.8 0-3.3 1.5-3.3 3.3 0 .9.3 1.7 1 2.4.6.6 1.5 1 2.4 1 1.8 0 3.3-1.5 3.3-3.3V2z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.linkedin.com/company/birdviewinsurance/",
                      label: "LinkedIn",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M4.98 3.5c0 1.38-1.11 2.5-2.48 2.5S0 4.88 0 3.5 1.11 1 2.5 1s2.48 1.12 2.48 2.5zM0 24h5V7H0v17zm7 0h5V14c0-2.5 3-2.7 3 0v10h5V13c0-5-5-4.8-6 0v11z" />
                        </svg>
                      ),
                    },
                    {
                      href: "https://www.youtube.com/channel/...",
                      label: "YouTube",
                      icon: (
                        <svg
                          className="w-8 h-8"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M23.498 6.186a2.994 2.994 0 00-2.112-2.116C19.715 3.5 12 3.5 12 3.5s-7.715 0-9.386.57a2.994 2.994 0 00-2.112 2.116A31.455 31.455 0 000 12a31.455 31.455 0 00.502 5.814 2.994 2.994 0 002.112 2.116C4.285 20.5 12 20.5 12 20.5s7.715 0 9.386-.57a2.994 2.994 0 002.112-2.116A31.455 31.455 0 0024 12a31.455 31.455 0 00-.502-5.814zM9.545 15.568V8.432l6.182 3.568-6.182 3.568z" />
                        </svg>
                      ),
                    },
                  ].map(({ href, label, icon }) => (
                    <Link
                      key={label}
                      aria-label={label}
                      className="relative text-white hover:text-white transition-transform duration-300 hover:scale-125"
                      href={href}
                      target="_blank"
                    >
                      {icon}
                    </Link>
                  ))}
                </div>
              </div>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
