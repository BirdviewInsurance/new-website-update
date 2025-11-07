"use client";

import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader } from "@heroui/react";
import { motion } from "framer-motion";
import {
  ShieldCheckIcon,
  ScaleIcon,
  DocumentDuplicateIcon,
  UserGroupIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function TermsOfService() {
  const [progress, setProgress] = useState(0);

  // Track scroll progress
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (scrollTop / docHeight) * 100;

      setProgress(scrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    {
      id: "introduction",
      title: "Introduction",
      icon: <DocumentDuplicateIcon className="w-6 h-6 text-primary" />,
    },
    {
      id: "use",
      title: "Use of Services",
      icon: <ShieldCheckIcon className="w-6 h-6 text-danger" />,
    },
    {
      id: "privacy",
      title: "Privacy & Data",
      icon: <UserGroupIcon className="w-6 h-6 text-primary" />,
    },
    {
      id: "liability",
      title: "Liability & Disclaimers",
      icon: <ScaleIcon className="w-6 h-6 text-danger" />,
    },
    {
      id: "termination",
      title: "Termination",
      icon: <ExclamationTriangleIcon className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <main className="relative min-h-screen bg-gradient-to-br from-primary/20 via-white/10 to-danger/20 px-6 py-16 flex">
      {/* Progress Bar */}
      <div
        className="fixed top-0 left-0 h-1 bg-gradient-to-r from-primary to-danger z-50"
        style={{ width: `${progress}%` }}
      />

      {/* Sidebar TOC */}
      <aside className="hidden lg:block w-64 pr-10 sticky top-24 h-fit">
        <nav className="space-y-4">
          {sections.map((section) => (
            <a
              key={section.id}
              className="flex items-center space-x-2 text-gray-700 hover:text-primary transition"
              href={`#${section.id}`}
            >
              {section.icon}
              <span>{section.title}</span>
            </a>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1">
        <Card className="max-w-5xl mx-auto bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl p-10 relative overflow-hidden">
          <CardHeader className="text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-primary to-danger pb-8">
            Terms of Service
          </CardHeader>
          <CardBody className="text-gray-800 text-lg space-y-16">
            {/* Introduction */}
            <motion.section
              id="introduction"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <DocumentDuplicateIcon className="w-7 h-7 mr-2 text-primary" />
                Introduction
              </h2>
              <p>
                Welcome to Birdview Microinsurance. These Terms of Service
                (“Terms”) govern your access to and use of our websites,
                applications, and services (collectively, the “Services”).
              </p>
              <p>
                By using our Services, you confirm that you have read,
                understood, and agree to be bound by these Terms. If you do not
                agree, you must not use our Services.
              </p>
              <p>
                We encourage you to read these Terms carefully, as they outline
                your rights, obligations, and important limitations that may
                affect you.
              </p>
            </motion.section>

            {/* Use of Services */}
            <motion.section
              id="use"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <ShieldCheckIcon className="w-7 h-7 mr-2 text-danger" />
                Use of Services
              </h2>
              <ul className="list-disc list-inside space-y-2">
                <li>
                  You agree to use our Services only for lawful purposes, in
                  compliance with all applicable laws and regulations.
                </li>
                <li>
                  You must not misuse the Services, including attempting to gain
                  unauthorized access, disrupting functionality, or engaging in
                  fraudulent or harmful activities.
                </li>
                <li>
                  All intellectual property (including logos, trademarks,
                  designs, and content) remains the exclusive property of
                  Birdview Microinsurance and may not be copied, reproduced, or
                  exploited without prior written consent.
                </li>
                <li>
                  We reserve the right to restrict or suspend your access if we
                  reasonably believe you are in breach of these Terms.
                </li>
              </ul>
            </motion.section>

            {/* Privacy */}
            <motion.section
              id="privacy"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <UserGroupIcon className="w-7 h-7 mr-2 text-primary" />
                Privacy & Data
              </h2>
              <p>
                Protecting your privacy is a core priority. Our{" "}
                <a className="text-primary underline" href="/privacy-policy">
                  Privacy Policy
                </a>{" "}
                explains how we collect, use, store, and safeguard your
                information.
              </p>
              <p>
                By using our Services, you consent to the collection and
                processing of your data in accordance with applicable data
                protection laws (including GDPR, where relevant).
              </p>
              <p>We may process your data for purposes such as:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Providing insurance cover and related services</li>
                <li>Improving our Services and customer support</li>
                <li>Meeting legal, regulatory, and compliance obligations</li>
              </ul>
              <p>
                You have rights relating to your personal data, including
                access, correction, restriction, and deletion, subject to
                applicable law.
              </p>
            </motion.section>

            {/* Liability */}
            <motion.section
              id="liability"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <ScaleIcon className="w-7 h-7 mr-2 text-danger" />
                Liability & Disclaimers
              </h2>
              <p>
                While we take care to provide reliable, secure, and continuous
                Services, we cannot guarantee that they will be error-free,
                uninterrupted, or immune from cyber risks.
              </p>
              <p>
                To the fullest extent permitted by law, Birdview Microinsurance
                excludes liability for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Losses arising from circumstances beyond our control</li>
                <li>
                  Indirect or consequential damages, including loss of income,
                  business, or goodwill
                </li>
              </ul>
              <p>
                Nothing in these Terms excludes or limits our liability for:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Fraud or fraudulent misrepresentation</li>
                <li>Death or personal injury caused by our negligence</li>
                <li>
                  Any liability that cannot be excluded under applicable law
                </li>
              </ul>
            </motion.section>

            {/* Termination */}
            <motion.section
              id="termination"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="flex items-center text-2xl font-semibold mb-4">
                <ExclamationTriangleIcon className="w-7 h-7 mr-2 text-primary" />
                Termination
              </h2>
              <p>
                We may suspend or terminate your access to the Services
                immediately if you breach these Terms or if required by law or
                regulation.
              </p>
              <p>
                You may discontinue use of the Services at any time. Upon
                termination, your right to use the Services ceases immediately,
                though provisions relating to intellectual property, liability,
                and governing law will continue to apply.
              </p>
            </motion.section>

            {/* Governing Law */}
            <motion.section
              id="governing-law"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Governing Law</h2>
              <p>
                These Terms are governed by the laws of <b>Kenya</b> (or the
                jurisdiction in which you are domiciled, where required by law).
                Any disputes will be subject to the exclusive jurisdiction of
                the courts in that territory.
              </p>
            </motion.section>

            {/* Changes */}
            <motion.section
              id="changes"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">
                Changes to These Terms
              </h2>
              <p>
                We may amend these Terms from time to time to reflect changes in
                our business, legal requirements, or industry practices.
              </p>
              <p>
                If we make material changes, we will notify you in advance (for
                example, by email or a notice on our website). Continued use of
                our Services after such changes constitutes acceptance of the
                updated Terms.
              </p>
            </motion.section>

            {/* Contact */}
            <motion.section
              id="contact"
              initial={{ opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              viewport={{ once: true }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
              <p>
                If you have questions about these Terms or require further
                clarification, please contact us:
              </p>
              <ul className="space-y-1">
                <li>📧 support@birdviewmicroinsurance.com</li>
                <li>📞 +254 (0)742 222 888</li>
              </ul>
            </motion.section>
          </CardBody>
        </Card>
      </div>
    </main>
  );
}
