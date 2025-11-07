"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";

export default function RegulatoryInfo() {
    return (
        <section className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-red-50 dark:from-gray-900 dark:via-gray-950 dark:to-gray-900 py-20 px-6 md:px-20">
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="max-w-6xl mx-auto text-center mb-12"
            >
                <h1 className="text-5xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 via-blue-500 to-red-500 dark:from-blue-300 dark:via-blue-400 dark:to-red-400 mb-4">
                    Regulatory Information
                </h1>
                <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
                    Birdview Insurance operates with full regulatory authorization, built on
                    principles of transparency, governance, and ethical compliance. Our clients’
                    trust is our license to operate — and we uphold that trust through stringent
                    adherence to financial and legal standards globally.
                </p>
            </motion.div>

            {/* Content */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="max-w-5xl mx-auto space-y-12"
            >
                {/* Section 1: Licensing */}
                <Card shadow="md" className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                            1. Licensing & Authorization
                        </h2>
                        <p>
                            <strong>Birdview Insurance Limited</strong> is duly licensed and
                            regulated under the <strong>Insurance Regulatory Authority (IRA)</strong>.
                            The company operates in full compliance with the{" "}
                            <em>Insurance Act (Cap 487)</em> and other applicable financial
                            supervision laws.
                        </p>
                        <div className="border-l-4 border-red-500 pl-4 italic text-sm text-gray-600 dark:text-gray-400">
                            License Reference: <strong>IRA/INS/12456/2025</strong>
                            <br />
                            Registered Office: Birdview Towers, Nairobi, Kenya
                        </div>
                        <p>
                            All our insurance activities are subject to periodic audits and
                            supervisory reviews by the regulator to ensure solvency, fair
                            practices, and consumer protection.
                        </p>
                    </CardBody>
                </Card>

                {/* Section 2: Compliance Standards */}
                <Card shadow="md" className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                            2. Compliance Standards & Governance
                        </h2>
                        <p>
                            Birdview Insurance integrates global best practices in governance and
                            compliance management. Our compliance framework aligns with both
                            domestic and international standards, including:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li><strong>AML/CFT Compliance:</strong> Adherence to Anti-Money Laundering and Counter-Financing of Terrorism regulations.</li>
                            <li><strong>GDPR & Data Privacy:</strong> Protection of client data under international privacy laws.</li>
                            <li><strong>Corporate Governance Code:</strong> Ethical and transparent management oversight at board level.</li>
                            <li><strong>Market Conduct Rules:</strong> Fair treatment of customers across all product offerings.</li>
                        </ul>
                        <p>
                            Our Compliance Office monitors all business units and reports directly to
                            the Board Risk and Audit Committee to ensure independence and transparency.
                        </p>
                    </CardBody>
                </Card>

                {/* Section 3: Risk & Capital Management */}
                <Card shadow="md" className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                            3. Risk & Capital Management
                        </h2>
                        <p>
                            We uphold a disciplined risk management philosophy to maintain strong
                            financial stability and sustainable growth. Birdview’s capital adequacy
                            and solvency ratios consistently exceed the minimum thresholds prescribed
                            by regulators.
                        </p>
                        <p>
                            Our Enterprise Risk Management (ERM) framework covers:
                        </p>
                        <ul className="list-disc pl-6 space-y-2">
                            <li>Operational and market risk evaluation</li>
                            <li>Investment and underwriting oversight</li>
                            <li>Reinsurance optimization and exposure control</li>
                            <li>Ongoing solvency stress testing and capital projections</li>
                        </ul>
                    </CardBody>
                </Card>

                {/* Section 4: Consumer Protection */}
                <Card shadow="md" className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                            4. Customer Protection & Dispute Resolution
                        </h2>
                        <p>
                            We believe in fairness and transparency in every customer interaction.
                            Our internal grievance redressal policy ensures that any concern or
                            complaint is resolved promptly and objectively.
                        </p>
                        <div className="border-l-4 border-blue-500 pl-4 text-sm text-gray-600 dark:text-gray-400">
                            <p><strong>Customer Resolution Desk:</strong> resolution@birdviewinsurance.com</p>
                            <p><strong>Escalation Level:</strong> Compliance & Risk Office</p>
                            <p><strong>External Mediation:</strong> Insurance Ombudsman, IRA</p>
                        </div>
                        <p>
                            Clients are encouraged to first contact our Customer Resolution Team. If
                            the issue remains unresolved, it may be referred to the Insurance
                            Ombudsman for independent review.
                        </p>
                    </CardBody>
                </Card>

                {/* Section 5: Ethics & Conduct */}
                <Card shadow="md" className="rounded-3xl border border-blue-100 dark:border-gray-800 bg-white/70 dark:bg-gray-900/60 backdrop-blur-sm">
                    <CardBody className="space-y-4 text-gray-700 dark:text-gray-300">
                        <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-400">
                            5. Ethical Standards & Reporting Integrity
                        </h2>
                        <p>
                            Birdview Insurance upholds a zero-tolerance policy for unethical or
                            fraudulent behavior. All employees, intermediaries, and partners are
                            bound by the company’s Code of Conduct and Anti-Bribery Policy.
                        </p>
                        <p>
                            Whistleblowers are protected under our <strong>Confidential Disclosure
                                Policy</strong>, ensuring that integrity concerns can be raised safely
                            and addressed promptly.
                        </p>
                        <div className="border-l-4 border-red-500 pl-4 text-sm text-gray-600 dark:text-gray-400">
                            <p><strong>Ethics Hotline:</strong> ethics@birdviewinsurance.com</p>
                            <p><strong>Confidential Reporting:</strong> +254 700 555 111</p>
                        </div>
                    </CardBody>
                </Card>

                {/* Section 6: Contact */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-center mt-16"
                >
                    <h3 className="text-2xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
                        Contact the Regulatory Affairs Department
                    </h3>
                    <p className="text-gray-700 dark:text-gray-300">
                        For compliance, governance, or legal inquiries, contact us at:
                        <br />
                        <span className="font-medium text-red-600 dark:text-red-400">
                            compliance@birdviewinsurance.com
                        </span>
                    </p>
                </motion.div>
            </motion.div>
        </section>
    );
}
