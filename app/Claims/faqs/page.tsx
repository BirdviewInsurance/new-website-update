"use client";

import { motion } from "framer-motion";
import { Accordion, AccordionItem } from "@heroui/accordion";

export default function FAQsPage() {
  const faqs = [
    {
      q: "How long does claim approval take?",
      a: "On average, most claims are reviewed and settled within 7–14 business days once documents are complete.",
    },
    {
      q: "What if I miss a document?",
      a: "Our team will notify you immediately via email and dashboard notifications so you can upload the missing files securely.",
    },
    {
      q: "Is there a fee to file a claim?",
      a: "No. Filing a claim is free of charge, and all communications are handled directly through our secure system.",
    },
    {
      q: "Can I view all my past claims?",
      a: "Yes, your dashboard includes a complete claims history, downloadable summaries, and status filters for easy tracking.",
    },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black/30" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl font-semibold mb-3">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-gray-200">
            Everything you need to know about claims, policies, and support.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-3xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Accordion
          className="bg-white/60 backdrop-blur-md rounded-2xl border"
          variant="shadow"
        >
          {faqs.map((f, i) => (
            <AccordionItem key={i} aria-label={f.q} title={f.q}>
              <p className="text-default-600">{f.a}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </motion.div>
    </section>
  );
}
