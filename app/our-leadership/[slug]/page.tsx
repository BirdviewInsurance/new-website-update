"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { Card, CardHeader, CardBody } from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const allLeaders = [
    {
        name: "Geoffery kangwana",
        slug: "geoffery-kangwana",
        role: "Chairman - Board Of Directors",
        category: "Board of Directors",
        bio: "A visionary leader in governance and innovation, Dr. Jane Mwangi brings over 25 years of experience steering global organizations toward sustainable growth. Her passion for integrity, inclusion, and progress defines her leadership ethos.",
        image: "/assets/managementPhotos/Geoffrey-Kangwana.png",
        cta: {
            title: "Championing Visionary Leadership",
            text: "Dr. Mwangi continues to inspire transformative leadership through ethical governance and a human-first approach to growth.",
            button: "Read Dr. Mwangi’s Strategic Outlook",
            link: "/insights/chairperson-vision",
        },
    },
    {
        name: "Richard Muiru",
        slug: "richard-muiru",
        role: "Director",
        category: "Board of Directors",
        bio: "Michael is a catalyst for operational excellence and digital transformation, driving purpose-led innovation across industries. His hands-on leadership ensures agility and resilience in dynamic markets.",
        image: "/assets/managementPhotos/Richard-Muiru.png",
        cta: {
            title: "Driving Digital Transformation",
            text: "Michael advocates for intelligent automation and sustainable innovation to redefine the modern corporate experience.",
            button: "Explore Michael’s Thought Leadership",
            link: "/insights/michael-otieno-leadership",
        },
    },
    {
        name: "James Kimani",
        slug: "james-kimani",
        role: "Director",
        category: "Board of Directors",
        bio: "Dr. Noor is a governance expert and human capital strategist dedicated to fostering ethical leadership and equitable organizational growth. Her work bridges purpose, performance, and people.",
        image: "/assets/managementPhotos/James-Kimani.png",
        cta: {
            title: "Empowering Human-Centric Governance",
            text: "Through her work, Dr. Noor champions inclusion, mentorship, and transformative leadership across all levels of management.",
            button: "Discover Dr. Noor’s Governance Framework",
            link: "/insights/amina-noor-governance",
        },
    },
    {
        name: "Obed Menjeri",
        slug: "obed-menjeri",
        role: "Director",
        category: "Board of Directors",
        bio: "Dr. Noor is a governance expert and human capital strategist dedicated to fostering ethical leadership and equitable organizational growth. Her work bridges purpose, performance, and people.",
        image: "/assets/managementPhotos/Obed-Menjeri.png",
        cta: {
            title: "Empowering Human-Centric Governance",
            text: "Through her work, Dr. Noor champions inclusion, mentorship, and transformative leadership across all levels of management.",
            button: "Discover Dr. Noor’s Governance Framework",
            link: "/insights/amina-noor-governance",
        },
    },
    {
        name: "James Nyakundi",
        slug: "james-nyakundi",
        role: "Director",
        category: "Board of Directors",
        bio: "Dr. Noor is a governance expert and human capital strategist dedicated to fostering ethical leadership and equitable organizational growth. Her work bridges purpose, performance, and people.",
        image: "/assets/managementPhotos/James-Nyakundi.png",
        cta: {
            title: "Empowering Human-Centric Governance",
            text: "Through her work, Dr. Noor champions inclusion, mentorship, and transformative leadership across all levels of management.",
            button: "Discover Dr. Noor’s Governance Framework",
            link: "/insights/amina-noor-governance",
        },
    },
    {
        name: "Peter Kamau",
        slug: "peter-kamau",
        role: "Chief Executive Officer",
        category: "Executive Leadership",
        bio: "Peter embodies transformative leadership rooted in innovation, trust, and long-term value creation. As CEO, he drives our mission to deliver protection and prosperity for communities and clients alike.",
        image: "/assets/managementPhotos/Geoffrey-Kangwana.png",
        cta: {
            title: "Leading with Vision and Impact",
            text: "Peter continues to redefine leadership excellence with his forward-thinking strategies and people-centered mission.",
            button: "See Peter’s Message on Our Future",
            link: "/insights/ceo-message",
        },
    },
    {
        name: "Grace Njoroge",
        slug: "grace-njoroge",
        role: "Chief Operations Officer",
        category: "Executive Leadership",
        bio: "Grace leads with precision and empathy, redefining operational excellence across all divisions. Her commitment to digital innovation ensures a customer-first ecosystem with global standards.",
        image: "/assets/managementPhotos/Esdor-Yahuma.png",
        cta: {
            title: "Transforming Operations with Heart",
            text: "Grace’s vision merges operational rigor with human empathy, cultivating excellence at every organizational level.",
            button: "Learn More About Grace’s Initiatives",
            link: "/insights/operational-excellence",
        },
    },
    {
        name: "Brian Kibet",
        slug: "brian-kibet",
        role: "Chief Finance Officer",
        category: "Executive Leadership",
        bio: "With over 15 years in corporate finance, Brian champions fiscal integrity and forward-looking financial strategy. He ensures every decision aligns with sustainable growth and stakeholder trust.",
        image: "/assets/managementPhotos/James-Nyakundi.png",
        cta: {
            title: "Shaping Financial Resilience",
            text: "Brian’s analytical acumen drives sustainable growth, resilience, and value creation for the long term.",
            button: "Read Brian’s Financial Insights",
            link: "/insights/finance-leadership",
        },
    },
    {
        name: "Dr. Alice Oloo",
        slug: "alice-oloo",
        role: "Senior Strategic Advisor",
        category: "Advisory Council",
        bio: "Dr. Oloo brings over two decades of strategic advisory experience, empowering teams to align mission with measurable impact. Her global perspective nurtures innovation and inclusive growth.",
        image: "/assets/managementPhotos/Richard-Muiru.png",
        cta: {
            title: "Global Strategy for Local Impact",
            text: "Dr. Oloo’s insights continue to shape strategy frameworks that empower growth and positive societal transformation.",
            button: "Discover Dr. Oloo’s Strategy Playbook",
            link: "/insights/strategy-playbook",
        },
    },
    {
        name: "John Mwangi",
        slug: "john-mwangi",
        role: "Financial Consultant",
        category: "Advisory Council",
        bio: "John is a seasoned financial strategist recognized for his data-driven approach to risk and investment management. His insights continue to strengthen the firm’s long-term value creation.",
        image: "/assets/managementPhotos/Obed-Menjeri.png",
        cta: {
            title: "Building Sustainable Financial Futures",
            text: "John’s leadership in investment planning and risk optimization helps shape resilient corporate foundations.",
            button: "Explore John’s Financial Perspectives",
            link: "/insights/financial-perspectives",
        },
    },
];

export default function LeaderProfilePage() {
    const { slug } = useParams();
    const [leader, setLeader] = useState<any>(null);

    useEffect(() => {
        const found = allLeaders.find((l) => l.slug === slug);
        setLeader(found);
    }, [slug]);

    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -80]);

    if (!leader) {
        return (
            <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white text-xl">
                Leader not found.
            </div>
        );
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-b from-gray-50 via-white to-gray-100 dark:from-gray-950 dark:via-gray-900 dark:to-black text-gray-800 dark:text-white transition-colors duration-700">
            {/* ✨ Floating gradient orbs */}
            <motion.div
                style={{ y: y1 }}
                className="absolute top-20 left-1/4 w-72 h-72 bg-gradient-to-r from-blue-600/40 to-red-600/30 rounded-full blur-3xl opacity-60"
            />
            <motion.div
                style={{ y: y2 }}
                className="absolute bottom-10 right-1/3 w-96 h-96 bg-gradient-to-r from-red-600/30 to-blue-500/30 rounded-full blur-3xl opacity-50"
            />

            {/* 🪞 Leader Profile Card */}
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen p-6 md:p-16"
            >
                <Card className="max-w-3xl w-full backdrop-blur-2xl bg-white/60 dark:bg-white/10 border border-gray-200/60 dark:border-white/20 shadow-2xs rounded-3xl overflow-hidden">
                    <CardHeader className="relative w-full h-80 md:h-96 overflow-hidden flex justify-center items-center bg-gradient-to-b from-gray-100 dark:from-gray-900">
                        <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden ring-8 ring-white/40 dark:ring-white/10 shadow-2xl">
                            <Image
                                src={leader.image}
                                alt={leader.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, 768px"
                                priority
                            />
                        </div>
                    </CardHeader>

                    <CardBody className="p-10 text-center space-y-8">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-2">{leader.name}</h1>
                            <p className="text-lg text-primary font-medium">{leader.role}</p>
                        </div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="text-lg leading-relaxed text-gray-700 dark:text-gray-200 max-w-2xl mx-auto"
                        >
                            {leader.bio}
                        </motion.p>

                        {/* 🔗 Back CTA */}
                        <div className="pt-6 flex justify-center">
                            <Link href="/our-leadership">
                                <motion.div
                                    whileHover={{ x: -4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="group flex items-center gap-2 text-primary dark:text-white border border-primary/30 dark:border-white/30 rounded-xl px-5 py-3 hover:bg-primary/10 dark:hover:bg-white/10 transition-all duration-300 cursor-pointer"
                                >
                                    <ArrowLeft className="w-5 h-5" />
                                    <span className="font-medium">Back to Leadership</span>
                                </motion.div>
                            </Link>
                        </div>
                    </CardBody>
                </Card>

                {/* 💫 Personalized CTA */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="mt-20 max-w-4xl w-full text-center bg-gradient-to-r from-blue-600/20 via-blue-500/10 to-red-600/20 dark:from-blue-700/30 dark:to-red-700/20 backdrop-blur-xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl"
                >
                    <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-red-600 mb-6">
                        {leader.cta.title}
                    </h2>
                    <p className="text-gray-700 dark:text-gray-200 text-lg leading-relaxed max-w-2xl mx-auto mb-10">
                        {leader.cta.text}
                    </p>
                    <Link href={leader.cta.link}>
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.96 }}
                            className="group inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-red-600 text-white font-medium px-6 py-3 rounded-full shadow-lg hover:shadow-2xl transition-all"
                        >
                            {leader.cta.button}
                            <motion.div
                                variants={{
                                    rest: { x: 0 },
                                    hover: { x: 6 },
                                }}
                                initial="rest"
                                whileHover="hover"
                                className="flex"
                            >
                                <ArrowRight className="w-4 h-4" />
                            </motion.div>
                        </motion.div>
                    </Link>
                </motion.div>
            </motion.div>
        </div>
    );
}
