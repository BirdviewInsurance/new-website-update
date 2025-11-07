"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
    HeroUIProvider,
    Button,
    Card,
    CardBody,
    CardHeader,
    Select,
    SelectItem,
    Table,
    TableHeader,
    TableColumn,
    TableBody,
    TableRow,
    TableCell,
} from "@heroui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";
import AnimatedNumber from "../../../components/AnimateNumber";

type ExchangeRates = Record<string, number>;

const BodaBodaWelfareContent: React.FC = () => {
    const [currency, setCurrency] = useState("KES");
    const [exchangeRates, setExchangeRates] = useState<ExchangeRates>({});
    const [loadingRates, setLoadingRates] = useState(false);

    const currencySymbols: Record<string, string> = {
        KES: "Ksh.",
        USD: "$",
        EUR: "€",
        GBP: "£",
    };

    useEffect(() => {
        const fetchExchangeRates = async () => {
            try {
                setLoadingRates(true);
                const response = await axios.get(
                    "https://snownet-customer-quotation-server.onrender.com/api/underwriting/quotation/onlineQuotation/products/exchangeRate/"
                );
                const responseData = response.data as any;
                const ratesArray = responseData?.data || [];
                const ratesMap: ExchangeRates = {};
                for (let item of ratesArray) {
                    if (item.currency && item.x_rate) {
                        ratesMap[item.currency] = parseFloat(item.x_rate);
                    }
                }
                setExchangeRates(ratesMap);
            } catch (error) {
                console.error("❌ Failed to fetch exchange rates:", error);
            } finally {
                setLoadingRates(false);
            }
        };

        fetchExchangeRates();
    }, []);

    const formatAmount = (amount: number) => {
        const rate = exchangeRates[currency] || 1;
        const converted = Number(amount) * rate;
        const prefix = currencySymbols[currency] || "";
        return <AnimatedNumber value={converted} prefix={prefix} colorClass="text-green-300" />;
    };

    const handleQuoteClick = () => {
        window.location.href = "https://quote.birdviewinsurance.com/?ProductID=4";
    };

    const gradientClass = "bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500";

    const sections = [
        {
            title: "Inpatient Benefits",
            data: [
                { benefit: "Overall Limit", value: 100000 },
                { benefit: "Hospital Bed Accommodation", value: "General Ward" },
                { benefit: "Pre-existing & Chronic Conditions", value: 50000 },
                { benefit: "Maternity Cover (incl. Caesarean sections)", value: 30000 },
                { benefit: "Cancer Treatment", value: 50000 },
                { benefit: "Last Expense (Stand-alone)", value: 50000 },
            ],
        },
        {
            title: "Outpatient Benefits",
            data: [
                { benefit: "Overall Limit", value: 15000 },
                { benefit: "General Medical Check-Up", value: 5000 },
                { benefit: "Vaccination", value: 5000 },
                { benefit: "Long-term Family Planning", value: 5000 },
                { benefit: "Chronic & Pre-existing Conditions", value: "Covered" },
                { benefit: "ARV Drugs", value: "Covered" },
            ],
        },
        {
            title: "Personal Accident (Principal Only)",
            data: [
                { benefit: "Overall Limit", value: 50000 },
                { benefit: "Permanent Total Disability", value: 50000 },
                { benefit: "Funeral Expenses", value: 50000 },
                { benefit: "Medical Expenses", value: 30000 },
                { benefit: "Artificial Appliances", value: 30000 },
                { benefit: "Temporary Total Disability", value: 50000 },
            ],
        },
    ];

    return (
        <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16">
            {/* Intro Section */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center max-w-4xl mx-auto mb-16"
            >
                <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-sky-500 bg-clip-text text-transparent">
                    BodaBoda Welfare Cover
                </h2>
                <p className="mt-6 text-xl text-gray-700 leading-relaxed">
                    A premium welfare plan tailored for{" "}
                    <span className="font-semibold text-blue-700">BodaBoda Operators</span>, offering
                    hospital support, accident protection, and family peace of mind under one trusted brand.
                </p>
            </motion.div>

            {/* Currency Selector */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center mb-12"
            >
                <div className="relative inline-block rounded-2xl bg-white shadow-lg p-[2px] bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-500">
                    <div className="rounded-2xl bg-white px-4 py-3">
                        <label className="block text-sm font-semibold text-gray-700 mb-2 text-center">
                            Select Currency
                        </label>
                        <Select
                            selectedKeys={[currency]}
                            onSelectionChange={(keys) => setCurrency(Array.from(keys)[0] as string)}
                            aria-label="Select Currency"
                            className="w-48 font-semibold text-gray-800"
                            radius="lg"
                            variant="bordered"
                            classNames={{
                                trigger:
                                    "bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-all",
                                value: "text-lg font-bold text-indigo-700",
                                popoverContent:
                                    "bg-white shadow-xl rounded-xl border border-gray-200",
                            }}
                        >
                            {Object.keys(currencySymbols).map((c) => (
                                <SelectItem
                                    key={c}
                                    className="font-medium text-gray-700 hover:bg-indigo-50 hover:text-indigo-700"
                                >
                                    {c}
                                </SelectItem>
                            ))}
                        </Select>
                    </div>
                </div>
            </motion.div>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 max-w-7xl mx-auto">
                {sections.map((section, idx) => (
                    <motion.div
                        key={idx}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <Card shadow="lg" className={`border-0 rounded-2xl ${gradientClass}`}>
                            <CardHeader className="text-white font-bold text-lg bg-transparent">
                                {section.title}
                            </CardHeader>
                            <CardBody>
                                <div className="overflow-x-auto">
                                    <Table
                                        aria-label={`${section.title} Table`}
                                        removeWrapper
                                        className="text-center min-w-max"
                                    >
                                        <TableHeader className="bg-transparent">
                                            <TableColumn className="text-primary font-semibold text-left">
                                                Benefit
                                            </TableColumn>
                                            <TableColumn className="text-primary font-semibold text-center">
                                                Value
                                            </TableColumn>
                                        </TableHeader>
                                        <TableBody>
                                            {section.data.map((row, i) => (
                                                <TableRow
                                                    key={i}
                                                    className="odd:bg-white/5 even:bg-white/10 hover:bg-white/20 transition-all"
                                                >
                                                    <TableCell className="text-white text-left">{row.benefit}</TableCell>
                                                    <TableCell className="text-white text-right">
                                                        {typeof row.value === "number" ? (
                                                            formatAmount(row.value)
                                                        ) : (
                                                            <span className="italic">{row.value}</span>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </CardBody>
                        </Card>
                    </motion.div>
                ))}
            </div>

            {/* CTA Section */}
            {/* CTA Section - BodaBoda */}
            <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-center mt-20"
            >
                <Card
                    shadow="lg"
                    className="max-w-4xl mx-auto border-0 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 text-white"
                >
                    <CardBody className="px-10 py-12 space-y-6">
                        <h3 className="text-3xl font-extrabold tracking-tight">
                            Ride with Pride. Live with Protection.
                        </h3>
                        <p className="text-lg text-blue-100 max-w-2xl mx-auto leading-relaxed">
                            Every journey deserves peace of mind. Join thousands of BodaBoda riders
                            who trust Birdview to keep their families and livelihoods secure.
                        </p>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button
                                size="lg"
                                onClick={() =>
                                (window.location.href =
                                    "https://quote.birdviewinsurance.com/?ProductID=4")
                                }
                                className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                            >
                                Get Your BodaBoda Cover
                            </Button>

                            <Button
                                size="lg"
                                variant="bordered"
                                className="border-white text-white hover:bg-white/10 font-medium px-8 py-3 rounded-xl"
                                onClick={() => window.open("https://birdviewmicroinsurance.com/contact")}
                            >
                                Talk to an Agent
                            </Button>
                        </div>
                    </CardBody>
                </Card>
            </motion.div>
        </div>
    );
};

/** ✅ Still wrapped in HeroUIProvider for consistent styling/theme */
const BodaBodaWelfare: React.FC = () => (
    <HeroUIProvider>
        <BodaBodaWelfareContent />
    </HeroUIProvider>
);

export default BodaBodaWelfare;
