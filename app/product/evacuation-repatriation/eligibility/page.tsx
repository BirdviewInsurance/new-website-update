"use client";

import { Card, CardBody } from "@heroui/react";
import { motion } from "framer-motion";

export default function EligibilityPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-2xl w-full"
      >
        <Card className="shadow-xl backdrop-blur-lg bg-white/70 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700">
          <CardBody className="text-center py-16">
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-cyan-400 bg-clip-text text-transparent mb-4">
              Eligibility & Requirements
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              We’re preparing the full eligibility and requirement details for this plan.
              Please check back soon for updates.
            </p>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
}
