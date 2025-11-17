"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Button } from "@heroui/react";

const forms = [
    {
        title: "Intermediary Registration Form",
        description: "Register as an intermediary agent, broker, or diaspora agent to partner with Birdview Insurance.",
        link: "/forms/Intermediary-Registration-Form",
        category: "Registration",
    },
    {
        title: "Agent Registration",
        description: "Register as an insurance agent to start selling Birdview Insurance products.",
        link: "/forms/Agents",
        category: "Registration",
    },
    {
        title: "Group Registration Form",
        description: "Register your group or organization for group insurance coverage.",
        link: "/forms/group-form",
        category: "Registration",
    },
    {
        title: "Group Member Registration",
        description: "Register individual members within a group insurance plan.",
        link: "/forms/group-member-form",
        category: "Registration",
    },
    {
        title: "Job Application Form",
        description: "Apply for career opportunities at Birdview Insurance.",
        link: "/forms/JobApplicationForm",
        category: "Careers",
    },
    {
        title: "General Registration Form",
        description: "General registration form for various insurance services.",
        link: "/forms/RegistrationForm",
        category: "Registration",
    },
    {
        title: "Request Form",
        description: "Submit a general request or inquiry to Birdview Insurance.",
        link: "/forms/RequestForm",
        category: "General",
    },
    {
        title: "Vehicle Insurance Form",
        description: "Apply for comprehensive vehicle insurance coverage.",
        link: "/forms/VehicleInsuranceForm",
        category: "Insurance",
    },
    {
        title: "Member Form",
        description: "General membership registration form.",
        link: "/forms/MemberForm",
        category: "Registration",
    },
    {
        title: "Kenyans in Japan Form",
        description: "Registration form for Kenyans living in Japan.",
        link: "/forms/KenyansInJapanForm",
        category: "Diaspora",
    },
    {
        title: "Kenyans in North Wales Form",
        description: "Registration form for Kenyans living in North Wales, UK.",
        link: "/forms/KenyansInNorthWalesMemberForm",
        category: "Diaspora",
    },
    {
        title: "Kenyans in South Wales Form",
        description: "Registration form for Kenyans living in South Wales, UK.",
        link: "/forms/KenyansInSouthWalesMemberForm",
        category: "Diaspora",
    },
    {
        title: "Kaloleni Diaspora Association Form",
        description: "Registration form for Kaloleni Diaspora Association members.",
        link: "/forms/KaloleniDiasporaAssociationMemberForm",
        category: "Diaspora",
    },
    {
        title: "Manchester Kenyan Community Form",
        description: "Registration form for Manchester Kenyan Community members.",
        link: "/forms/ManchesterKenyanCommunityMemberForm",
        category: "Diaspora",
    },
    {
        title: "LDSKCF Member Form",
        description: "Registration form for LDSKCF (Little Cab Sacco Kenya Community Forum) members.",
        link: "/forms/LDSKCFMemberForm",
        category: "Diaspora",
    },
    {
        title: "Quungana Member Form",
        description: "Registration form for Quungana Association members.",
        link: "/forms/QuunganaMemberForm",
        category: "Diaspora",
    },
    {
        title: "Stoke UK Diaspora Sacco Form",
        description: "Registration form for Stoke UK Diaspora Sacco members.",
        link: "/forms/StokeUkDiasporaSaccoMemberForm",
        category: "Diaspora",
    },
    {
        title: "Support Request Form",
        description: "Submit a support request quickly and efficiently.",
        link: "/support/request",
        category: "Support",
    },
];

export default function FormsPage() {
    const categories = Array.from(new Set(forms.map(f => f.category)));
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    const filteredForms = selectedCategory === "All"
        ? forms
        : forms.filter(f => f.category === selectedCategory);

    return (
        <div className="w-screen max-w-none min-h-screen bg-blue-600 text-white font-sans overflow-x-hidden">
            {/* HERO */}
            <section
                className="w-full py-20 md:py-32 px-4 sm:px-6 lg:px-8 xl:px-12 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: "url('/images/form-hero.png')" }}
            >
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -40 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full lg:w-1/2 text-white"
                    >
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight drop-shadow-xl">
                            Access Our Exclusive Forms
                        </h1>

                        <p className="mt-6 text-base sm:text-lg lg:text-xl text-gray-100 drop-shadow-xl">
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
                </div>
            </section>

            {/* FORMS SECTION */}
            <section
                id="forms-section"
                className="w-full bg-white text-gray-900 py-16 md:py-24 lg:py-28 rounded-t-3xl shadow-xl"
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12">
                    <div className="text-center mb-12 md:mb-16">
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">Available Forms</h2>
                        <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
                            Browse through our comprehensive collection of forms for registration, insurance, and support.
                        </p>
                    </div>

                    {/* Category Filter */}
                    <div className="flex flex-wrap justify-center gap-3 mb-12 md:mb-16 px-2">
                        <button
                            onClick={() => setSelectedCategory("All")}
                            className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === "All"
                                ? "bg-blue-600 text-white shadow-md scale-105"
                                : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                                }`}
                        >
                            All Forms
                        </button>
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSelectedCategory(cat)}
                                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${selectedCategory === cat
                                    ? "bg-blue-600 text-white shadow-md scale-105"
                                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="grid gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
                        {filteredForms.map((form) => (
                            <motion.div
                                key={form.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3 }}
                            >
                                <Card className="h-full hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-200">
                                    <CardHeader className="flex flex-col gap-3 pb-3">
                                        <div className="flex items-start justify-between gap-3">
                                            <h3 className="font-bold text-lg sm:text-xl text-blue-600 flex-1 leading-tight">
                                                {form.title}
                                            </h3>
                                            <span className="px-2.5 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0">
                                                {form.category}
                                            </span>
                                        </div>
                                    </CardHeader>

                                    <CardBody className="text-gray-700 flex-1 flex flex-col pt-0">
                                        <p className="mb-6 flex-1 text-sm sm:text-base leading-relaxed text-gray-600">
                                            {form.description}
                                        </p>

                                        <Button
                                            as="a"
                                            href={form.link}
                                            className="mt-auto bg-blue-600 w-full text-white hover:bg-blue-700 font-medium py-2.5"
                                        >
                                            Open Form
                                        </Button>
                                    </CardBody>
                                </Card>
                            </motion.div>
                        ))}
                    </div>

                    {filteredForms.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">
                                No forms found in this category.
                            </p>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}
