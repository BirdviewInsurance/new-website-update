"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";

const forms = [
    {
        title: "Support Request Form",
        description: "Submit a support request quickly and efficiently.",
        link: "/support/request",
    },
    {
        title: "Membership Registration Form",
        description: "Register as a member to enjoy our exclusive services.",
        link: "/membership/register",
    },
    {
        title: "Feedback Form",
        description: "Share your feedback to help us improve.",
        link: "/feedback",
    },
    {
        title: "Corporate Inquiry Form",
        description: "Reach out for corporate partnerships or business inquiries.",
        link: "/corporate/inquiry",
    },
];

export default function FormsPage() {
    return (
        <div className="w-full min-h-screen bg-blue-600 text-white font-sans">
            {/* HERO */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                            Access Our Exclusive Forms
                        </h1>

                        <p className="mt-6 text-lg lg:text-xl text-gray-100">
                            Simplify your processes with professionally designed forms.
                        </p>

                        <Button
                            as="a"
                            href="#forms-section"
                            className="mt-8 bg-white text-blue-600 font-semibold hover:bg-gray-100 transition shadow-lg"
                        >
                            Explore Forms
                        </Button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="lg:w-1/2"
                    >
                        <Image
                            src="/images/forms-hero.png"
                            alt="Forms Hero"
                            width={650}
                            height={450}
                            className="rounded-xl shadow-2xl"
                        />
                    </motion.div>
                </div>
            </section>

            {/* FORMS SECTION */}
            <section
                id="forms-section"
                className="bg-white text-gray-900 py-24 rounded-t-3xl shadow-xl"
            >
                <div className="max-w-7xl mx-auto px-6">
                    <h2 className="text-4xl font-bold text-center mb-12">Available Forms</h2>

                    <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
                        {forms.map((form) => (
                            <motion.div
                                key={form.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                            >
                                <Card className="hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                    <CardHeader className="font-bold text-xl text-blue-600">
                                        {form.title}
                                    </CardHeader>

                                    <CardBody className="text-gray-700">
                                        <p>{form.description}</p>

                                        <Button
                                            as="a"
                                            href={form.link}
                                            className="mt-4 bg-blue-600 w-full text-white hover:bg-blue-700"
                                        >
                                            Open Form
                                        </Button>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
}
