"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { ShieldCheck, Lock, FileText, UserCheck } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-6 md:px-20">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
      >
        {/* Header */}
        <div className="text-center mb-14">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-bold text-blue-700 dark:text-blue-400"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Privacy Policy
          </motion.h1>
          <p className="text-gray-600 dark:text-gray-400 mt-3 max-w-2xl mx-auto">
            Your privacy is our responsibility. At{" "}
            <strong>Birdview Insurance</strong>, we protect your data with the
            same dedication that we protect your future.
          </p>
        </div>

        {/* Policy Card */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md"
          shadow="lg"
        >
          <CardBody className="space-y-10 text-gray-700 dark:text-gray-300 leading-relaxed">
            {/* Section 1 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                <ShieldCheck className="w-6 h-6 text-red-500" />
                1. Information We Collect
              </h2>
              <p className="mt-2">
                We collect personal information that you provide directly, such
                as your full name, contact details, identification documents,
                and communication records. In addition, we may automatically
                collect technical data such as IP addresses, browser types,
                cookies, and device identifiers to enhance your user experience.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Personal details and account information</li>
                <li>Payment and transaction history</li>
                <li>Communication and service interaction logs</li>
                <li>Technical data for performance optimization</li>
              </ul>
            </motion.div>

            {/* Section 2 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                <FileText className="w-6 h-6 text-red-500" />
                2. How We Use Your Data
              </h2>
              <p className="mt-2">
                Your data enables us to serve you better. We use it for policy
                management, service delivery, security improvements, and
                compliance with legal obligations.
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>To administer insurance policies and claims efficiently</li>
                <li>To improve user experience and personalize content</li>
                <li>
                  To send important updates, invoices, or policy information
                </li>
                <li>To detect, prevent, and mitigate fraudulent activities</li>
              </ul>
            </motion.div>

            {/* Section 3 */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                <Lock className="w-6 h-6 text-red-500" />
                3. Data Security & Retention
              </h2>
              <p className="mt-2">
                We employ industry-grade security measures — including
                encryption, firewalls, and secure cloud environments — to
                protect your data. Personal information is retained only for as
                long as necessary to fulfill operational or legal purposes,
                after which it is securely deleted or anonymized.
              </p>
              <p className="mt-3">
                Regular security audits and third-party assessments ensure
                compliance with both <strong>GDPR</strong> and the{" "}
                <strong>Data Protection Act</strong>.
              </p>
            </motion.div>

            {/* Section 4 */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, x: 0 }}
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold text-blue-700 dark:text-blue-400">
                <UserCheck className="w-6 h-6 text-red-500" />
                4. Your Rights
              </h2>
              <p className="mt-2">
                You have complete control over your data. Depending on your
                jurisdiction, you may have the right to:
              </p>
              <ul className="list-disc pl-6 mt-3 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate or incomplete data</li>
                <li>Withdraw consent and request deletion</li>
                <li>Restrict or object to specific processing activities</li>
                <li>Request data portability to another provider</li>
              </ul>
              <p className="mt-3">
                To exercise your rights, please email our Data Protection
                Officer at:
                <br />
                <span className="font-medium text-red-600 dark:text-red-400">
                  privacy@birdviewinsurance.com
                </span>
              </p>
            </motion.div>

            {/* Section 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mt-8">
                5. International Data Transfers
              </h2>
              <p className="mt-2">
                In cases where your data is transferred outside your country of
                residence, we ensure such transfers comply with recognized legal
                safeguards, including standard contractual clauses or adequacy
                decisions under international data protection frameworks.
              </p>
            </motion.div>

            {/* Section 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.5 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mt-8">
                6. Updates to This Policy
              </h2>
              <p className="mt-2">
                We may periodically update this policy to reflect technological
                advancements, regulatory changes, or company initiatives. The
                latest version will always be available on our official website.
              </p>
            </motion.div>

            {/* Contact Section */}
            <div className="pt-10 border-t border-gray-200 dark:border-gray-800 text-center">
              <p className="text-gray-600 dark:text-gray-400">
                For privacy inquiries or data access requests:
              </p>
              <p className="font-medium text-red-600 dark:text-red-400 text-lg mt-1">
                privacy@birdviewinsurance.com
              </p>
              <p className="text-sm text-gray-500 mt-2">
                © {new Date().getFullYear()} Birdview Insurance. All Rights
                Reserved.
              </p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
}
