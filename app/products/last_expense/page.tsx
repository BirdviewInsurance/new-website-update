"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
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

const LastExpenses: React.FC = () => {
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
                const data = responseData?.data || [];
                const ratesMap: ExchangeRates = {};
                for (let item of data) {
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

    const formatAmount = (amount: number, type: "benefit" | "premium") => {
        const rate = exchangeRates[currency] || 1;
        const converted = Number(amount) * rate;
        const prefix = currencySymbols[currency] || "";
        const colorClass =
            type === "benefit" ? "text-blue-200" : "text-yellow-200 font-semibold";

        return (
            <AnimatedNumber
                value={converted}
                prefix={prefix}
                colorClass={colorClass}
            />
        );
    };

    const handleClickLastExpsense = () => {
        window.location.href = "https://quote.birdviewinsurance.com/?ProductID=2";
    };

    const gradientClass = "bg-gradient-to-r from-indigo-600 via-blue-600 to-red-600";

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
                <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-700 via-indigo-700 to-red-600 bg-clip-text text-transparent">
                    Last Expense Cover
                </h2>
                <p className="mt-6 text-xl text-gray-700 leading-relaxed">
                    Peace of mind for you and your loved ones. Our{" "}
                    <span className="font-semibold text-gray-900">Last Expense Plan</span>{" "}
                    guarantees fast payouts within 48 hours — covering funeral expenses
                    with limits ranging from{" "}
                    <span className="font-semibold text-blue-700">Ksh. 50,000</span> to{" "}
                    <span className="font-semibold text-red-600">Ksh. 500,000</span>.
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
                <div
                    className="relative inline-block rounded-2xl bg-white shadow-lg p-[2px] 
                  bg-gradient-to-r from-indigo-600 via-blue-500 to-red-500"
                >
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

            {/* Plans Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 max-w-7xl mx-auto">
                {/* Individual */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Card shadow="lg" className={`border-0 rounded-2xl ${gradientClass}`}>
                        <CardHeader className="text-white font-bold text-lg bg-transparent">
                            Individual (up to 69 yrs)
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <Table
                                    aria-label="Individual Plans"
                                    removeWrapper
                                    className="text-center min-w-max"
                                >
                                    <TableHeader className="bg-transparent">
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Plan
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Benefit
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Premium
                                        </TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            { plan: "Plan 1", limit: 50000, premium: 510 },
                                            { plan: "Plan 2", limit: 100000, premium: 1020 },
                                            { plan: "Plan 3", limit: 200000, premium: 2040 },
                                            { plan: "Plan 4", limit: 250000, premium: 2550 },
                                            { plan: "Plan 5", limit: 300000, premium: 3060 },
                                            { plan: "Plan 6", limit: 500000, premium: 5090 },
                                        ].map((row, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="odd:bg-white/5 even:bg-white/10 hover:bg-white/20 transition-all"
                                            >
                                                <TableCell className="text-white">{row.plan}</TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.limit, "benefit")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.premium, "premium")}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                {/* Family */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <Card shadow="lg" className={`border-0 rounded-2xl ${gradientClass}`}>
                        <CardHeader className="text-white font-bold text-lg bg-transparent">
                            Family (up to 69 yrs)
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <Table
                                    aria-label="Family Plans"
                                    removeWrapper
                                    className="text-center min-w-max"
                                >
                                    <TableHeader className="bg-transparent">
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Plan
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Benefit
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Spouse
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Per Child
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Premium
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Extra Child
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-center text-white font-semibold">
                                            Extra Spouse
                                        </TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            {
                                                plan: "Plan 1",
                                                limit: 50000,
                                                spouse: 50000,
                                                child: 50000,
                                                premium: 1000,
                                                extra_child: 260,
                                                extra_spouse: 510,
                                            },
                                            {
                                                plan: "Plan 2",
                                                limit: 100000,
                                                spouse: 100000,
                                                child: 100000,
                                                premium: 1930,
                                                extra_child: 510,
                                                extra_spouse: 1020,
                                            },
                                            {
                                                plan: "Plan 3",
                                                limit: 200000,
                                                spouse: 200000,
                                                child: 200000,
                                                premium: 3850,
                                                extra_child: 1020,
                                                extra_spouse: 2040,
                                            },
                                            {
                                                plan: "Plan 4",
                                                spouse: 250000,
                                                child: 250000,
                                                limit: 250000,
                                                premium: 5000,
                                                extra_child: 1280,
                                                extra_spouse: 2550,
                                            },
                                            {
                                                plan: "Plan 5",
                                                spouse: 300000,
                                                child: 300000,
                                                limit: 300000,
                                                premium: 5770,
                                                extra_child: 1530,
                                                extra_spouse: 3060,
                                            },
                                            {
                                                plan: "Plan 6",
                                                spouse: 500000,
                                                child: 500000,
                                                limit: 500000,
                                                premium: 9600,
                                                extra_child: 2550,
                                                extra_spouse: 5090,
                                            },
                                        ].map((row, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="odd:bg-white/5 even:bg-white/10 hover:bg-white/20 transition-all"
                                            >
                                                <TableCell className="text-white">{row.plan}</TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.limit, "benefit")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.spouse, "benefit")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.child, "benefit")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.premium, "premium")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.extra_child, "premium")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.extra_spouse, "premium")}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>

                {/* Parents & Siblings */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    viewport={{ once: true }}
                >
                    <Card shadow="lg" className={`border-0 rounded-2xl ${gradientClass}`}>
                        <CardHeader className="text-white font-bold text-lg bg-transparent">
                            Parents & Siblings (18–85 yrs)
                        </CardHeader>
                        <CardBody>
                            <div className="overflow-x-auto">
                                <Table
                                    aria-label="Parents and Siblings Plans"
                                    removeWrapper
                                    className="text-center min-w-max"
                                >
                                    <TableHeader className="bg-transparent">
                                        <TableColumn className="bg-transparent text-white font-semibold text-center">
                                            Plan
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-white font-semibold text-center">
                                            Benefit
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-white font-semibold text-center">
                                            18–69 yrs
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-white font-semibold text-center">
                                            70–75 yrs
                                        </TableColumn>
                                        <TableColumn className="bg-transparent text-white font-semibold text-center">
                                            76–85 yrs
                                        </TableColumn>
                                    </TableHeader>
                                    <TableBody>
                                        {[
                                            {
                                                plan: "Plan 1",
                                                limit: 50000,
                                                premiumadultq: 510,
                                                premiumadultk: 1060,
                                                premiumadultm: 1840,
                                            },
                                            {
                                                plan: "Plan 2",
                                                limit: 100000,
                                                premiumadultq: 1020,
                                                premiumadultk: 2110,
                                                premiumadultm: 3680,
                                            },
                                            {
                                                plan: "Plan 3",
                                                limit: 200000,
                                                premiumadultq: 2040,
                                                premiumadultk: 4210,
                                                premiumadultm: 7350,
                                            },
                                        ].map((row, idx) => (
                                            <TableRow
                                                key={idx}
                                                className="odd:bg-white/5 even:bg-white/10 hover:bg-white/20 transition-all"
                                            >
                                                <TableCell className="text-white">{row.plan}</TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.limit, "benefit")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.premiumadultq, "premium")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.premiumadultk, "premium")}
                                                </TableCell>
                                                <TableCell className="text-white">
                                                    {formatAmount(row.premiumadultm, "premium")}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                                {/* Disclaimer */}
                                <p className="text-xs text-white font-medium italic mt-2">
                                    * Available for the parents and siblings of the principal member.
                                </p>
                            </div>
                        </CardBody>
                    </Card>
                </motion.div>
            </div>

            {/* CTA */}
            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                viewport={{ once: true }}
                className="text-center mt-16"
            >
                <p className="text-lg font-semibold text-gray-800 mb-4">
                    Ready to take the next step?
                </p>
                <Button
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold px-6"
                    onClick={handleClickLastExpsense}
                    startContent={<ShieldCheckIcon className="h-5 w-5" />}
                >
                    Get Quote
                </Button>
            </motion.div>
        </div>
    );
};

export default LastExpenses;
