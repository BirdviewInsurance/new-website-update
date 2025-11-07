"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

// Hero UI
import {
  Button,
  Card,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@heroui/react";

// Heroicons
import {
  ShieldCheckIcon,
  UserGroupIcon,
  BanknotesIcon,
  ClockIcon,
} from "@heroicons/react/24/outline";
import { motion } from "framer-motion";

import AnimatedNumber from "../../../components/AnimateNumber";

const HospitalCash = () => {
  const [currency, setCurrency] = useState("KES");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
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
        const data = (response.data as any)?.data || [];
        const ratesMap: Record<string, number> = {};

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

  const getConvertedValue = (amount: number) => {
    const rate = exchangeRates[currency] || 1;

    return Number(amount) * rate;
  };

  const handleClickHospital = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=4";
  };

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-white py-12">
      <div className="container mx-auto px-4">
        {/* Intro Section */}
        <motion.div
          className="relative text-center max-w-4xl mx-auto mb-16 px-6"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {/* Soft background glow */}
          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-red-500/10 rounded-3xl blur-3xl opacity-60" />

          <motion.h2
            className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.1, duration: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Hospital Cash Cover
          </motion.h2>

          <motion.p
            className="mt-6 text-xl text-gray-700 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            Get the confidence of knowing you’re supported when it matters most.
            Our{" "}
            <span className="font-semibold text-gray-900">
              Hospital Cash Plan
            </span>{" "}
            provides guaranteed daily payments during hospitalization—covering
            up to{" "}
            <span className="font-semibold text-gray-900">
              10 days per year
            </span>
            . With benefits ranging from{" "}
            <span className="font-semibold text-blue-700">Ksh. 2,000</span> to{" "}
            <span className="font-semibold text-red-600">Ksh. 5,000</span>{" "}
            daily, you and your loved ones can focus on recovery, not expenses.
          </motion.p>
        </motion.div>

        {/* Currency Selector - Premium Corporate Style */}
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

        {/* Pricing Table */}
        <motion.div
          className="rounded-2xl shadow-xl mb-12 overflow-x-auto bg-gradient-to-r from-blue-600 via-indigo-600 to-red-600 p-1"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Table
            removeWrapper
            aria-label="Hospital Cash Plans"
            className="text-white [&_.nextui-table-header]:bg-transparent [&_.nextui-table-header-cell]:bg-transparent"
          >
            <TableHeader>
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Plan
              </TableColumn>
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Daily Cash Payment
              </TableColumn>
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Annual Premium
              </TableColumn>
            </TableHeader>
            <TableBody>
              {[
                { plan: "Plan 1", cashPayment: 2000, premium: 1116 },
                { plan: "Plan 2", cashPayment: 2500, premium: 1392 },
                { plan: "Plan 3", cashPayment: 3000, premium: 1668 },
                { plan: "Plan 4", cashPayment: 3500, premium: 1944 },
                { plan: "Plan 5", cashPayment: 4000, premium: 2220 },
                { plan: "Plan 6", cashPayment: 5000, premium: 2772 },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-white/10 transition-colors"
                >
                  <TableCell className="text-center font-medium">
                    {row.plan}
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {currencySymbols[currency]}{" "}
                    <AnimatedNumber
                      value={getConvertedValue(row.cashPayment)}
                    />
                  </TableCell>
                  <TableCell className="text-center font-bold">
                    {currencySymbols[currency]}{" "}
                    <AnimatedNumber value={getConvertedValue(row.premium)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1 }}
        >
          <Card className="shadow-md rounded-xl hover:shadow-lg transition bg-white">
            <CardBody className="flex flex-col items-center text-center p-6">
              <ShieldCheckIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-bold text-gray-900">
                <AnimatedNumber prefix="Ksh. " value={5000} />
              </h4>
              <p className="text-gray-600 text-sm">Daily Benefit Payout</p>
            </CardBody>
          </Card>

          <Card className="shadow-md rounded-xl hover:shadow-lg transition bg-white">
            <CardBody className="flex flex-col items-center text-center p-6">
              <UserGroupIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-bold text-gray-900">
                <AnimatedNumber value={50000} />+
              </h4>
              <p className="text-gray-600 text-sm">Families Protected</p>
            </CardBody>
          </Card>

          <Card className="shadow-md rounded-xl hover:shadow-lg transition bg-white">
            <CardBody className="flex flex-col items-center text-center p-6">
              <ClockIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-bold text-gray-900">
                <AnimatedNumber value={48} /> Hours
              </h4>
              <p className="text-gray-600 text-sm">Claims Settlement</p>
            </CardBody>
          </Card>

          <Card className="shadow-md rounded-xl hover:shadow-lg transition bg-white">
            <CardBody className="flex flex-col items-center text-center p-6">
              <BanknotesIcon className="h-10 w-10 text-blue-600 mb-3" />
              <h4 className="text-lg font-bold text-gray-900">Nationwide</h4>
              <p className="text-gray-600 text-sm">Coverage Available</p>
            </CardBody>
          </Card>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <p className="text-gray-700 text-lg font-semibold mb-4">
            Ready to take the next step?
          </p>
          <Button
            className="bg-gradient-to-r from-blue-600 to-red-600 text-white font-semibold px-6"
            size="lg"
            startContent={<ShieldCheckIcon className="h-5 w-5" />}
            onClick={handleClickHospital}
          >
            Get Quote
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default HospitalCash;
