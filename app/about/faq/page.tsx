"use client";

import { Accordion, AccordionItem, Card } from "@heroui/react";
import { motion } from "framer-motion";

const faqs = [
  {
    q: "What types of insurance do you offer?",
    a: "We provide comprehensive coverage including Health, Auto, Life, Property, Travel, and Business Insurance. Each plan is customizable to suit individual or corporate needs.",
  },
  {
    q: "How can I get a quote?",
    a: "You can easily request a free online quote through our website, or schedule a call with one of our licensed agents for a personalized consultation.",
  },
  {
    q: "Do you cover businesses?",
    a: "Yes, we offer tailored solutions for businesses of all sizes, including liability, employee health, fleet, and property insurance packages.",
  },
  {
    q: "Are your plans flexible?",
    a: "Absolutely. We provide flexible options and add-ons so that your coverage grows with your needs, ensuring you're always protected.",
  },
  {
    q: "How do I file a claim?",
    a: "You can file a claim directly on our website, through our mobile app, or by contacting our 24/7 customer support team. Claims are processed promptly with full transparency.",
  },
  {
    q: "Do you offer international coverage?",
    a: "Yes. For frequent travelers and expatriates, we provide global coverage options that ensure you’re protected anywhere in the world.",
  },
  {
    q: "Is there a dedicated support team?",
    a: "Yes, we have a 24/7 dedicated support team available via phone, email, and live chat to assist you with inquiries, claims, or policy updates.",
  },
];

export default function FAQs() {
  return (
    <main
      className="
    relative min-h-screen 
    overflow-hidden 
    bg-gradient-to-br from-primary/90 via-primary/70 to-danger/80
    text-white
  "
    >
      {/* 🔹 Luxury Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_50%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(0,0,0,0.25),_transparent_60%)]" />

      {/* 🔹 Subtle Geometric Backdrop */}
      <div className="absolute inset-0 opacity-10 bg-[url('/patterns/diagonal-lines.svg')] bg-repeat" />

      {/* 🔹 Spotlight Glow */}
      <div className="absolute top-1/3 left-1/3 w-[600px] h-[600px] bg-white/10 rounded-full blur-3xl" />

      {/* 🔹 Your existing FAQ content */}
      <Card
        className="relative z-10 w-full bg-primary/95 backdrop-blur-xl text-white py-16 px-6 md:px-12 border border-white/10"
        radius="lg"
        shadow="lg"
      >
        {/* Header + Accordion */}
        {/* Animated Header */}
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-extrabold text-center text-white mb-12"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
        >
          Frequently Asked Questions
        </motion.h2>

        <motion.div
          className="max-w-3xl mx-auto"
          initial="hidden"
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.15 },
            },
          }}
          viewport={{ once: true }}
          whileInView="visible"
        >
          <Accordion
            className="rounded-xl overflow-hidden"
            itemClasses={{
              base: "rounded-xl overflow-hidden group relative",
              trigger: "px-6 py-4 transition-colors",
              content: "px-6 pb-4 text-sm",
            }}
            variant="splitted"
          >
            {faqs.map((faq, idx) => (
              <AccordionItem
                key={idx}
                aria-label={faq.q}
                className={`
        group relative
        [&[data-open='true']]:bg-danger
        [&[data-open='false']]:bg-primary
        transition-all duration-500
      `}
                title={
                  <span
                    className="
            font-bold 
            group-data-[open=false]:text-black 
            group-data-[open=true]:text-white
          "
                  >
                    {faq.q}
                  </span>
                }
              >
                {/* 🔹 Hover Preview Tooltip */}
                <motion.div
                  animate={{ opacity: 0, y: 5 }}
                  className="
          absolute left-1/2 -translate-x-1/2 -top-12
          px-3 py-2 
          bg-black text-white text-xs rounded-lg shadow-lg
          max-w-[250px] sm:max-w-[300px] md:max-w-[400px]
          text-center z-50
          opacity-0 pointer-events-none
          group-hover:opacity-100 group-hover:translate-y-0
          transition-all duration-300
        "
                  initial={{ opacity: 0, y: 5 }}
                  transition={{ duration: 0.3 }}
                  whileInView={{ opacity: 0, y: 5 }}
                >
                  {faq.a.length > 80 ? faq.a.substring(0, 80) + "..." : faq.a}
                </motion.div>

                <motion.p
                  animate={{ opacity: 1, y: 0 }}
                  className="text-white"
                  initial={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.4 }}
                >
                  {faq.a}
                </motion.p>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </Card>
    </main>
  );
}
