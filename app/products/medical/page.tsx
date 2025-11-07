"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
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
  Tabs,
  Tab,
} from "@heroui/react";

import AnimatedNumber from "../../../components/AnimateNumber";

const Medical: React.FC = () => {
  const [currency, setCurrency] = useState<string>("KES");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {},
  );

  const currencySymbols: { [key: string]: string } = {
    KES: "KSh",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const gradientClass =
    "bg-gradient-to-r from-indigo-600 via-blue-600 to-red-600";

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
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
      }
    };

    fetchExchangeRates();
  }, []);

  const handleClickMedical = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=3";
  };

  /** ---- Sample Data (expand with your real data) ---- **/
  const inpatientBreakdown = [
    { benefit: "Ward Bed", limit: "Full Refund" },
    { benefit: "ICU", limit: "Full Refund" },
    { benefit: "Maternity", limit: "50,000" },
    { benefit: "Major Surgery", limit: "Full Refund" },
    { benefit: "Cancer Treatment", limit: "Full Refund" },
  ];
  const inpatientPremiums = [
    { plan: "Plan A", premium: "10,000" },
    { plan: "Plan B", premium: "20,000" },
  ];

  const outpatientBreakdown = [
    { benefit: "Consultations", limit: "Full Refund" },
    { benefit: "Diagnostics", limit: "Full Refund" },
    { benefit: "Drugs", limit: "Full Refund" },
    { benefit: "Physiotherapy", limit: "Full Refund" },
  ];
  const outpatientPremiums = [
    { plan: "Plan A", premium: "5,000" },
    { plan: "Plan B", premium: "12,000" },
  ];

  const dentalBreakdown = [
    { benefit: "Consultation", limit: "Full Refund" },
    { benefit: "Scaling", limit: "Full Refund" },
    { benefit: "Fillings", limit: "Full Refund" },
    { benefit: "X-rays", limit: "Full Refund" },
  ];
  const dentalPremiums = [
    { plan: "Plan A", premium: "3,000" },
    { plan: "Plan B", premium: "8,000" },
  ];

  const opticalBreakdown = [
    { benefit: "Eye Exams", limit: "Full Refund" },
    { benefit: "Frames", limit: "15,000" },
    { benefit: "Lenses", limit: "15,000" },
    { benefit: "Contact Lenses", limit: "15,000" },
  ];
  const opticalPremiums = [
    { plan: "Plan A", premium: "4,000" },
    { plan: "Plan B", premium: "9,000" },
  ];

  /** ---- Corporate Tab Styling ---- **/
  const tabClasses = {
    tabList: "border-b border-gray-200",
    cursor:
      "bg-gradient-to-r from-indigo-600 via-blue-600 to-red-600 h-[3px] rounded-full",
    tab: "px-6 py-3 text-lg font-medium text-gray-600 hover:text-gray-900 transition",
    tabContent:
      "group-data-[selected=true]:font-bold group-data-[selected=true]:text-gray-900",
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Intro */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-20"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-700 via-blue-600 to-red-600 bg-clip-text text-transparent">
            Comprehensive Medical Insurance
          </h2>
          <p className="mt-8 text-lg md:text-xl text-gray-700 leading-relaxed">
            Protect your family’s health with{" "}
            <span className="font-semibold text-gray-900">
              tailored medical plans
            </span>{" "}
            — covering inpatient, outpatient, dental and optical.
            Corporate-grade care backed by trusted providers.
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
          <div className="relative inline-block rounded-2xl bg-white shadow-lg p-[2px] bg-gradient-to-r from-indigo-600 via-blue-500 to-red-500">
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

        {/* All Covers with Tabs */}
        <div className="space-y-20">
          {/* Inpatient */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Inpatient</h3>
            <Tabs
              aria-label="Inpatient Cover"
              classNames={tabClasses}
              variant="underlined"
            >
              <Tab key="breakdown" title="Breakdown">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Limit
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {inpatientBreakdown.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.benefit}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.limit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="premium" title="Premiums">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Premium
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {inpatientPremiums.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.premium}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
            </Tabs>
          </motion.div>

          {/* Outpatient */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">
              Outpatient
            </h3>
            <Tabs
              aria-label="Outpatient Cover"
              classNames={tabClasses}
              variant="underlined"
            >
              <Tab key="breakdown" title="Breakdown">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Limit
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {outpatientBreakdown.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.benefit}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.limit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="premium" title="Premiums">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Premium
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {outpatientPremiums.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.premium}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
            </Tabs>
          </motion.div>

          {/* Dental */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Dental</h3>
            <Tabs
              aria-label="Dental Cover"
              classNames={tabClasses}
              variant="underlined"
            >
              <Tab key="breakdown" title="Breakdown">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Limit
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dentalBreakdown.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.benefit}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.limit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="premium" title="Premiums">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Premium
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {dentalPremiums.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.premium}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
            </Tabs>
          </motion.div>

          {/* Optical */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <h3 className="text-3xl font-bold text-gray-900 mb-6">Optical</h3>
            <Tabs
              aria-label="Optical Cover"
              classNames={tabClasses}
              variant="underlined"
            >
              <Tab key="breakdown" title="Breakdown">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Limit
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {opticalBreakdown.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.benefit}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.limit}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
              <Tab key="premium" title="Premiums">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-white text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-white text-center font-semibold">
                      Premium
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {opticalPremiums.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {row.premium}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Tab>
            </Tabs>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          className="bg-gradient-to-r from-indigo-700 via-blue-600 to-red-600 rounded-3xl p-12 text-center shadow-2xl mt-20"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Take Control of Your Health Today
          </h3>
          <p className="text-lg text-gray-100 max-w-3xl mx-auto mb-10">
            Get access to world-class hospitals, doctors, and emergency support.
            <span className="font-semibold text-yellow-200">
              {" "}
              From maternity to critical care
            </span>
            , our Medical Cover gives you total peace of mind.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Button
              className="bg-white text-indigo-700 font-semibold px-8 shadow-md hover:scale-105 transition"
              size="lg"
              onClick={handleClickMedical}
            >
              Get a Quote
            </Button>
            <Button
              className="bg-red-600 text-white font-semibold px-8 shadow-md hover:bg-red-700 transition"
              size="lg"
              onClick={() => (window.location.href = "tel:+254742222888")}
            >
              Call Emergency Line
            </Button>
            <Button
              className="bg-blue-600 text-white font-semibold px-8 shadow-md hover:bg-blue-700 transition"
              size="lg"
              onClick={() =>
                (window.location.href = "/BIRDVIEW_LIST_OF_PROVIDERS_2025.pdf")
              }
            >
              Download Providers List
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-10 max-w-6xl mx-auto text-center mt-20"
          initial={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          {[
            {
              label: "Claims Processed",
              value: 120000,
              color: "text-yellow-400",
            },
            { label: "Partner Hospitals", value: 350, color: "text-green-400" },
            {
              label: "Families Protected",
              value: 50000,
              color: "text-blue-400",
            },
          ].map((stat, i) => (
            <Card
              key={i}
              className="rounded-2xl shadow-lg bg-white hover:shadow-xl transition"
            >
              <CardBody className="p-10">
                <h4
                  className={`text-4xl md:text-5xl font-extrabold ${stat.color} mb-4`}
                >
                  <AnimatedNumber value={stat.value} />+
                </h4>
                <p className="text-lg font-semibold text-gray-700">
                  {stat.label}
                </p>
              </CardBody>
            </Card>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Medical;
