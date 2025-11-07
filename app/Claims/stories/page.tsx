"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Quote } from "lucide-react";

export default function CustomerStoriesPage() {
  const stories = [
    {
      name: "Jane Mwangi",
      role: "Policyholder, Health Cover",
      story:
        "During my hospital stay in Nairobi, Birdview’s claims team handled everything swiftly and professionally. The reimbursement was processed within five days — it gave me peace of mind when I needed it most.",
    },
    {
      name: "David Otieno",
      role: "Travel Insurance Customer",
      story:
        "When my luggage was lost abroad, Birdview not only covered the cost but also followed up to ensure I was comfortable. That level of care is rare in today’s insurance world.",
    },
    {
      name: "Grace Njeri",
      role: "Corporate Client, SME Plan",
      story:
        "We’ve insured our staff with Birdview for three years. Their claims transparency and real-time updates help us manage benefits effortlessly. It feels like a partnership, not just a policy.",
    },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-600 to-red-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-semibold mb-3">Customer Stories</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Real experiences from people who’ve trusted Birdview with what
            matters most.
          </p>
        </motion.div>
      </div>

      {/* Stories */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((s, i) => (
            <Card
              key={i}
              className="rounded-2xl border border-default-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition p-6"
            >
              <CardBody>
                <Quote className="w-8 h-8 text-primary mb-4" />
                <p className="italic text-default-600 mb-6">“{s.story}”</p>
                <h3 className="font-semibold text-primary">{s.name}</h3>
                <p className="text-sm text-default-500">{s.role}</p>
              </CardBody>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
