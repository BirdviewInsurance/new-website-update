"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function TermsOfService() {
  return (
    <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 py-20 px-6 md:px-20">
      {/* Hero Section */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="max-w-6xl mx-auto text-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.7 }}
      >
        <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-red-500 dark:from-blue-300 dark:via-blue-400 dark:to-red-400 mb-4">
          Terms of Service
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Welcome to <strong>Birdview Insurance</strong>. These Terms of Service
          outline the legal framework governing your use of our website,
          platforms, and insurance products. Please review them carefully to
          understand your rights and obligations as a valued client.
        </p>
      </motion.div>

      {/* Main Content */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-5xl mx-auto space-y-12"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        {/* Section 1 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300 leading-relaxed">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              1. Acceptance of Terms
            </h2>
            <p>
              By accessing or using any Birdview Insurance website, application,
              or service, you acknowledge that you have read, understood, and
              agree to be bound by these Terms. If you do not agree, you must
              immediately discontinue use of all Birdview platforms and
              services.
            </p>
            <p>
              We may amend these Terms periodically. Updated versions will be
              published on our website and become effective upon posting.
              Continued use after such updates constitutes acceptance of the
              revised Terms.
            </p>
          </CardBody>
        </Card>

        {/* Section 2 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              2. Use of Services
            </h2>
            <p>
              Our digital services are provided solely for lawful purposes.
              Users are required to act responsibly and in good faith. You agree
              to:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Provide accurate, current, and complete information at all
                times.
              </li>
              <li>
                Maintain confidentiality of your account credentials and data.
              </li>
              <li>
                Refrain from reverse-engineering, hacking, or compromising any
                system integrity.
              </li>
              <li>
                Use our services strictly in accordance with applicable laws and
                regulations.
              </li>
            </ul>
            <p>
              We reserve the right to suspend or terminate access if misuse,
              fraud, or violations are detected.
            </p>
          </CardBody>
        </Card>

        {/* Section 3 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              3. Intellectual Property
            </h2>
            <p>
              All content on the Birdview Insurance website — including
              trademarks, service marks, designs, graphics, software, and
              documentation — remains the exclusive property of Birdview
              Insurance Limited or its authorized licensors.
            </p>
            <p>
              You are granted a limited, non-transferable license to access and
              use the content for personal or informational purposes only. Any
              unauthorized copying, distribution, modification, or resale is
              strictly prohibited.
            </p>
            <div className="border-l-4 border-red-500 pl-4 text-sm text-gray-600 dark:text-gray-400">
              Violations of intellectual property rights may result in civil or
              criminal prosecution under applicable laws.
            </div>
          </CardBody>
        </Card>

        {/* Section 4 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              4. Data Protection & Privacy
            </h2>
            <p>
              We are committed to safeguarding your personal data in accordance
              with applicable data protection laws, including the Data
              Protection Act (Kenya) and the EU General Data Protection
              Regulation (GDPR).
            </p>
            <p>
              Please review our{" "}
              <a
                className="text-red-600 dark:text-red-400 font-medium hover:underline"
                href="/privacy-policy"
              >
                Privacy Policy
              </a>{" "}
              to understand how we collect, process, and secure your
              information.
            </p>
          </CardBody>
        </Card>

        {/* Section 5 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              5. Limitation of Liability
            </h2>
            <p>
              Birdview Insurance shall not be liable for any indirect,
              consequential, or incidental losses arising from your access or
              use of our platforms, products, or services — including loss of
              data, revenue, or profits.
            </p>
            <p>
              This limitation applies to the fullest extent permitted by law and
              does not exclude liability for willful misconduct, fraud, or gross
              negligence.
            </p>
          </CardBody>
        </Card>

        {/* Section 6 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              6. Termination of Services
            </h2>
            <p>
              We reserve the right to modify, suspend, or terminate any part of
              our services without prior notice, particularly where security,
              legal, or technical integrity requires such action.
            </p>
            <p>
              Upon termination, your rights to access our platforms cease
              immediately, and all provisions intended to survive termination
              (e.g., intellectual property, disclaimers, and liability limits)
              shall remain in effect.
            </p>
          </CardBody>
        </Card>

        {/* Section 7 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              7. Governing Law & Jurisdiction
            </h2>
            <p>
              These Terms are governed by the laws of the Republic of Kenya. Any
              dispute arising under or in connection with these Terms shall be
              subject to the exclusive jurisdiction of the High Court of Kenya
              or other competent tribunals as applicable.
            </p>
          </CardBody>
        </Card>

        {/* Section 8 */}
        <Card
          className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm"
          shadow="md"
        >
          <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
            <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
              8. Contact Information
            </h2>
            <p>
              For any clarifications regarding these Terms or other legal
              matters, please contact our Legal Affairs Department:
            </p>
            <div className="border-l-4 border-red-500 pl-4 text-sm text-gray-600 dark:text-gray-400">
              <p>
                <strong>Birdview Insurance Limited</strong>
              </p>
              <p>Legal & Compliance Division</p>
              <p>
                <span className="font-medium text-red-600 dark:text-red-400">
                  legal@birdviewinsurance.com
                </span>
              </p>
              <p>Phone: +254 700 888 222</p>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </section>
  );
}
