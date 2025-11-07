"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Divider } from "@heroui/divider";
import { Button } from "@heroui/button";

export default function ClaimsProcessPage() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-semibold mb-3">Our Claims Process</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Transparent. Simple. Hassle-free. Your peace of mind, guaranteed.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
      >
        <h2 className="text-3xl font-semibold mb-6 text-primary">
          How It Works
        </h2>
        <p className="text-default-600 mb-10 max-w-3xl">
          We believe making a claim should be as straightforward as possible.
          Our process is designed around speed, clarity, and constant
          communication — so you know exactly what’s happening every step of the
          way.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              step: "1",
              title: "Notify Us",
              desc: "Contact us within 24 hours of an incident via your portal or our hotline. We’ll register your claim and guide you through what’s needed.",
            },
            {
              step: "2",
              title: "Submit Evidence",
              desc: "Upload required documents securely — such as receipts, reports, or identification. Your dedicated claims officer will review promptly.",
            },
            {
              step: "3",
              title: "Assessment & Settlement",
              desc: "Our team verifies your claim, updates you in real-time, and releases payment directly to your account once approved.",
            },
          ].map((s, i) => (
            <Card
              key={i}
              className="rounded-2xl border border-default-200 bg-white/70 backdrop-blur-sm"
              shadow="sm"
            >
              <CardBody>
                <div className="text-6xl font-bold text-primary/20 mb-4">
                  {s.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-primary">
                  {s.title}
                </h3>
                <p className="text-default-600 leading-relaxed">{s.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        <Divider className="my-14" />
        <div className="text-center">
          <Button className="rounded-xl" color="primary" size="lg">
            Start a Claim
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
