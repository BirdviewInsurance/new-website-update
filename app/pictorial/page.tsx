"use client";

import React, { useState } from "react";
import { Button } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function CorporatePictorial() {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const brandPrimary = "#004AAD";
  const brandAccent = "#E63946";
  const brandGold = "#F4B400";

  const title = "Securing Dreams, Protecting Generations.";
  const subtitle =
    "We safeguard what matters most — your family, your legacy, and your peace of mind. Discover how our protection empowers confidence for a lifetime.";

  const galleryImages = [
    "https://images.unsplash.com/photo-1610484826967-09c5720778b4?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1605902711622-cfb43c4437b5?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1522204506589-42b47e2e7122?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=1600&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1581091870637-3d8f2f8d9fce?w=1600&q=80&auto=format&fit=crop",
  ];

  React.useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (selectedImage === null) return;

      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowLeft")
        setSelectedImage(
          (prev) => (prev! - 1 + galleryImages.length) % galleryImages.length,
        );
      if (e.key === "ArrowRight")
        setSelectedImage((prev) => (prev! + 1) % galleryImages.length);
    };

    window.addEventListener("keydown", handleKey);

    return () => window.removeEventListener("keydown", handleKey);
  }, [selectedImage]);

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
            src="/images/pictorial-bg.png"
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
            {galleryImages.slice(1, 5).map((src, idx) => (
              <motion.div
                key={idx}
                className="rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
                whileHover={{ scale: 1.04 }}
              >
                <img
                  alt={`people-${idx}`}
                  className="w-full h-48 sm:h-56 object-cover"
                  src={src}
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
            {[
              {
                title: "TukTuk Welfare Launch In Mombasa",
                desc: "Birdview Insurance was proud to launch the TukTuk Welfare program in Mombasa, empowering drivers with comprehensive insurance coverage and financial security.",
                color: brandPrimary,
              },
              {
                title: "France Dijon BBQ Party",
                desc: "Birdview Insurance hosted a delightful BBQ party in Dijon, France, bringing together clients and partners for an evening of networking and celebration.",
                color: brandAccent,
              },
              {
                title: "Britwell UK Footbal Tournament 2025",
                desc: "Birdview Insurance is excited to sponsor the Britwell UK Football Tournament 2025, promoting community engagement and sportsmanship through this thrilling event.",
                color: brandPrimary,
              },
              {
                title: "South London Annual BBQ Party 2025",
                desc: "Birdvie was proud to be part of the South London Annual BBQ Party 2025, fostering community spirit and celebrating with our valued clients and partners.",
                color: brandAccent,
              },
              {
                title: "Hosted National TukuTuk Operators.",
                desc: "Birdview Insurance successfully hosted a gathering of national TukTuk operators including the national TukTuk Chairman, discussing industry trends and enhancing collaboration for better service delivery.",
                color: brandPrimary,
              },
            ].map((item, idx) => (
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
                  onClick={() => setIsModalOpen(true)} // 👈 open gallery modal
                >
                  Explore More
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* === MODAL GALLERY (Enhanced with Lightbox) === */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
            exit={{ opacity: 0 }}
            initial={{ opacity: 0 }}
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              animate={{ scale: 1, opacity: 1 }}
              className="relative bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
              exit={{ scale: 0.9, opacity: 0 }}
              initial={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-gray-100">
                Explore Our Portfolio
              </h3>

              {/* GALLERY GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {galleryImages.map((src, i) => (
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
                      src={src}
                      width={400}
                    />
                  </motion.div>
                ))}
              </div>

              {/* CLOSE BUTTON */}
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 dark:hover:text-gray-300 text-2xl"
                onClick={() => setIsModalOpen(false)}
              >
                ✕
              </button>
            </motion.div>

            {/* LIGHTBOX VIEWER */}
            <AnimatePresence>
              {selectedImage !== null && (
                <motion.div
                  animate={{ opacity: 1 }}
                  className="fixed inset-0 bg-black/90 flex items-center justify-center z-[60]"
                  exit={{ opacity: 0 }}
                  initial={{ opacity: 0 }}
                >
                  {/* Close button */}
                  <button
                    className="absolute top-6 right-6 text-white text-3xl hover:text-red-400"
                    onClick={() => setSelectedImage(null)}
                  >
                    ✕
                  </button>

                  {/* Prev / Next buttons */}
                  <button
                    className="absolute left-6 text-white text-4xl hover:text-gray-400"
                    onClick={() =>
                      setSelectedImage(
                        (prev) =>
                          (prev! - 1 + galleryImages.length) %
                          galleryImages.length,
                      )
                    }
                  >
                    ‹
                  </button>
                  <button
                    className="absolute right-6 text-white text-4xl hover:text-gray-400"
                    onClick={() =>
                      setSelectedImage(
                        (prev) => (prev! + 1) % galleryImages.length,
                      )
                    }
                  >
                    ›
                  </button>

                  {/* Image */}
                  <motion.div
                    key={selectedImage}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    initial={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Image
                      alt={`Large view ${selectedImage + 1}`}
                      className="rounded-2xl max-h-[80vh] object-contain"
                      height={700}
                      src={galleryImages[selectedImage]}
                      width={1000}
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
