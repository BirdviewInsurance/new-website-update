"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

export default function ESGPage() {
  return (
    <main className="min-h-screen flex flex-col w-full overflow-hidden bg-white text-gray-800">
      {/* 🌍 HERO SECTION */}
      <section
        className="relative w-full min-h-[90vh] flex flex-col justify-center items-center text-center px-6"
        style={{
          backgroundImage: "url('/images/esg-bg.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Brand Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-white/80 to-danger/70 mix-blend-overlay z-0" />

        {/* Hero Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="relative z-10 max-w-4xl mx-auto flex flex-col items-center justify-center gap-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
            Empowering a Sustainable Future
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl">
            Birdview Insurance is driving positive change through responsible
            Environmental, Social, and Governance (ESG) practices that protect
            people, strengthen communities, and preserve the planet.
          </p>

          <Link
            href="#impact"
            className="mt-6 px-8 py-4 rounded-full bg-gradient-to-r from-primary to-danger hover:from-danger hover:to-primary text-white font-semibold shadow-md transition-all duration-500 hover:scale-105"
          >
            Explore Our Impact
          </Link>
        </motion.div>
      </section>

      {/* 🌱 ESG OVERVIEW */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-white via-primary/5 to-danger/5">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-6 text-gray-900"
          >
            Our ESG Philosophy
          </motion.h2>
          <p className="text-gray-700 max-w-3xl mx-auto text-lg">
            Sustainability is not just a responsibility—it’s our legacy. Birdview
            integrates ESG values into every policy, decision, and community
            initiative we undertake, ensuring long-term value for our clients,
            partners, and society.
          </p>
        </div>

        {/* Three ESG Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mt-16 max-w-7xl mx-auto">
          {[
            {
              icon: "🌿",
              title: "Environmental Stewardship",
              desc: "We reduce carbon impact through paperless systems, digital-first policies, and eco-partnerships.",
            },
            {
              icon: "🤝",
              title: "Social Empowerment",
              desc: "We support communities by providing accessible insurance and empowering small businesses across Africa.",
            },
            {
              icon: "🏛️",
              title: "Governance & Integrity",
              desc: "We adhere to transparent operations, ethical leadership, and accountability at every organizational level.",
            },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              viewport={{ once: true }}
              className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-10 text-center shadow-md hover:scale-105 hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{item.icon}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-700">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 💡 ESG IMPACT SECTION */}
      <section
        id="impact"
        className="relative py-24 px-6 md:px-12 overflow-hidden"
        style={{
          backgroundImage: "url('/images/stats.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay with subtle blur for cinematic contrast */}
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm -z-10" />

        <div className="max-w-6xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold mb-12 text-danger drop-shadow-lg"
          >
            ESG in Action
          </motion.h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {[
              { value: "98%", label: "Paperless Operations", color: "text-white" },
              { value: "12,000+", label: "Families Empowered", color: "text-danger" },
              { value: "35+", label: "Community Projects", color: "text-white" },
              { value: "100%", label: "Ethical Compliance", color: "text-gray-300" },
            ].map((stat, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-xl 
                            hover:shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:scale-105 transition-all duration-500"
              >
                <h3
                  className={`text-4xl md:text-5xl font-extrabold ${stat.color} drop-shadow-sm`}
                >
                  {stat.value}
                </h3>
                <p className="text-gray-300 mt-2 text-lg font-medium">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 🌐 ESG PARTNERS */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-br from-primary/5 via-white to-danger/5">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-extrabold mb-6 text-gray-900">
            Global Partners in Progress
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto mb-16">
            Collaboration powers impact. We work with trusted organizations and
            sustainability leaders to advance ethical insurance, social equality,
            and environmental resilience.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 justify-items-center">
            {["liason", "covara", "imana", "aibk"].map((partner, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="bg-white/80 backdrop-blur-lg p-6 rounded-xl border border-gray-200 hover:scale-105 shadow-md hover:shadow-lg transition-all"
              >
                <Image
                  src={`/partners/${partner}.png`}
                  alt={partner}
                  width={150}
                  height={60}
                  className="object-contain opacity-80 hover:opacity-100 transition-all"
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ✳️ CTA */}
      <section className="relative py-24 text-center text-white bg-gradient-to-r from-primary to-danger"
        style={{
          backgroundImage: "url('/images/esg-cta.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}>
        <div className="relative z-10 max-w-4xl mx-auto px-6">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Together, We’re Building a Legacy of Trust
          </h2>
          <p className="text-lg text-white/90 mb-10">
            Join Birdview in shaping a responsible, inclusive, and sustainable
            future for generations to come.
          </p>
          <Link
            href="/contact-us"
            className="px-10 py-4 bg-white text-primary font-semibold rounded-full shadow-lg hover:shadow-2xl hover:bg-gray-100 transition-all duration-500 hover:scale-105"
          >
            Partner with Us
          </Link>
        </div>
      </section>
    </main >
  );
}
