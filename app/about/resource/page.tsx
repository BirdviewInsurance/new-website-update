"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Card, CardHeader, CardBody } from "@heroui/react";
import { BookOpen, Newspaper, HelpCircle, Grid, X } from "lucide-react";

export default function ResourcesSection() {
  const [open, setOpen] = useState(false);

  const resources = [
    {
      title: "Blog",
      href: "/blog",
      icon: <BookOpen className="w-6 h-6 text-primary" />,
      desc: "Insights, guides, and updates to empower your journey.",
    },
    {
      title: "Newsroom",
      href: "/newsroom",
      icon: <Newspaper className="w-6 h-6 text-danger" />,
      desc: "Latest company news, announcements, and press releases.",
    },
    {
      title: "FAQs",
      href: "/faqs",
      icon: <HelpCircle className="w-6 h-6 text-primary" />,
      desc: "Answers to the most common questions in one place.",
    },
  ];

  return (
    <>
      {/* ---- Main Resources Section ---- */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-danger/70 to-black/90">
          <img
            alt="Resources background"
            className="w-full h-full object-cover opacity-20"
            src="/images/resources-bg.jpg"
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-4xl lg:text-5xl font-bold text-white drop-shadow-lg">
              Explore Our Resources
            </h2>
            <p className="mt-4 text-lg text-white/80 max-w-2xl mx-auto">
              Knowledge, updates, and answers — everything you need in one
              premium hub.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {resources.map((res, i) => (
              <motion.div
                key={res.title}
                initial={{ opacity: 0, y: 40 }}
                transition={{ duration: 0.5, delay: i * 0.2 }}
                viewport={{ once: true }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                <Card className="group relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl hover:scale-[1.02] transition-all duration-300">
                  <CardHeader className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm shadow-md">
                      {res.icon}
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {res.title}
                    </h3>
                  </CardHeader>
                  <CardBody className="text-white/80">
                    <p className="mb-4">{res.desc}</p>
                    <Link
                      className="text-primary font-semibold hover:underline"
                      href={res.href}
                    >
                      Learn More →
                    </Link>
                  </CardBody>
                  <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-primary/50 transition-all" />
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ---- Floating Quick-Link Button ---- */}
      <motion.button
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-xl text-white bg-gradient-to-r from-primary to-danger"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(true)}
      >
        <Grid className="w-6 h-6" />
      </motion.button>

      {/* ---- Slide-in Panel ---- */}
      <AnimatePresence>
        {open && (
          <>
            {/* Background overlay */}
            <motion.div
              animate={{ opacity: 0.6 }}
              className="fixed inset-0 bg-black z-40"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              animate={{ x: 0 }}
              className="fixed right-0 top-0 h-full w-80 bg-white/10 backdrop-blur-xl border-l border-white/20 z-50 shadow-2xl p-6 flex flex-col"
              exit={{ x: "100%" }}
              initial={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.4 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-white">Resources</h3>
                <button
                  className="p-2 rounded-full bg-white/20 hover:bg-white/30 transition"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-5 h-5 text-white" />
                </button>
              </div>

              <div className="space-y-4">
                {resources.map((res) => (
                  <Link
                    key={res.title}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/10 hover:bg-white/20 transition text-white"
                    href={res.href}
                    onClick={() => setOpen(false)}
                  >
                    {res.icon}
                    <div>
                      <p className="font-semibold">{res.title}</p>
                      <p className="text-sm text-white/70">{res.desc}</p>
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
