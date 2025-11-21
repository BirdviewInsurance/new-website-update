"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Card, CardHeader } from "@heroui/react";
import { Briefcase, Users2, Star, Globe2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";

export default function OurLeadership() {
  const router = useRouter();
  const makeSlug = (name: string) => name.toLowerCase().replace(/\s+/g, "-");

  const board = [
    {
      name: "Geoffrey Kangwana",
      title: "Chairman - Board Of Directors",
      img: "/assets/managementPhotos/Geoffrey-Kangwana.png",
    },
    {
      name: "Rodgers Moindi",
      title: "Director & Chief Executive Officer",
      img: "/assets/managementPhotos/Rodgers-Moindi.png",
    },
    {
      name: "Richard Muiru",
      title: "Director",
      img: "/assets/managementPhotos/Richard-Muiru.png",
    },
    {
      name: "James Kimani",
      title: "Director",
      img: "/assets/managementPhotos/James-Kimani.png",
    },
    {
      name: "Obed Menjeri",
      title: "Director",
      img: "/assets/managementPhotos/Obed-Menjeri.png",
    },
    {
      name: "James Nyakundi",
      title: "Director",
      img: "/assets/managementPhotos/James-Nyakundi.png",
    },
  ];

  const executives = [
    {
      name: "Rodgers Moindi",
      title: "Chief Executive Officer",
      img: "/assets/managementPhotos/Rodgers-Moindi.png",
    },
    {
      name: "Mary Mundia",
      title: "Finance Manager",
      img: "/assets/managementPhotos/Mary-Mundia.png",
    },
    {
      name: "Obed Menjeri",
      title: "Head of Business Development",
      img: "/assets/managementPhotos/Obed-Menjeri.png",
    },
    {
      name: "Eve Wanjira",
      title: "Head of Strategic Partnerships & Growth",
      img: "/assets/managementPhotos/Eve-Wanjira.png",
    },
    {
      name: "Ann Kinyanjui",
      title: "Diaspora Business Development Manager",
      img: "/assets/managementPhotos/Ann-Kinyanjui.png",
    },
    {
      name: "Esdor Yahuma",
      title: "Assistant Business Development Manager",
      img: "/assets/managementPhotos/Esdor-Yahuma.png",
    },
  ];

  // --- Hero enhancements state & refs ---
  const heroRef = useRef<HTMLDivElement | null>(null);
  const particleRef = useRef<HTMLCanvasElement | null>(null);
  const heroBgRef = useRef<HTMLDivElement | null>(null);
  const [overlayOpacity, setOverlayOpacity] = useState(0.78); // adjusted by auto-contrast
  const [isDarkImage, setIsDarkImage] = useState(false);

  // hero image path (replace if needed)
  const heroImage = "/assets/backgroundPhotes/bg-hero1.jpg";
  const ctaImage = "/assets/backgroundPhotes/cta-banner.jpg";

  // ---------- Auto-contrast (compute average brightness) ----------
  useEffect(() => {
    let cancelled = false;
    const img = document.createElement("img") as HTMLImageElement;
    img.crossOrigin = "anonymous";
    img.src = heroImage;
    img.onload = () => {
      if (cancelled) return;
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");
      if (!ctx) return;
      const w = (canvas.width = Math.min(200, img.width));
      const h = (canvas.height = Math.min(200, img.height));
      ctx.drawImage(img, 0, 0, w, h);
      const data = ctx.getImageData(0, 0, w, h).data;
      let r = 0,
        g = 0,
        b = 0;
      const len = data.length / 4;
      for (let i = 0; i < data.length; i += 4) {
        r += data[i];
        g += data[i + 1];
        b += data[i + 2];
      }
      r = r / len;
      g = g / len;
      b = b / len;
      // luminance formula
      const lum = 0.2126 * r + 0.7152 * g + 0.0722 * b;
      // if image is bright, use darker overlay; if dark, reduce overlay and brighten text
      if (lum > 140) {
        setOverlayOpacity(0.82); // image bright -> stronger color overlay
        setIsDarkImage(false);
      } else {
        setOverlayOpacity(0.55); // image dark -> lighter overlay so details show
        setIsDarkImage(true);
      }
    };
    img.onerror = () => {
      // fallback keep defaults
    };
    return () => {
      cancelled = true;
    };
  }, [heroImage]);

  // ---------- Parallax scrolling for hero background ----------
  useEffect(() => {
    const el = heroRef.current;
    if (!el) return;
    let rafId = 0;

    const onScroll = () => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      const centerY = rect.top + rect.height / 2;
      const winH = window.innerHeight;
      // compute progress from -1..1
      const progress = Math.max(-1, Math.min(1, (winH / 2 - centerY) / (winH)));
      // parallax translate (small)
      const translate = progress * 20; // px
      const bgEl = heroBgRef.current;
      if (bgEl) {
        bgEl.style.transform = `translate3d(0, ${translate}px, 0) scale(1.03)`;
        // shift background position slightly
        bgEl.style.backgroundPosition = `${50 + progress * 8}% ${50 + progress * 6}%`;
      }
    };

    const handler = () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(onScroll);
    };

    window.addEventListener("scroll", handler, { passive: true });
    // initial
    handler();

    return () => {
      window.removeEventListener("scroll", handler);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  // ---------- Particles Canvas (simple and performant) ----------
  useEffect(() => {
    const canvas = particleRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = (canvas.width = canvas.clientWidth * devicePixelRatio);
    let h = (canvas.height = canvas.clientHeight * devicePixelRatio);

    // Particle setup
    const PARTICLE_COUNT = Math.max(20, Math.floor((canvas.clientWidth * canvas.clientHeight) / 25000));
    const particles: {
      x: number;
      y: number;
      vx: number;
      vy: number;
      r: number;
      alpha: number;
      drift: number;
    }[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.2,
        vy: (Math.random() - 0.3) * 0.4 - 0.05,
        r: 0.6 + Math.random() * 2.6,
        alpha: 0.06 + Math.random() * 0.18,
        drift: (Math.random() - 0.5) * 0.2,
      });
    }

    let running = true;
    let last = performance.now();

    const draw = (now: number) => {
      const dt = Math.min(60, now - last);
      last = now;
      ctx.clearRect(0, 0, w, h);

      // subtle gradient background for particles (transparent)
      for (let p of particles) {
        p.x += p.vx * dt * 0.06 + p.drift * 0.02;
        p.y += p.vy * dt * 0.06;

        // wrap
        if (p.x < -50) p.x = w + 50;
        if (p.x > w + 50) p.x = -50;
        if (p.y < -50) p.y = h + 50;
        if (p.y > h + 50) p.y = -50;

        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.arc(p.x, p.y, p.r * devicePixelRatio, 0, Math.PI * 2);
        ctx.fill();
      }

      if (running) requestAnimationFrame(draw);
    };

    const onResize = () => {
      // adjust size and scale for DPR
      canvas.style.width = `${canvas.clientWidth}px`;
      canvas.style.height = `${canvas.clientHeight}px`;
      w = (canvas.width = canvas.clientWidth * devicePixelRatio);
      h = (canvas.height = canvas.clientHeight * devicePixelRatio);
    };

    window.addEventListener("resize", onResize, { passive: true });
    requestAnimationFrame(draw);

    return () => {
      running = false;
      window.removeEventListener("resize", onResize);
    };
  }, []);

  // ---------- Utility: responsive clamp values via inline style (tailwind can't clamp dynamic strings easily) ----------
  const heroTitleStyle: React.CSSProperties = {
    // example: clamp(2.25rem, 5vw + 1rem, 3.75rem)
    fontSize: "clamp(2.5rem, 5vw, 3.75rem)",
    lineHeight: 1.02,
  };
  const heroParaStyle: React.CSSProperties = {
    fontSize: "clamp(1rem, 2.2vw, 1.125rem)",
  };

  return (
    <section className="relative w-full min-h-screen overflow-hidden bg-gradient-to-b from-white via-slate-50 to-slate-100 dark:from-gray-950 dark:via-gray-900 dark:to-black px-6 md:px-12 lg:px-24 pt-0 pb-20 space-y-28 transition-colors duration-700">
      {/* --- HERO (enhanced) --- */}
      <motion.section
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] 
             overflow-hidden -mt-0"
      >
        {/* Particles */}
        <canvas
          ref={particleRef}
          className="pointer-events-none absolute inset-0 w-full h-full opacity-90 mix-blend-screen"
          style={{ zIndex: 5 }}
        />

        {/* Parallax Background */}
        <div
          ref={heroBgRef}
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[600ms]"
          style={{
            backgroundImage: `url('${heroImage}')`,
            filter: isDarkImage ? "brightness(1.1)" : "brightness(0.7)",
          }}
        />

        {/* Overlay with auto-contrast */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/60"
          style={{ opacity: overlayOpacity }}
        />

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center text-white py-32 md:py-40">
          <h1
            style={heroTitleStyle}
            className="font-bold tracking-tight drop-shadow-xl text-5xl md:text-6xl lg:text-7xl"
          >
            Our Leadership
          </h1>
          <p
            style={heroParaStyle}
            className="mt-6 max-w-3xl mx-auto text-white drop-shadow-2xl text-xl md:text-2xl lg:text-4xl font-semibold leading-snug text-center"
          >
            Meet the visionary leaders powering our success — innovators, strategists, and change makers committed to excellence, shaping bold ideas into transformative solutions, and creating lasting value for our clients, partners, and communities.
          </p>
        </div>
      </motion.section>

      {/* Floating Gradient Lights (kept) */}
      <motion.div
        animate={{ y: [0, 40, 0] }}
        className="absolute -top-40 left-1/4 w-[30rem] h-[30rem] bg-gradient-to-br from-blue-600/30 via-cyan-400/20 to-red-600/20 rounded-full blur-[140px]"
        transition={{ duration: 16, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 1 }}
      />
      <motion.div
        animate={{ y: [0, -40, 0] }}
        className="absolute bottom-0 right-1/3 w-[26rem] h-[26rem] bg-gradient-to-r from-red-600/30 to-orange-400/20 rounded-full blur-[120px]"
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
        style={{ zIndex: 1 }}
      />

      {/* 🌟 Sections */}
      {[
        {
          id: "board",
          title: "Board of Directors",
          icon: <Briefcase className="text-blue-600 w-8 h-8" />,
          data: board,
        },
        {
          id: "executive",
          title: "Executive Team",
          icon: <Users2 className="text-red-600 w-8 h-8" />,
          data: executives,
        },
      ].map((section, sIdx) => (
        <motion.div
          key={section.id}
          className="space-y-12"
          id={section.id}
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.8, delay: sIdx * 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-3 justify-center">
            {section.icon}
            <h2 className="text-3xl font-semibold text-gray-800 dark:text-white tracking-tight">{section.title}</h2>
          </div>

          <div
            className={`grid gap-10 ${section.id === "advisors" ? "md:grid-cols-2 max-w-4xl mx-auto" : "md:grid-cols-3"}`}
          >
            {section.data.map((person, i) => (
              <motion.div
                key={i}
                className="cursor-pointer group"
                transition={{ type: "spring", stiffness: 120, damping: 10 }}
                whileHover={{ y: -8, scale: 1.03 }}
                onClick={() => router.push(`/our-leadership/${makeSlug(person.name)}`)}
              >
                <Card className="overflow-hidden relative border border-gray-200/60 dark:border-gray-800/70 bg-white/70 dark:bg-gray-900/50 backdrop-blur-2xl shadow-[0_8px_40px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_50px_rgba(0,0,0,0.2)] transition-all duration-700 rounded-3xl">
                  {/* Portrait */}
                  <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-t from-white/5 to-gray-100 dark:from-gray-900 dark:to-gray-800">
                    <Image
                      alt={person.name}
                      className="object-contain w-full h-80 transition-transform duration-[1200ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] group-hover:scale-105"
                      height={500}
                      src={person.img}
                      width={500}
                      priority={false}
                    />
                    <motion.div
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-blue-600/30 via-red-500/20 to-blue-600/30 bg-[length:200%_200%] opacity-0 group-hover:opacity-80 transition-opacity duration-700 mix-blend-overlay"
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-700" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                      <p className="text-white text-sm font-semibold tracking-wider uppercase">View Profile →</p>
                    </div>
                  </div>

                  <CardHeader className="text-center pt-6 pb-8 relative">
                    <div className="inline-block relative">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-800 dark:text-white">{person.name}</h3>
                      <p className="text-blue-600 dark:text-blue-400 font-medium text-sm mt-1">{person.title}</p>
                      <span className="absolute left-0 bottom-0 h-[2px] w-0 bg-gradient-to-r from-blue-600 to-red-600 group-hover:w-full transition-all duration-500 ease-in-out" />
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* 🌍 Values Section */}
      <motion.div
        className="text-center space-y-6 mt-32 max-w-3xl mx-auto"
        id="values"
        initial={{ opacity: 0, y: 60 }}
        transition={{ duration: 0.9 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Globe2 className="w-10 h-10 mx-auto text-blue-600 dark:text-blue-400" />
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white">Our Values</h2>
        <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-lg">
          At the core of our business lies a commitment to integrity, inclusivity, and innovation. We foster a culture where every decision is guided by transparency and accountability, ensuring that our clients and partners feel valued and supported at every step. By embracing diverse perspectives and pioneering solutions, we create meaningful experiences that uplift communities, drive sustainable growth, and strengthen the shared future of everyone we serve.
        </p>
      </motion.div>

      {/* CTA Section */}
      <section className="relative mt-40 mb-20">
        <div
          className="absolute inset-0 bg-cover bg-center rounded-3xl"
          style={{
            backgroundImage: `url('${ctaImage}')`,
            zIndex: 0,
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-br rounded-3xl"
          style={{
            background: "linear-gradient(90deg, rgba(0,59,153,0.9) 0%, rgba(193,39,45,0.84) 100%)",
          }}
        />
        <div className="relative text-center py-24 px-6 text-white space-y-6 z-20">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight drop-shadow-xl">Leadership That Inspires Excellence</h2>
          <p className="text-lg md:text-xl max-w-3xl mx-auto opacity-95">
            Join us on our journey of transformation, service, and unmatched commitment to the families and communities we serve.
          </p>
          <button
            onClick={() => router.push("/contact-us")}
            className="mt-6 px-10 py-4 bg-white text-[#003B99] font-semibold text-lg rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all"
          >
            Get In Touch
          </button>
        </div>
      </section>
    </section>
  );
}
