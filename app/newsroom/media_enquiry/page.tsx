"use client";

import React, { useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    Input,
    Textarea,
} from "@heroui/react";
import { motion } from "framer-motion";
import { Mail, Phone, Linkedin, Twitter, Facebook, Youtube, Instagram, Download, MessageSquare } from "lucide-react";
import { TikTokColourIcon } from "../../../components/icons/TikTokColourIcon";

export default function MediaEnquiryCard() {
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        name: "",
        org: "",
        email: "",
        phone: "",
        message: "",
    });

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        setForm((s) => ({ ...s, [e.target.name]: e.target.value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = encodeURIComponent(`Media enquiry from ${form.name}`);
        const body = encodeURIComponent(
            `Name: ${form.name}\nOrganization: ${form.org}\nEmail: ${form.email}\nPhone: ${form.phone}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:media@birdviewinsurance.com?subject=${subject}&body=${body}`;
        setOpen(false);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-4xl mx-auto"
            >
                <Card className="relative overflow-hidden rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-gray-900 shadow-lg transition-colors duration-300">
                    {/* Header */}
                    <CardHeader className="flex flex-col sm:flex-row items-center sm:items-start justify-between px-6 py-6 border-b border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-4">
                            <img
                                src="/media-relations.jpg"
                                alt="Media Relations"
                                className="w-16 h-16 rounded-xl object-cover border border-gray-200 dark:border-white/20"
                            />
                            <div>
                                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                                    Media & Press Enquiries
                                </h3>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                    Speak directly with our Media Relations Officer
                                </p>
                            </div>
                        </div>

                        {/* Quick contact */}
                        <div className="flex flex-col gap-1 mt-4 sm:mt-0 text-sm">
                            <a
                                href="mailto:media@birdviewinsurance.com"
                                className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                            >
                                <Mail className="w-4 h-4" /> media@birdviewinsurance.com
                            </a>
                            <a
                                href="tel:+254112072445"
                                className="inline-flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-primary"
                            >
                                <Phone className="w-4 h-4" /> +254 112 072 445
                            </a>
                        </div>
                    </CardHeader>

                    {/* Body */}
                    <CardBody className="px-6 py-6 grid md:grid-cols-2 gap-8">
                        {/* Left: Description */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                                    Need press materials or an interview?
                                </h4>
                                <p className="mt-2 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    Birdview Insurance’s Marketing & Communications team provides
                                    resources for journalists, partners, and collaborators — from
                                    press kits to interview scheduling. We ensure timely responses
                                    and accurate corporate insights.
                                </p>

                                <div className="flex flex-wrap items-center gap-4 mt-6">
                                    <motion.button
                                        onClick={() => setOpen(true)}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.97 }}
                                        className="group inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-5 py-2.5 text-sm font-medium hover:bg-blue-500 shadow-md hover:shadow-blue-500/30 transition-all duration-300"
                                    >
                                        <motion.div
                                            whileHover={{ rotate: -10, x: 4 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        >
                                            <MessageSquare className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                        </motion.div>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Request Interview
                                        </span>
                                    </motion.button>
                                    <a
                                        href="/assets/press-kit.zip"
                                        download
                                        className="group inline-flex items-center gap-2 rounded-full bg-red-600 text-white px-5 py-2.5 text-sm font-medium border border-transparent hover:bg-red-700 hover:shadow-[0_0_20px_rgba(220,38,38,0.4)] transition-all duration-300"
                                    >
                                        <motion.div
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 300, damping: 15 }}
                                        >
                                            <Download className="w-4 h-4 group-hover:rotate-12 transition-transform duration-300" />
                                        </motion.div>
                                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                                            Download Press Kit
                                        </span>
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right: Contact / Social */}
                        <div className="rounded-xl border border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-white/5 p-5 flex flex-col justify-between">
                            <div>
                                <h5 className="font-semibold text-gray-900 dark:text-white mb-2">
                                    Media Contact
                                </h5>
                                <p className="text-gray-800 dark:text-gray-200 font-medium">
                                    Jane Mwangi, Head of Media Relations
                                </p>
                                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                                    For all press & corporate communications
                                </p>

                                <div className="flex gap-3 mt-4">
                                    <a
                                        href="https://www.linkedin.com/in/birdview-insurance-71b32431a"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="LinkedIn"
                                    >
                                        <Linkedin className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>

                                    <a
                                        href="https://x.com/BirdviewInsur?t=oTQd4bz-Tlhpb9OXuEgf2g&s=08"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="Twitter"
                                    >
                                        <Twitter className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>

                                    <a
                                        href="https://www.facebook.com/share/17HhNv62FW/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="Facebook"
                                    >
                                        <Facebook className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>

                                    <a
                                        href="https://www.tiktok.com/@birdview.insurance"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="TikTok"
                                    >
                                        <TikTokColourIcon className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>

                                    <a
                                        href="https://www.youtube.com/@BirdviewInsurance"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="YouTube"
                                    >
                                        <Youtube className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>

                                    <a
                                        href="https://www.instagram.com/birdviewinsurance?igsh=bXN2bng0MjUwaGtp"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group p-2 rounded-full border border-gray-300 dark:border-white/10 hover:bg-gray-100 dark:hover:bg-white/10 transition"
                                        title="Instagram"
                                    >
                                        <Instagram className="w-5 h-5 text-gray-700 dark:text-white group-hover:text-red-600 transition-colors duration-300" />
                                    </a>
                                </div>
                            </div>

                            <div className="mt-6 text-xs text-gray-500 dark:text-gray-400">
                                © {new Date().getFullYear()} Birdview Microinsurance Marketing Dept.
                            </div>
                        </div>
                    </CardBody>

                    <CardFooter className="px-6 py-4 border-t border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 text-sm flex justify-between items-center">
                        <span>Birdview Corporate Communications</span>
                        <a
                            href="/privacy"
                            className="hover:text-primary transition font-medium"
                        >
                            Privacy Policy
                        </a>
                    </CardFooter>
                </Card>
            </motion.div>

            {/* Modal */}
            <Modal isOpen={open} onOpenChange={setOpen}>
                <ModalContent>
                    <ModalHeader className="font-bold text-lg">
                        Request Interview / Press Kit
                    </ModalHeader>
                    <ModalBody>
                        <form onSubmit={handleSubmit} className="grid gap-3">
                            <Input
                                name="name"
                                placeholder="Full name"
                                value={form.name}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="org"
                                placeholder="Organization"
                                value={form.org}
                                onChange={handleChange}
                            />
                            <Input
                                name="email"
                                type="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <Input
                                name="phone"
                                placeholder="Phone"
                                value={form.phone}
                                onChange={handleChange}
                            />
                            <Textarea
                                name="message"
                                placeholder="Your message"
                                value={form.message}
                                onChange={handleChange}
                            />
                            <div className="flex justify-end gap-2 mt-3">
                                <Button
                                    variant="ghost"
                                    color="danger"
                                    onPress={() => setOpen(false)}
                                    className="hover:text-white transition-colors"
                                >
                                    Cancel
                                </Button>
                                <Button color="primary" type="submit" className=" text-white bg-blue-600 hover:bg-blue-500">
                                    Send
                                </Button>
                            </div>
                        </form>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
}
