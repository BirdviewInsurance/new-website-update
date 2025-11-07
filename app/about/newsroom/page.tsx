"use client";

import { Card } from "@heroui/react";
import { motion } from "framer-motion";

const news = [
  {
    title: "Birdview Wins Insurance Innovation Award",
    summary:
      "Recognized for delivering accessible microinsurance solutions across East Africa.",
    date: "Sep 15, 2025",
  },
  {
    title: "Partnership with Global Reinsurer Announced",
    summary:
      "Birdview teams up with a leading reinsurer to strengthen customer confidence and scale coverage.",
    date: "Aug 30, 2025",
  },
];

export default function Newsroom() {
  return (
    <main className="min-h-screen bg-gradient-to-tr from-danger/20 via-white/10 to-primary/20 px-6 py-20">
      <h1 className="text-5xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-danger to-primary mb-12">
        Newsroom
      </h1>

      <div className="space-y-6 max-w-4xl mx-auto">
        {news.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white/10 backdrop-blur-xl border border-white/20 shadow-xl rounded-2xl p-6 hover:shadow-2xl transition">
              <h2 className="text-2xl font-semibold text-primary">
                {item.title}
              </h2>
              <p className="text-gray-100 mt-2">{item.summary}</p>
              <p className="text-sm text-gray-400 mt-3">{item.date}</p>
            </Card>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
