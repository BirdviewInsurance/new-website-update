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

import AnimatedNumber from "../../../components/AnimateNumber";
import { useSearchParams } from "next/navigation";

type ExchangeRates = Record<string, number>;

const TuktukWelfareContent: React.FC = () => {
  const params = useSearchParams();

  const intermidiaryName = params.get("intermidiaryName") || "";
  const intermidiaryNumber = params.get("intermidiaryNumber") || "";
  const subIntermidiaryNumber = params.get("subIntermidiaryNumber") || "";
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

    return (
      <AnimatedNumber
        colorClass="text-green-300"
        prefix={prefix}
        value={converted}
      />
    );
  };

  const handleQuoteClick = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=4";
  };

  const gradientClass =
    "bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500";

  const sections = [
    {
      title: "Inpatient Benefits",
      data: [
        { benefit: "Overall Limit", value: 100000 },
        { benefit: "Hospital Bed Accommodation", value: "General Ward" },
        { benefit: "Accident Waiting Period", value: "0 days" },
        { benefit: "Pre-existing & Chronic Conditions", value: 50000 },
        { benefit: "Maternity Cover (incl. Caesarean sections)", value: 30000 },
        { benefit: "Post-Hospitalization Treatment", value: 20000 },
        { benefit: "Internal & External Medical Appliances", value: 30000 },
        { benefit: "Dental Treatment (Non-Accident)", value: 25000 },
        { benefit: "Ophthalmology (Non-Accident)", value: 25000 },
        { benefit: "Cancer Treatment", value: 50000 },
        { benefit: "Congenital Conditions", value: 50000 },
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
        { benefit: "Pre & Post-Natal Treatment", value: "Covered" },
        { benefit: "Chronic & Pre-existing Conditions", value: "Covered" },
        { benefit: "ARV Drugs", value: "Covered" },
        { benefit: "Co-payment", value: "None" },
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

  const premiums = [
    {
      option: "Option I - All Benefits",
      annual: 18250,
      weekly: 350,
      daily: 50,
    },
    {
      option: "Option II - Excluding Outpatient",
      annual: 10950,
      weekly: 210,
      daily: 30,
    },
  ];

  const baseLink = `https://partners.birdviewinsurance.com/customer/quotation?intermidiaryName=${encodeURIComponent(
    intermidiaryName
  )}&intermidiaryNumber=${encodeURIComponent(
    intermidiaryNumber
  )}&subIntermidiaryNumber=${encodeURIComponent(subIntermidiaryNumber)}`;

  const handleOptionClick = (selectedOption: string) => {
    console.log("Selected:", selectedOption); // 👉 You can use it internally
    window.location.href = baseLink; // 👉 No option added to URL
  };

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
        <h2 className="text-5xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-blue-600 to-blue-500 bg-clip-text text-transparent">
          TukTuk Welfare Cover
        </h2>
        <p className="mt-6 text-xl text-gray-700 leading-relaxed">
          A complete welfare plan designed for{" "}
          <span className="font-semibold text-blue-700">TukTuk Operators</span>,
          offering hospitalization, outpatient, and accident protection —
          ensuring peace of mind every mile.
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
        <div className="relative inline-block rounded-2xl bg-white shadow-lg p-[2px] bg-gradient-to-r from-indigo-600 via-blue-500 to-sky-500">
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

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 px-6 max-w-7xl mx-auto">
        {sections.map((section, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card
              className={`border-0 rounded-2xl ${gradientClass}`}
              shadow="lg"
            >
              <CardHeader className="text-white font-bold text-lg bg-transparent">
                {section.title}
              </CardHeader>
              <CardBody>
                <div className="overflow-x-auto">
                  <Table
                    removeWrapper
                    aria-label={`${section.title} Table`}
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
                          <TableCell className="text-white text-left">
                            {row.benefit}
                          </TableCell>
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

      {/* Premiums Section */}
      <motion.div
        className="max-w-5xl mx-auto mt-16 px-6"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Card className={`border-0 rounded-2xl ${gradientClass}`} shadow="lg">
          <CardHeader className="text-white font-bold text-lg bg-transparent">
            Premium Options
          </CardHeader>
          <CardBody>
            <div className="overflow-x-auto">
              <Table
                removeWrapper
                aria-label="Premiums Table"
                className="min-w-max text-center"
              >
                <TableHeader>
                  <TableColumn className="text-primary font-semibold text-left">
                    Option
                  </TableColumn>
                  <TableColumn className="text-primary font-semibold text-center">
                    Annual
                  </TableColumn>
                  <TableColumn className="text-primary font-semibold text-center">
                    Weekly
                  </TableColumn>
                  <TableColumn className="text-primary font-semibold text-center">
                    Daily
                  </TableColumn>
                </TableHeader>
                <TableBody>
                  {premiums.map((p, idx) => (
                    <TableRow
                      key={idx}
                      onClick={() => handleOptionClick(p.option)}
                      className="
                      odd:bg-white/5 even:bg-white/10 
                      hover:bg-white/20 
                      transition-all 
                      cursor-pointer 
                      active:scale-[0.99]
                    "
                    >
                      <TableCell className="text-white">{p.option}</TableCell>
                      <TableCell className="text-white">{formatAmount(p.annual)}</TableCell>
                      <TableCell className="text-white">{formatAmount(p.weekly)}</TableCell>
                      <TableCell className="text-white">{formatAmount(p.daily)}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>

              </Table>
            </div>
          </CardBody>
        </Card>
      </motion.div>

      {/* CTA Section - TukTuk */}
      <motion.div
        className="text-center mt-20"
        initial={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        <Card
          className="max-w-4xl mx-auto border-0 rounded-3xl overflow-hidden bg-gradient-to-r from-blue-600 via-blue-400 to-red-600 text-white"
          shadow="lg"
        >
          <CardBody className="px-10 py-12 space-y-6">
            <h3 className="text-3xl font-extrabold tracking-tight">
              Drive with Confidence. Protect What Drives You.
            </h3>
            <p className="text-lg text-yellow-100 max-w-2xl mx-auto leading-relaxed">
              Your TukTuk is more than a ride — it’s your business, your
              family’s future, and your legacy. Birdview’s TukTuk Welfare
              ensures you’re protected every mile.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                className="bg-white text-red-600 font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-2xl transition-all"
                size="lg"
                onClick={() =>
                (window.location.href =
                  "https://quote.birdviewinsurance.com/?ProductID=4")
                }
              >
                Get Your TukTuk Cover
              </Button>

              <Button
                className="border-white text-white hover:bg-white/10 font-medium px-8 py-3 rounded-xl"
                size="lg"
                variant="bordered"
                onClick={() =>
                  window.open("https://birdviewmicroinsurance.com/partners")
                }
              >
                Partner With Us
              </Button>
            </div>
          </CardBody>
        </Card>
      </motion.div>
    </div>
  );
};

/** ✅ Wrap in HeroUIProvider for full theme consistency */
const TuktukWelfare: React.FC = () => (
  <HeroUIProvider>
    <TuktukWelfareContent />
  </HeroUIProvider>
);

export default TuktukWelfare;
