"use client";

import React from "react";
import { motion } from "framer-motion";
import { Button, Card, CardBody, CardHeader } from "@heroui/react";
import {
    Cookie,
    Globe,
    ShieldCheck,
    BarChart3,
    Users,
    FileSearch,
    Settings,
    Mail,
} from "lucide-react";

export default function CookiePolicyPage() {
    const sections = [
        {
            title: "1. Introduction",
            icon: <Globe className="w-6 h-6 text-primary" />,
            content: `At [Your Company Name], we are committed to protecting your privacy and ensuring transparency. 
            This Cookie Policy explains how we use cookies and similar technologies to deliver an optimized, 
            secure, and personalized browsing experience.`,
            bg: "from-primary/10 to-transparent",
        },
        {
            title: "2. What Are Cookies?",
            icon: <Cookie className="w-6 h-6 text-danger" />,
            content: `Cookies are small data files placed on your device when you visit a website. They serve various 
            purposes such as remembering your preferences, improving navigation, and providing analytical insights. 
            Some cookies are essential for functionality, while others enhance user experience.`,
            bg: "from-danger/10 to-transparent",
        },
        {
            title: "3. Types of Cookies We Use",
            icon: <BarChart3 className="w-6 h-6 text-primary" />,
            content: (
                <ul className="list-disc ml-6 space-y-2">
                    <li><b>Essential Cookies</b> – Necessary for core site operations like login and page navigation.</li>
                    <li><b>Performance Cookies</b> – Help us understand site traffic and usage for continual improvement.</li>
                    <li><b>Functional Cookies</b> – Remember preferences like language, region, or theme settings.</li>
                    <li><b>Analytics Cookies</b> – Track anonymous site usage to optimize our digital services.</li>
                    <li><b>Marketing Cookies</b> – Deliver tailored content and measure advertising effectiveness.</li>
                </ul>
            ),
            bg: "from-primary/5 to-transparent",
        },
        {
            title: "4. Why We Use Cookies",
            icon: <ShieldCheck className="w-6 h-6 text-danger" />,
            content: `Cookies allow us to recognize returning visitors, maintain session continuity, enhance website
            functionality, and measure the success of campaigns. We also use them to personalize your digital journey
            and ensure compliance with legal and security requirements.`,
            bg: "from-danger/5 to-transparent",
        },
        {
            title: "5. Third-Party Cookies and Analytics",
            icon: <FileSearch className="w-6 h-6 text-primary" />,
            content: `We partner with trusted third-party services, including analytics and advertising providers.
            These partners may set cookies that collect anonymized data on your interactions to help us improve
            usability and deliver relevant experiences. All partners adhere to our strict data protection standards.`,
            bg: "from-primary/10 to-transparent",
        },
        {
            title: "6. Managing Cookie Preferences",
            icon: <Settings className="w-6 h-6 text-danger" />,
            content: (
                <div className="space-y-3">
                    <p>
                        You have full control over your cookie preferences. Most browsers allow you to manage or delete cookies at any time.
                        You can also opt out of non-essential cookies via our <b>Cookie Preferences Center</b>.
                    </p>
                    <ul className="list-disc ml-6 space-y-1">
                        <li>Access browser settings to block or remove cookies.</li>
                        <li>Use “Do Not Track” features if supported by your browser.</li>
                        <li>Reject analytics and marketing cookies directly on our website.</li>
                    </ul>
                </div>
            ),
            bg: "from-danger/10 to-transparent",
        },
        {
            title: "7. Data Protection and Security",
            icon: <Users className="w-6 h-6 text-primary" />,
            content: `We take data security seriously. All cookie data is handled in accordance with GDPR and 
            international data protection laws. No personal information is sold or shared beyond what is necessary 
            to maintain essential site functionality.`,
            bg: "from-primary/5 to-transparent",
        },
        {
            title: "8. Updates to This Policy",
            icon: <BarChart3 className="w-6 h-6 text-danger" />,
            content: `We regularly review and update our Cookie Policy to reflect technological advancements,
            regulatory changes, and evolving business practices. The latest version will always be published on this page.`,
            bg: "from-danger/5 to-transparent",
        },
        {
            title: "9. Contact Us",
            icon: <Mail className="w-6 h-6 text-primary" />,
            content: (
                <>
                    If you have any questions about our Cookie Policy or wish to exercise your privacy rights, please contact us at:
                    <div className="mt-3">
                        <a
                            href="mailto:privacy@birdviewinsurance.com"
                            className="text-danger font-medium underline hover:text-danger/70"
                        >
                            privacy@birdviewinsurance.com
                        </a>
                    </div>
                </>
            ),
            bg: "from-primary/10 to-transparent",
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-b from-primary/10 via-white to-danger/5 text-gray-900 dark:text-gray-100">
            {/* Hero Section */}
            <section className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-primary/70 to-danger/70 opacity-90" />
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 flex flex-col items-center justify-center text-center py-28 px-6"
                >
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                        Our Cookie Policy
                    </h1>
                    <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                        Transparency and trust are at the heart of our digital experience.
                        Learn how we use cookies to enhance your journey with us.
                    </p>
                    <div className="mt-6">
                        <Button
                            color="danger"
                            variant="solid"
                            className="font-semibold text-white shadow-lg hover:scale-105 transition-transform"
                        >
                            Manage Cookie Preferences
                        </Button>
                    </div>
                </motion.div>
                <motion.div
                    className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white dark:from-gray-900"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                />
            </section>

            {/* Policy Content */}
            <section className="max-w-6xl mx-auto px-6 py-20 space-y-12">
                {sections.map((section, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: i * 0.1 }}
                        viewport={{ once: true }}
                    >
                        <Card
                            shadow="sm"
                            className={`hover:shadow-2xl bg-gradient-to-br ${section.bg} rounded-2xl transition-shadow duration-300 border border-gray-200 dark:border-gray-700`}
                        >
                            <CardHeader className="flex items-center gap-3 border-b border-gray-200 dark:border-gray-700 pb-3">
                                {section.icon}
                                <h2 className="text-xl md:text-2xl font-bold text-primary">
                                    {section.title}
                                </h2>
                            </CardHeader>
                            <CardBody className="p-6 md:p-8 text-gray-700 dark:text-gray-300 leading-relaxed">
                                {typeof section.content === "string" ? (
                                    <p>{section.content}</p>
                                ) : (
                                    section.content
                                )}
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </section>
        </div>
    );
}
