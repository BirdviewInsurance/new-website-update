"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function PolicyInfoPage() {
  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-semibold mb-3">Policy Information</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Understand your protection, your benefits, and your
            responsibilities.
          </p>
        </motion.div>
      </div>

      {/* Content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="rounded-2xl border border-default-200 bg-white/70 backdrop-blur-sm shadow-sm p-8">
          <CardBody>
            <h2 className="text-3xl font-semibold text-primary mb-6">
              Your Coverage at a Glance
            </h2>
            <p className="text-default-600 leading-relaxed mb-8">
              Birdview policies are built to safeguard you and your loved ones
              when life’s unexpected events occur. We ensure clarity, fairness,
              and accessibility in every clause and process.
            </p>

            <ul className="list-disc pl-6 space-y-3 text-default-600 mb-8">
              <li>Comprehensive medical, travel, and life coverage</li>
              <li>Flexible premium payment schedules</li>
              <li>24/7 access to online claims management</li>
              <li>No hidden fees or exclusions</li>
            </ul>

            <h3 className="text-2xl font-semibold text-primary mb-3">
              Key Terms
            </h3>
            <p className="text-default-600 mb-6">
              Please review your policy schedule and terms booklet to confirm
              your individual benefits, deductibles, and limits. Each policy
              type carries unique benefits aligned to your chosen plan tier.
            </p>

            <p className="text-default-600">
              For detailed questions, reach out to our policy advisory team at{" "}
              <a
                className="text-primary font-medium underline"
                href="mailto:support@birdviewmicroinsurance.com"
              >
                Policy@birdviewmicroinsurance.com
              </a>
              .
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
}
