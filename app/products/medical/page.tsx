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
    KES: "Ksh.",
    USD: "$",
    EUR: "€",
    GBP: "£",
  };

  const familySizes = ["M", "M+1", "M+2", "M+3", "M+4", "M+5", "M+6", "M+7"];

  function isNumeric(value: any): boolean {
    return !isNaN(value) && isFinite(value);
  }

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

  /** ---- Real Data from Medical.jsx ---- **/
  const headings = [
    "Plan", "Benefit Cover", "Territorial Limit", "Hospital Bed Accommodation",
    "Accident Waiting Period", "Child Dependant Maximum Age Limit At Purchase", "Adult Maximum Age Limit At Purchase",
    "Adult Age Limit Extension On Renewal", "Dependant Age Limit Extension With Proof Of Schooling",
    "Pre-Existing and/or Chronic Condition(1 year waiting period)", "Maternity Cover(1 year waiting period)", "Post Hospitalization Treatment",
    "Inpatient Gynaecological Conditions", "Road Ambulance", "Ambulance Services", "Air Evacuation",
    "Internal & External Medical Appliances", "Inpatient Non-Accident Dental Treatment (1 year waiting period)",
    "Inpatient Non-Accident Ophthalmology (1 year waiting period)", "Lodger Benefit", "Psychiatric Hospitalization",
    "Cancer Treatment (1 year waiting period)", "Pre-maturity and Congenital Conditions (1 year waiting period for maternity applies)", "Last Expense"
  ];

  const plansd = [
    {
      name: "Plan 1",
      values: [
        "Plan 1", "200000", "East Africa (Kenya. Uganda, Tanzania, Rwanda)", "General Ward Bed", "0 Days", "18 Years", "70 Years", "100 Years",
        "25 Years", "100000", "50000", "10000", "Covered", "Covered", "Covered",
        "Covered", "40000", "50000", "50000", "Up to 10 Years", "Covered", "100000",
        "100000", "50000"
      ]
    },
    {
      name: "Plan 2",
      values: [
        "Plan 2", "300000", "East Africa (Kenya. Uganda, Tanzania, Rwanda)", "General Ward Bed", "0 Days", "18 Years", "70 Years", "100 Years",
        "25 Years", "150000", "60000", "15000", "Covered", "Covered", "Covered",
        "Covered", "50000", "50000", "50000", "Up to 10 Years", "Covered", "150000",
        "150000", "75000"
      ]
    },
    {
      name: "Plan 3",
      values: [
        "Plan 3", "500000", "East Africa (Kenya. Uganda, Tanzania, Rwanda)", "General Ward Bed", "0 Days", "18 Years", "70 Years", "100 Years",
        "25 Years", "250000", "75000", "17500", "Covered", "Covered", "Covered",
        "Covered", "75000", "50000", "50000", "Up to 10 Years", "Covered", "250000",
        "250000", "100000"
      ]
    }
  ];

  const inpatientPlans = [
    { plan: "Plan 1", inpatient: 200000, maternity: 50000, premiums: [5720, 8580, 9610, 10868, 12012, 13156, 14300, 14400] },
    { plan: "Plan 2", inpatient: 300000, maternity: 60000, premiums: [6860, 10290, 11525, 13034, 14400, 14400, 14400, 14400] },
    { plan: "Plan 3", inpatient: 500000, maternity: 75000, premiums: [8230, 12345, 13826, 14400, 14400, 14400, 14400, 14400] }
  ];

  const outpatientPlans = [
    { plan: "Plan 1", outpatient: 50000, premiums: [8580, 14400, 14400, 14400, 14400, 14400, 14400, 14400] },
  ];

  const plans = [
    {
      plan: "Plan 1",
      limit: 50000,
      premium: "Covered To Full Limit",
      premiumk: 5000,
      premiumz: "None",
    },
  ];

  const pland = [
    { name: "Plan 1", limit: 5000, premium: "Covered To Full Limit" },
    { name: "Plan 2", limit: 7500, premium: "Covered To Full Limit" },
    { name: "Plan 3", limit: 10000, premium: "Covered To Full Limit" },
  ];

  const plansc = [
    { plan: "Plan 1", limit: 5000, premium: "Covered To Full Limit" },
    { plan: "Plan 2", limit: 7500, premium: "Covered To Full Limit" },
    { plan: "Plan 3", limit: 10000, premium: "Covered To Full Limit" }
  ];

  const categories = [
    "Benefit Cover",
    "Dental Consultations & Gum Diseases",
    "Extractions",
    "Fillings (except precious metals)",
    "Scaling",
    "Dental X-Rays",
    "Dental Prescriptions",
  ];

  // Inpatient breakdown will be rendered directly in the table

  // Outpatient breakdown
  const outpatientBreakdown = [
    { label: "Plan 1", key: "plan" },
    { label: "Benefit Cover", key: "limit" },
    { label: "ARV Drugs Payable", key: "premium" },
    { label: "General Medical Check-Ups", key: "premiumk" },
    { label: "Co-Payment", key: "premiumz" },
    { label: "KEPI & Baby friendly Regime Immunizations", key: "premiumk" },
    { label: "Pre - existing and/or chronic conditions (1 year waiting period)", key: "premium" },
    { label: "Pre-natal & Post-natal (1 year waiting period)", key: "premium" },
  ].map(row => ({
    benefit: row.label,
    limit: typeof plans[0][row.key as keyof typeof plans[0]] === "number"
      ? `${currencySymbols[currency]} ${(plans[0][row.key as keyof typeof plans[0]] as number * (exchangeRates[currency] || 1)).toLocaleString()}`
      : plans[0][row.key as keyof typeof plans[0]] as string
  }));

  // Dental breakdown
  const dentalBreakdown = categories.map(category => ({
    benefit: category,
    limit: category === "Benefit Cover" ? `${currencySymbols[currency]} ${(5000 * (exchangeRates[currency] || 1)).toLocaleString()}` : "Covered To Full Limit"
  }));

  // Optical breakdown
  const opticalBreakdown = [
    { label: "Benefit Cover", key: "limit" },
    { label: "Eyeglasses", key: "premium" },
    { label: "Routine Optical Consultations", key: "premium" },
    { label: "Optometrist Consultations & Eye Examinations", key: "premium" },
    { label: "Prescribed Lenses and Replacement of Lenses", key: "premium" },
    { label: "Optical Prescriptions", key: "premium" },
    { label: "Frames", key: "premium" },
  ].map(row => ({
    benefit: row.label,
    limit: row.label === "Benefit Cover"
      ? `${currencySymbols[currency]} ${(plansc[0].limit * (exchangeRates[currency] || 1)).toLocaleString()}`
      : plansc[0].premium
  }));

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
                <div className="overflow-x-auto bg-gray-50 rounded-xl shadow-md p-4">
                  <Table
                    removeWrapper
                    className="w-full"
                  >
                    <TableHeader>
                      <TableColumn className="bg-blue-600 text-white font-bold p-3 min-w-[200px]">
                        Benefit
                      </TableColumn>
                      <>
                        {plansd.map((plan, index) => (
                          <TableColumn
                            key={`plan-${index}`}
                            className="bg-blue-600 text-white font-bold text-center p-3"
                          >
                            {plan.name}
                          </TableColumn>
                        ))}
                      </>
                    </TableHeader>
                    <TableBody>
                      {headings.slice(0, 7).map((heading, rowIndex) => (
                        <TableRow
                          key={rowIndex}
                          className={`${rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}
                        >
                          <TableCell className="bg-blue-600 text-white font-bold p-3 min-w-[200px] border border-gray-300">
                            {heading}
                          </TableCell>
                          <>
                            {plansd.map((plan, colIndex) => {
                              const value = plan.values[rowIndex];
                              const isNumber = isNumeric(value);
                              return (
                                <TableCell
                                  key={`plan-cell-${rowIndex}-${colIndex}`}
                                  className="text-center p-3 border border-gray-200"
                                >
                                  {isNumber ? (
                                    <span className="text-green-600 font-semibold">
                                      {currencySymbols[currency]}{" "}
                                      <AnimatedNumber value={parseFloat(String(value)) * (exchangeRates[currency] || 1)} />
                                    </span>
                                  ) : (
                                    <span className="text-gray-700">{value}</span>
                                  )}
                                </TableCell>
                              );
                            })}
                          </>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Tab>
              <Tab key="premium" title="Premiums">
                <Table
                  removeWrapper
                  className={`rounded-2xl shadow-xl overflow-x-auto p-1 ${gradientClass}`}
                >
                  <TableHeader className="bg-transparent">
                    <TableColumn className="text-primary text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit Cover
                    </TableColumn>
                    <>
                      {familySizes.map((size, index) => (
                        <TableColumn key={`family-${index}`} className="text-primary text-center font-semibold">
                          {size}
                        </TableColumn>
                      ))}
                    </>
                  </TableHeader>
                  <TableBody>
                    {inpatientPlans.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.inpatient)) * (exchangeRates[currency] || 1)} />
                        </TableCell>
                        <>
                          {row.premiums.map((premium, i) => (
                            <TableCell key={`premium-${idx}-${i}`} className="text-white text-center font-bold">
                              {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(premium)) * (exchangeRates[currency] || 1)} />
                            </TableCell>
                          ))}
                        </>
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit Cover
                    </TableColumn>
                    <>
                      {familySizes.map((size, index) => (
                        <TableColumn key={`outpatient-family-${index}`} className="text-primary text-center font-semibold">
                          {size}
                        </TableColumn>
                      ))}
                    </>
                  </TableHeader>
                  <TableBody>
                    {outpatientPlans.map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.outpatient)) * (exchangeRates[currency] || 1)} />
                        </TableCell>
                        <>
                          {row.premiums.map((premium, i) => (
                            <TableCell key={`outpatient-premium-${idx}-${i}`} className="text-white text-center font-bold">
                              {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(premium)) * (exchangeRates[currency] || 1)} />
                            </TableCell>
                          ))}
                        </>
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit Cover
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Premium per Person
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {[
                      { plan: "Plan 1", limit: 5000, premium: 1210 },
                      { plan: "Plan 2", limit: 7500, premium: 1803 },
                      { plan: "Plan 3", limit: 10000, premium: 2408 }
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.limit)) * (exchangeRates[currency] || 1)} />
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.premium)) * (exchangeRates[currency] || 1)} />
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
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
                    <TableColumn className="text-primary text-center font-semibold">
                      Plan
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Benefit Cover
                    </TableColumn>
                    <TableColumn className="text-primary text-center font-semibold">
                      Premium per Person
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {[
                      { plan: "Plan 1", limit: 5000, premium: 1210 },
                      { plan: "Plan 2", limit: 7500, premium: 1803 },
                      { plan: "Plan 3", limit: 10000, premium: 2408 }
                    ].map((row, idx) => (
                      <TableRow key={idx}>
                        <TableCell className="text-white text-center">
                          {row.plan}
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.limit)) * (exchangeRates[currency] || 1)} />
                        </TableCell>
                        <TableCell className="text-white text-center font-bold">
                          {currencySymbols[currency]} <AnimatedNumber value={parseFloat(String(row.premium)) * (exchangeRates[currency] || 1)} />
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
