"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Card, CardHeader, CardBody, Select, SelectItem, Chip } from "@heroui/react";
import { Shield, ArrowRight, Search, Filter, ArrowUpDown } from "lucide-react";
import { useState, useMemo } from "react";

type ProductCategory =
    | "All"
    | "Health & Medical"
    | "Life & Funeral"
    | "Travel & Emergency"
    | "Accident"
    | "Vehicle/Motor"
    | "Agriculture/Business";

type SortOption = "default" | "name-asc" | "name-desc" | "category";

interface Product {
    title: string;
    slug: string;
    route: string; // Route to the product page
    img: string;
    desc: string;
    category: ProductCategory;
}

const allProducts: Product[] = [
    {
        title: "Evacuation and Repatriation",
        slug: "evacuation_and_repatriation",
        route: "/products/evacuation_and_repatriation",
        img: "/assets/productsPhotos/Evacuation-and-Repatriation.png",
        desc: "This cover is crafted to intervene and rescue situations of citizens being either stranded or deceased abroad.",
        category: "Travel & Emergency",
    },
    {
        title: "Last Expense",
        slug: "last_expense",
        route: "/products/last_expense",
        img: "/assets/productsPhotos/last-expense.png",
        desc: "Our last expense/funeral expense cover pays a specified cash amount within 48 hours of notification of death.",
        category: "Life & Funeral",
    },
    {
        title: "Medical",
        slug: "medical",
        route: "/products/medical",
        img: "/assets/productsPhotos/medical.png",
        desc: "Our medical insurance products include inpatient (With In-built Maternity), Outpatient, Dental, and Optical.",
        category: "Health & Medical",
    },
    {
        title: "Hospital Cash",
        slug: "hospital_cash",
        route: "/products/hospital_cash",
        img: "/assets/productsPhotos/hospital-cash.png",
        desc: "Daily payments for insureds admitted in hospital for up to a maximum of 10 payments per year or admission.",
        category: "Health & Medical",
    },
    {
        title: "Personal Accident",
        slug: "personal_accident",
        route: "/products/personal_accident",
        img: "/assets/productsPhotos/personal-accident.png",
        desc: "Plan provides fixed sum payout on death, permanent disablement, and medical expenses arising because of an accident.",
        category: "Accident",
    },
    {
        title: "Motorbike/Bodaboda Insurance Welfare Cover",
        slug: "bodaboda_welfare",
        route: "/products/bodaboda_welfare",
        img: "/assets/productsPhotos/motorbike.jpg",
        desc: "Health Insurance cover for Bodaboda riders",
        category: "Vehicle/Motor",
    },
    {
        title: "TukTuk Insurance Welfare Cover",
        slug: "tuktuk_welfare",
        route: "/products/tuktuk_welfare",
        img: "/assets/productsPhotos/tuktuk.png",
        desc: "Health Insurance cover for Tuktuk drivers",
        category: "Vehicle/Motor",
    },
    {
        title: "Probation Guard",
        slug: "probation_guard",
        route: "/products/probation_guard",
        img: "/assets/productsPhotos/prob_guard.png",
        desc: "This enhancement to our existing Evacuation and Repatriation Cover includes a new component.",
        category: "Travel & Emergency",
    },
    {
        title: "AQUABIMA Insurance",
        slug: "aquaculture",
        route: "/products/aquaculture",
        img: "/assets/productsPhotos/aqua_culture.jpeg",
        desc: "AQUABIMA is a tailored insurance solution for cage and pond farmers, ensuring guaranteed returns on investment.",
        category: "Agriculture/Business",
    },
];

const categories: ProductCategory[] = [
    "All",
    "Health & Medical",
    "Life & Funeral",
    "Travel & Emergency",
    "Accident",
    "Vehicle/Motor",
    "Agriculture/Business",
];

const productVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            delay: i * 0.1,
            duration: 0.5,
            ease: "easeOut",
        },
    }),
};

export default function ProductsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory>("All");
    const [sortOption, setSortOption] = useState<SortOption>("default");

    const filteredAndSortedProducts = useMemo(() => {
        let filtered = allProducts.filter((product) => {
            const matchesSearch =
                product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.desc.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            return matchesSearch && matchesCategory;
        });

        // Apply sorting
        switch (sortOption) {
            case "name-asc":
                filtered.sort((a, b) => a.title.localeCompare(b.title));
                break;
            case "name-desc":
                filtered.sort((a, b) => b.title.localeCompare(a.title));
                break;
            case "category":
                filtered.sort((a, b) => {
                    const categoryOrder = categories.slice(1); // Remove "All"
                    const aIndex = categoryOrder.indexOf(a.category);
                    const bIndex = categoryOrder.indexOf(b.category);
                    if (aIndex !== bIndex) return aIndex - bIndex;
                    return a.title.localeCompare(b.title);
                });
                break;
            default:
                // Keep original order
                break;
        }

        return filtered;
    }, [searchQuery, selectedCategory, sortOption]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-red-50">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-r from-primary via-blue-600 to-danger py-20 px-6">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                        initial={{ opacity: 0, y: -30 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                            <Shield className="w-5 h-5 text-white" />
                            <span className="text-white font-semibold">All Insurance Plans</span>
                        </div>
                        <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
                            Our Insurance Products
                        </h1>
                        <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                            Explore our comprehensive range of insurance products designed to protect what matters most to you.
                        </p>

                        {/* Search Bar */}
                        <motion.div
                            animate={{ opacity: 1, scale: 1 }}
                            className="max-w-2xl mx-auto"
                            initial={{ opacity: 0, scale: 0.95 }}
                            transition={{ delay: 0.3, duration: 0.5 }}
                        >
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                                <input
                                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/95 backdrop-blur-md border border-white/30 shadow-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 placeholder-gray-500"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search for a product..."
                                    type="text"
                                    value={searchQuery}
                                />
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Products Grid Section */}
            <section className="max-w-7xl mx-auto py-16 px-6">
                {/* Filters and Sort Controls */}
                <motion.div
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-8 flex flex-col sm:flex-row gap-4 items-center justify-between"
                    initial={{ opacity: 0, y: -20 }}
                    transition={{ delay: 0.4, duration: 0.5 }}
                >
                    {/* Category Filter */}
                    <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <Filter className="w-5 h-5" />
                            <span>Category:</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((category) => (
                                <button
                                    key={category}
                                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                                        ? "bg-primary text-white shadow-lg scale-105"
                                        : "bg-white text-gray-700 border border-gray-300 hover:border-primary hover:text-primary"
                                        }`}
                                    onClick={() => setSelectedCategory(category)}
                                >
                                    {category}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Sort Dropdown */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                        <div className="flex items-center gap-2 text-gray-700 font-semibold">
                            <ArrowUpDown className="w-5 h-5" />
                            <span>Sort:</span>
                        </div>
                        <Select
                            className="min-w-[180px]"
                            placeholder="Sort by"
                            selectedKeys={new Set([sortOption])}
                            size="sm"
                            variant="bordered"
                            onSelectionChange={(keys) => {
                                const selected = Array.from(keys)[0] as string;
                                if (selected) setSortOption(selected as SortOption);
                            }}
                        >
                            <SelectItem key="default">Default</SelectItem>
                            <SelectItem key="name-asc">Name (A-Z)</SelectItem>
                            <SelectItem key="name-desc">Name (Z-A)</SelectItem>
                            <SelectItem key="category">Category</SelectItem>
                        </Select>
                    </div>
                </motion.div>

                {filteredAndSortedProducts.length === 0 ? (
                    <motion.div
                        animate={{ opacity: 1 }}
                        className="text-center py-20"
                        initial={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <p className="text-xl text-gray-600 mb-4">No products found</p>
                        <p className="text-gray-500">Try adjusting your search query or category filter</p>
                    </motion.div>
                ) : (
                    <>
                        <motion.div
                            animate={{ opacity: 1 }}
                            className="mb-8"
                            initial={{ opacity: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <p className="text-gray-600 text-center">
                                Showing <span className="font-semibold text-primary">{filteredAndSortedProducts.length}</span>{" "}
                                {filteredAndSortedProducts.length === 1 ? "product" : "products"}
                                {selectedCategory !== "All" && (
                                    <span className="ml-2">
                                        in <span className="font-semibold text-primary">{selectedCategory}</span>
                                    </span>
                                )}
                            </p>
                        </motion.div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filteredAndSortedProducts.map((product, i) => (
                                <motion.div
                                    key={product.slug}
                                    custom={i}
                                    initial="hidden"
                                    variants={productVariants}
                                    viewport={{ once: true }}
                                    whileHover={{ y: -8 }}
                                    whileInView="visible"
                                >
                                    <Link href={product.route}>
                                        <Card
                                            className="h-full group cursor-pointer border border-gray-200 hover:border-primary/50 transition-all duration-300 hover:shadow-xl bg-white"
                                            radius="lg"
                                            shadow="sm"
                                        >
                                            <div className="relative overflow-hidden rounded-t-lg">
                                                <Image
                                                    alt={product.title}
                                                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                                                    height={400}
                                                    src={product.img}
                                                    width={600}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                            </div>
                                            <CardHeader className="px-6 pt-6 pb-2">
                                                <div className="w-full">
                                                    <div className="flex items-start justify-between gap-2 mb-2">
                                                        <h3 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300 flex-1">
                                                            {product.title}
                                                        </h3>
                                                    </div>
                                                    <Chip
                                                        className="bg-primary/10 text-primary border border-primary/20"
                                                        size="sm"
                                                        variant="flat"
                                                    >
                                                        {product.category}
                                                    </Chip>
                                                </div>
                                            </CardHeader>
                                            <CardBody className="px-6 pb-6">
                                                <p className="text-gray-600 mb-4 line-clamp-3">
                                                    {product.desc}
                                                </p>
                                                <div className="flex items-center gap-2 text-primary font-semibold group-hover:gap-3 transition-all duration-300">
                                                    <span>Learn More</span>
                                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </>
                )}
            </section>

            {/* CTA Section */}
            <section className="bg-gradient-to-r from-primary via-blue-600 to-danger py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        animate={{ opacity: 1, y: 0 }}
                        initial={{ opacity: 0, y: 20 }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                            Need Help Choosing the Right Plan?
                        </h2>
                        <p className="text-xl text-white/90 mb-8">
                            Our insurance experts are here to help you find the perfect coverage for your needs.
                        </p>
                        <Link
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-primary font-semibold hover:bg-gray-100 transition-all duration-300 shadow-lg hover:shadow-xl"
                            href="/contact-us"
                        >
                            <span>Contact Us</span>
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>
        </div>
    );
}

