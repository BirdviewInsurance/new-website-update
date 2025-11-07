"use client";

import { motion } from "framer-motion";
import { Card, CardBody } from "@heroui/card";
import { Input, Textarea } from "@heroui/input";
import { Button } from "@heroui/button";
import { toast } from "@heroui/react";
import { useState } from "react";

export default function ComplaintsPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        complaint: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        (toast as any).success("Your complaint has been submitted. Our team will contact you shortly.");
        setFormData({ name: "", email: "", phone: "", complaint: "" });
    };

    return (
        <section
            className="relative min-h-screen bg-cover bg-center bg-no-repeat py-24 px-6 md:px-20 overflow-hidden"
            style={{
                backgroundImage: "url('/images/complaints.png')", // 🖼️ Use an HD corporate photo
            }}
        >
            {/* Overlay + subtle blur */}
            <div className="absolute inset-0 bg-gradient-to-b from-blue-600/60 via-red-600/30 to-black/40 backdrop-blur-sm -z-10"></div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="max-w-4xl mx-auto text-center text-white"
            >
                <h1 className="text-4xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                    Complaints & Feedback
                </h1>
                <p className="text-lg md:text-xl text-gray-100 mb-10 max-w-2xl mx-auto leading-relaxed">
                    At <span className="font-semibold text-red-300">Birdview Insurance</span>, we take your
                    satisfaction seriously. If you have experienced a concern, we are here to listen,
                    investigate, and resolve it promptly with professionalism and transparency.
                </p>

                <Card shadow="lg" className="bg-white/95 dark:bg-gray-900/90 rounded-2xl border border-blue-100 dark:border-gray-700">
                    <CardBody className="p-8 md:p-10">
                        <form onSubmit={handleSubmit} className="space-y-6 text-left">
                            <div className="grid md:grid-cols-2 gap-6">
                                <Input
                                    label="Full Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="text-gray-700"
                                    variant="bordered"
                                />
                                <Input
                                    label="Email Address"
                                    name="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    variant="bordered"
                                />
                            </div>

                            <Input
                                label="Phone Number"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                variant="bordered"
                            />

                            <Textarea
                                label="Complaint Details"
                                name="complaint"
                                value={formData.complaint}
                                onChange={handleChange}
                                required
                                minRows={5}
                                variant="bordered"
                                className="text-gray-700"
                                placeholder="Please describe your concern in detail..."
                            />

                            <div className="flex justify-end">
                                <Button
                                    type="submit"
                                    size="lg"
                                    className="bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold shadow-md hover:opacity-90 transition-all"
                                >
                                    Submit Complaint
                                </Button>
                            </div>
                        </form>
                    </CardBody>
                </Card>

                <div className="mt-10 text-gray-200 text-sm md:text-base max-w-3xl mx-auto leading-relaxed">
                    <p>
                        Our complaints process adheres to regulatory standards under the{" "}
                        <span className="font-semibold text-red-300">Insurance Regulatory Authority (IRA)</span>.
                        Once submitted, your complaint will be acknowledged within 24 hours, and a resolution will
                        be provided within 14 business days.
                    </p>
                    <p className="mt-4">
                        If your issue remains unresolved, you may escalate it to the{" "}
                        <span className="text-blue-300 font-semibold">Commissioner of Insurance</span> for
                        independent review.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}
