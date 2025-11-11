"use client";

import React, { useState, useEffect } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CorporatePictorial() {
  const router = useRouter();
  const [activeEvent, setActiveEvent] = useState<number | null>(null);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const brandPrimary = "#004AAD";
  const brandAccent = "#E63946";
  const brandGold = "#F4B400";

  const title = "Securing Dreams, Protecting Generations.";
  const subtitle =
    "We safeguard what matters most — your family, your legacy, and your peace of mind. Discover how our protection empowers confidence for a lifetime.";

  // Portfolio items with dedicated galleries
  const portfolioItems = [
    {
      title: "TukTuk Welfare Launch In Mombasa",
      desc: "Birdview Insurance was proud to launch the TukTuk Welfare program in Mombasa, empowering drivers with comprehensive insurance coverage and financial security.",
      color: brandPrimary,
      gallery: ["/images/Launch/tuktuk1.jpg", "/images/Launch/tuktuk2.jpg", "/images/Launch/tuktuk3.jpg","/images/Launch/tuktuk4.jpg", "/images/Launch/tuktuk5.jpg", "/images/Launch/tuktuk.jpg", ],
    },
    {
      title: "France Dijon BBQ Party",
      desc: "Birdview Insurance hosted a delightful BBQ party in Dijon, France, bringing together clients and partners for an evening of networking and celebration.",
      color: brandAccent,
      gallery: ["/images/barbecue/dijon.jpeg", "/images/barbecue/dijon1.jpeg", "/images/barbecue/dijon2.jpeg", "/images/barbecue/dijon3.jpeg"],
    },
    {
      title: "Britwell UK Football Tournament 2025",
      desc: "Birdview Insurance is excited to sponsor the Britwell UK Football Tournament 2025, promoting community engagement and sportsmanship through this thrilling event.",
      color: brandPrimary,
      gallery: ["/images/London/london1.jpeg", "/images/London/london2.jpeg", "/images/London/london3.jpeg", "/images/London/london4.jpeg","/images/London/london5.jpeg", "/images/London/london6.jpeg",
                "/images/London/london7.jpeg", "/images/London/london8.jpeg", "/images/London/london9.jpeg", "/images/London/london10.jpeg", "/images/London/london11.jpeg", "/images/London/london12.jpeg"],
    },
    {
      title: "South London Annual BBQ Party 2025",
      desc: "Birdview was proud to be part of the South London Annual BBQ Party 2025, fostering community spirit and celebrating with our valued clients and partners.",
      color: brandAccent,
      gallery: ["/images/barbecue/barbecue1.jpeg", "/images/barbecue/barbecue2.jpeg", "/images/barbecue/barbecue3.jpeg", "/images/barbecue/barbecue4.jpeg", "/images/barbecue/barbecue5.jpeg", "/images/barbecue/barbecue6.jpeg", "/images/barbecue/barbecue7.jpeg",],
    },
    {
      title: "Hosted National TukTuk Operators",
      desc: "Birdview Insurance successfully hosted a gathering of national TukTuk operators including the national TukTuk Chairman, discussing industry trends and enhancing collaboration for better service delivery.",
      color: brandPrimary,
      gallery: ["/images/tuktuk/tuktuk1.jpeg", "/images/tuktuk/tuktuk2.jpeg", "/images/tuktuk/tuktuk3.jpeg","/images/tuktuk/tuktuk4.jpeg", "/images/tuktuk/tuktuk5.jpeg", "/images/tuktuk/tuktuk6.jpeg",
                "/images/tuktuk/tuktuk7.jpeg", "/images/tuktuk/tuktuk8.jpeg", "/images/tuktuk/tuktuk9.jpeg", "/images/tuktuk/tuktuk10.jpeg", "/images/tuktuk/tuktuk11.jpeg", "/images/tuktuk/tuktuk12.jpeg",],
    },
  ];

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (activeEvent === null || selectedImage === null) return;

      const galleryLength = portfolioItems[activeEvent].gallery.length;

      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft")
        setSelectedImage((prev) => (prev! - 1 + galleryLength) % galleryLength);
      if (e.key === "ArrowRight")
        setSelectedImage((prev) => (prev! + 1) % galleryLength);
    };

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [activeEvent, selectedImage, portfolioItems]);

  return (
    <main className="relative w-screen min-h-screen overflow-hidden bg-white dark:bg-black text-gray-900 dark:text-gray-100 transition-colors duration-700">
      {/* === HERO SECTION === */}
      <section className="relative h-[85vh] w-full overflow-hidden">
        <div className="absolute inset-0">
          <motion.img
            alt="pictorial-bg"
            animate={{ scale: 1 }}
            className="w-full h-full object-cover"
            initial={{ scale: 1.1 }}
            src="/Events/SLVA8339.jpg"
            transition={{ duration: 3 }}
          />
        </div>

        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/70 to-black/90" />

        <div className="absolute inset-0 flex flex-col justify-center items-start px-8 sm:px-16 lg:px-32 space-y-6">
          <motion.h1
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold leading-tight tracking-tight"
            initial={{ y: 40, opacity: 0 }}
            style={{
              backgroundImage: `linear-gradient(90deg, ${brandPrimary}, ${brandAccent}, ${brandGold})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
            transition={{ duration: 1 }}
          >
            {title}
          </motion.h1>

          <motion.p
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl text-lg sm:text-xl text-gray-200 dark:text-gray-300 leading-relaxed"
            initial={{ y: 30, opacity: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
          >
            {subtitle}
          </motion.p>

          <motion.div
            animate={{ opacity: 1 }}
            className="flex gap-4 mt-4"
            initial={{ opacity: 0 }}
            transition={{ delay: 0.8 }}
          >
            <Button
              className="px-8 py-3 text-white font-semibold rounded-full shadow-xl hover:scale-105 transition-transform duration-300"
              style={{
                background: `linear-gradient(135deg, ${brandPrimary}, ${brandAccent})`,
              }}
              onClick={() => router.push("/contact")}
            >
              Get a Quote
            </Button>
            <Button
              className="px-8 py-3 font-semibold rounded-full border border-white/70 text-primary hover:bg-white/10 hover:scale-105 transition-all"
              onClick={() => router.push("/about")}
            >
              Learn More
            </Button>
          </motion.div>
        </div>

        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="absolute bottom-10 right-10 bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl px-6 py-3 text-sm text-gray-100 shadow-xl"
          initial={{ opacity: 0, y: 40 }}
          transition={{ delay: 1.2 }}
        >
          <p>
            Trusted by <span className="font-bold text-white">500,000+</span>{" "}
            families across Africa
          </p>
        </motion.div>
      </section>

      {/* === PEOPLE & PURPOSE === */}
      <section className="py-24 px-6 sm:px-12 lg:px-28 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-black">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2
              className="text-4xl lg:text-5xl font-bold mb-6"
              style={{
                background: `linear-gradient(90deg, ${brandPrimary}, ${brandAccent})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              People & Purpose
            </h2>
            <p className="text-lg leading-relaxed text-gray-700 dark:text-gray-300">
              Every face tells a story of resilience and care. Our commitment
              goes beyond policies — we build legacies, protect livelihoods, and
              empower futures with compassion and reliability.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {portfolioItems.slice(0, 4).map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.04 }}
              >
                <img
                  alt={`people-${idx}`}
                  className="w-full h-48 sm:h-56 object-cover"
                  src={item.gallery[0]}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === SERVICES / PRODUCTS === */}
      <section className="py-28 px-6 sm:px-12 lg:px-28 bg-gradient-to-b from-white to-gray-100 dark:from-gray-950 dark:to-gray-900">
        <div className="max-w-7xl mx-auto text-center space-y-16">
          <h3
            className="text-3xl sm:text-4xl lg:text-5xl font-bold"
            style={{
              background: `linear-gradient(90deg, ${brandPrimary}, ${brandAccent})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Our Protection Portfolio
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
            {portfolioItems.map((item, idx) => (
              <motion.div
                key={idx}
                className="rounded-2xl p-8 bg-white/90 dark:bg-gray-800/60 backdrop-blur-xl border border-gray-200 dark:border-gray-700 transition-all duration-300"
                whileHover={{
                  scale: 1.05,
                  boxShadow: `0 0 25px ${item.color}33`,
                }}
              >
                <h4
                  className="text-xl sm:text-2xl font-semibold mb-3"
                  style={{
                    background: `linear-gradient(90deg, ${brandPrimary}, ${item.color})`,
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  {item.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
                  {item.desc}
                </p>
                <Button
                  className="mt-6 px-5 py-2 text-sm font-semibold hover:scale-105 transition-all"
                  style={{
                    color: item.color,
                  }}
                  variant="ghost"
                  onClick={() => {
                    setActiveEvent(idx);
                    setSelectedImage(null);
                  }}
                >
                  Explore More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === MODAL GALLERY === */}
      <AnimatePresence>
        {activeEvent !== null && (
          <motion.div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveEvent(null)}
          >
            <motion.div
              className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                {portfolioItems[activeEvent].title} Gallery
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {portfolioItems[activeEvent].gallery.map((src, i) => (
                  <motion.div
                    key={i}
                    className="overflow-hidden rounded-xl shadow-md cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    onClick={() => setSelectedImage(i)}
                  >
                    <Image
                      alt={`Gallery ${i + 1}`}
                      className="object-cover w-full h-40"
                      height={400}
                      width={400}
                      src={src}
                    />
                  </motion.div>
                ))}
              </div>

              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-2xl"
                onClick={() => setActiveEvent(null)}
              >
                ✕
              </button>
            </motion.div>

            {/* LIGHTBOX */}
            <AnimatePresence>
              {selectedImage !== null && (
                <motion.div
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <button
                    className="absolute top-6 right-6 text-white text-3xl hover:text-red-400"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>

                  <button
                    className="absolute left-6 text-white text-4xl hover:text-gray-400"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        (prev! - 1 + portfolioItems[activeEvent].gallery.length) %
                        portfolioItems[activeEvent].gallery.length
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-6 text-white text-4xl hover:text-gray-400"
                    onClick={() =>
                      setSelectedImage((prev) =>
                        (prev! + 1) % portfolioItems[activeEvent].gallery.length
                      )
                    }
                  >
                    ›
                  </button>

                  <motion.div
                    key={selectedImage}
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      alt={`Large view ${selectedImage! + 1}`}
                      className="rounded-2xl max-h-[80vh] object-contain"
                      height={700}
                      width={1000}
                      src={portfolioItems[activeEvent].gallery[selectedImage!]}
                    />
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
