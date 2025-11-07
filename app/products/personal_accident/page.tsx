"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import {
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Select,
  SelectItem,
} from "@heroui/react";
import { ShieldCheckIcon } from "@heroicons/react/24/solid";

// AnimatedNumber from your components
import AnimatedNumber from "../../../components/AnimateNumber";

const PersonalAccident = () => {
  const [currency, setCurrency] = useState("KES");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {},
  );
  const [loadingRates, setLoadingRates] = useState(false);

  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    KES: "KSh",
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
        const ratesArray = responseData?.data || [];

        const ratesMap: { [key: string]: number } = {};

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

  const convertPremiumValue = (amount: number | string) => {
    const rate = exchangeRates[currency] || 1;

    return Number(amount) * rate;
  };

  const handleClickPersonalAccident = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=5";
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Intro */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16 px-4"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-blue-600 to-red-600 bg-clip-text text-transparent">
            Personal Accident Insurance
          </h2>

          <p className="mt-6 text-xl md:text-2xl text-gray-700 leading-relaxed">
            Because life is unpredictable,{" "}
            <span className="font-semibold text-gray-900">
              we make sure your future isn’t.
            </span>
            Our{" "}
            <span className="text-indigo-600 font-semibold">
              Personal Accident Cover
            </span>{" "}
            provides financial protection when you and your loved ones need it
            most — offering{" "}
            <span className="font-semibold">lump-sum payouts</span> in case of{" "}
            <span className="font-semibold">accidental death</span>,{" "}
            <span className="font-semibold">permanent disability</span>, or{" "}
            <span className="font-semibold">unexpected medical expenses</span>.
          </p>

          <p className="mt-6 text-lg md:text-xl text-gray-600">
            Choose cover limits from{" "}
            <span className="font-bold text-indigo-700">KSh. 50,000</span> to{" "}
            <span className="font-bold text-indigo-700">KSh. 500,000</span>,
            backed by a trusted insurer. Protect your lifestyle, safeguard your
            family, and enjoy true peace of mind — today and tomorrow.
          </p>
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

        {/* Table */}
        <motion.div
          className="rounded-2xl shadow-xl mb-12 overflow-x-auto bg-gradient-to-r from-indigo-600 via-blue-600 to-red-600 p-1"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <Table removeWrapper aria-label="Personal Accident Plans">
            <TableHeader className="bg-transparent">
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Plan
              </TableColumn>
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Main Benefit Covered
              </TableColumn>
              <TableColumn className="text-center text-white font-semibold bg-transparent">
                Premium per Person
              </TableColumn>
            </TableHeader>

            <TableBody>
              {[
                { plan: "Plan 1", limit: 50000, premium: 500 },
                { plan: "Plan 2", limit: 100000, premium: 1000 },
                { plan: "Plan 3", limit: 200000, premium: 1340 },
                { plan: "Plan 4", limit: 250000, premium: 1670 },
                { plan: "Plan 5", limit: 300000, premium: 2000 },
                { plan: "Plan 6", limit: 500000, premium: 2500 },
              ].map((row, index) => (
                <TableRow
                  key={index}
                  className="hover:bg-white/10 transition-colors"
                >
                  <TableCell className="text-center font-medium text-white">
                    {row.plan}
                  </TableCell>
                  <TableCell className="text-center font-bold text-yellow-200">
                    {currencySymbols[currency]}{" "}
                    <AnimatedNumber value={convertPremiumValue(row.limit)} />
                  </TableCell>
                  <TableCell className="text-center font-bold text-green-300">
                    {currencySymbols[currency]}{" "}
                    <AnimatedNumber value={convertPremiumValue(row.premium)} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Unique CTA Section */}
        <motion.div
          className="relative mt-20 rounded-3xl bg-gradient-to-r from-amber-500 via-red-500 to-pink-600 shadow-2xl overflow-hidden"
          initial={{ opacity: 0, y: 60 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" />

          <div className="relative px-8 md:px-16 py-16 text-center text-white">
            <motion.h3
              className="text-4xl md:text-5xl font-extrabold mb-6"
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              whileInView={{ opacity: 1, y: 0 }}
            >
              Stay Protected When Life Takes the Unexpected Turn
            </motion.h3>

            <p className="max-w-2xl mx-auto text-lg md:text-xl leading-relaxed mb-8">
              Accidents happen when you least expect them. With our{" "}
              <span className="font-semibold">Personal Accident Insurance</span>
              , you safeguard not only your health — but also your family’s
              financial future. From medical expenses to income protection,
              we’ve got you covered.
            </p>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileInView={{ scale: 1, opacity: 1 }}
            >
              <Button
                className="bg-white text-red-600 font-bold px-8 py-6 shadow-lg hover:scale-105 transition-transform"
                radius="full"
                size="lg"
                startContent={
                  <ShieldCheckIcon className="h-6 w-6 text-red-600" />
                }
                onClick={handleClickPersonalAccident}
              >
                Protect My Future Today
                <br />
                <span className="text-sm font-normal">
                  (Get a Quote in Minutes)
                </span>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PersonalAccident;
