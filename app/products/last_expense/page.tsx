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
          "https://snownet-customer-quotation-server.onrender.com/api/underwriting/quotation/onlineQuotation/products/exchangeRate/",
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
        colorClass={colorClass}
        prefix={prefix}
        value={converted}
      />
    );
  };

  const handleClickLastExpsense = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=2";
  };

  const gradientClass =
    "bg-gradient-to-r from-indigo-600 via-blue-600 to-red-600";

  return (
    <div className="relative bg-gradient-to-b from-gray-50 to-gray-100 py-16">
      {/* Intro Section */}
      <motion.div
        className="text-center max-w-4xl mx-auto mb-16"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
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
        className="flex justify-center mb-12"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
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
              aria-label="Select Currency"
              className="w-48 font-semibold text-gray-800"
              classNames={{
                trigger:
                  "bg-gradient-to-r from-gray-50 to-gray-100 shadow-sm hover:shadow-md transition-all",
                value: "text-lg font-bold text-indigo-700",
                popoverContent:
                  "bg-white shadow-xl rounded-xl border border-gray-200",
              }}
              radius="lg"
              selectedKeys={[currency]}
              variant="bordered"
              onSelectionChange={(keys) =>
                setCurrency(Array.from(keys)[0] as string)
              }
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
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className={`border-0 rounded-2xl ${gradientClass}`} shadow="lg">
            <CardHeader className="text-white font-bold text-lg bg-transparent">
              Individual (up to 69 yrs)
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <Table
                  removeWrapper
                  aria-label="Individual Plans"
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

        {/* Parents & Siblings */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Card className={`border-0 rounded-2xl ${gradientClass}`} shadow="lg">
            <CardHeader className="text-white font-bold text-lg bg-transparent">
              Parents & Siblings (18–85 yrs)
            </CardHeader>
            <CardBody>
              <div className="overflow-x-auto">
                <Table
                  removeWrapper
                  aria-label="Parents and Siblings Plans"
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
                  * Available for the parents and siblings of the principal
                  member.
                </p>
              </div>
            </CardBody>
          </Card>
        </motion.div>
      </div>

      {/* Family - Full Width */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full px-4 md:px-6 lg:px-8 xl:px-12 mt-10"
      >
        <Card className={`border-0 rounded-2xl ${gradientClass} shadow-lg w-full`}>
          <CardHeader className="text-white font-bold text-lg bg-transparent">
            Family (up to 69 yrs)
          </CardHeader>
          <CardBody className="p-2 md:p-6">
            <div className="overflow-x-auto md:overflow-x-visible w-full">
              <Table
                removeWrapper
                aria-label="Family Plans"
                className="text-center w-full"
                classNames={{
                  wrapper: "w-full",
                  table: "w-full table-fixed",
                }}
              >
                <TableHeader className="bg-transparent">
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[12%]">
                    Plan
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[15%]">
                    Benefit
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[13%]">
                    Spouse
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[13%]">
                    Per Child
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[13%]">
                    Premium
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[13%]">
                    Extra Child
                  </TableColumn>
                  <TableColumn className="bg-transparent text-center text-white font-semibold text-xs md:text-sm w-[13%]">
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
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">{row.plan}</TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
                        {formatAmount(row.limit, "benefit")}
                      </TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
                        {formatAmount(row.spouse, "benefit")}
                      </TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
                        {formatAmount(row.child, "benefit")}
                      </TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
                        {formatAmount(row.premium, "premium")}
                      </TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
                        {formatAmount(row.extra_child, "premium")}
                      </TableCell>
                      <TableCell className="text-white whitespace-nowrap text-xs md:text-sm px-1 md:px-2">
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

      {/* CTA */}
      {/* ULTRA PREMIUM CTA SECTION */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        viewport={{ once: true }}
        className="relative mt-24"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-700 via-blue-600 to-red-600 opacity-90 rounded-3xl blur-2xl"></div>

        <div className="relative max-w-6xl mx-auto px-6 py-16 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-xl"
          >
            Protect Your Family With Dignity & Peace of Mind
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-100 mt-4 max-w-3xl mx-auto leading-relaxed"
          >
            Get a Last Expense Cover that guarantees fast payout, dignity, and support
            when your loved ones need it the most. Affordable plans. Instant quotation.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-10 flex flex-col md:flex-row justify-center items-center gap-5"
          >
            <Button
              size="lg"
              radius="full"
              className="px-10 py-6 text-lg font-bold text-white shadow-xl bg-gradient-to-r from-blue-600 to-red-600 hover:from-blue-700 hover:to-red-700 transition-all"
              startContent={<ShieldCheckIcon className="h-6 w-6" />}
              onClick={handleClickLastExpsense}
            >
              Get Instant Quote
            </Button>

            <Button
              size="lg"
              variant="bordered"
              radius="full"
              className="px-10 py-6 text-lg font-semibold border-white text-white hover:bg-white/20 backdrop-blur"
              onClick={() => window.location.href = '/support/request'}
            >
              Talk to an Advisor
            </Button>
          </motion.div>

          {/* Trust Badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 text-center text-white"
          >
            <div className="p-4">
              <p className="text-xl font-extrabold drop-shadow">48-Hour Payout</p>
              <p className="text-sm opacity-80">Guaranteed fast claim settlement</p>
            </div>

            <div className="p-4">
              <p className="text-xl font-extrabold drop-shadow">Affordable Premiums</p>
              <p className="text-sm opacity-80">Starting as low as Ksh. 510</p>
            </div>

            <div className="p-4">
              <p className="text-xl font-extrabold drop-shadow">Family Protection</p>
              <p className="text-sm opacity-80">Cover spouse, children & parents</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default LastExpenses;
