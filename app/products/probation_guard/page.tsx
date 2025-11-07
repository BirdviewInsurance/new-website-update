"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

// HeroUI components
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalFooter,
  useDisclosure,
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

import AnimatedNumber from "../../../components/AnimateNumber";

const ProbationGuard: React.FC = () => {
  const [currency, setCurrency] = useState<string>("KES");
  const [exchangeRates, setExchangeRates] = useState<{ [key: string]: number }>(
    {},
  );
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    request: "",
  });
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currencySymbols: { [key: string]: string } = {
    USD: "$",
    KES: "KSh",
    EUR: "€",
    GBP: "£",
  };

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

  const convertValue = (amount: number) => {
    const rate = exchangeRates[currency] || 1;

    return Number(amount) * rate;
  };

  const handleSubmit = () => {
    console.log("Form submitted:", form);
    onClose();
  };

  return (
    <section className="relative bg-gradient-to-br from-gray-50 via-white to-gray-100 py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Intro Section */}
        <motion.div
          className="text-center max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 40 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-5xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-primary to-danger bg-clip-text text-transparent">
            Probation Guard
          </h2>
          <p className="mt-6 text-lg md:text-xl text-gray-700 leading-relaxed">
            Our{" "}
            <span className="font-semibold text-primary">Probation Guard</span>{" "}
            is an enhancement to our{" "}
            <span className="font-semibold">
              Evacuation & Repatriation Cover
            </span>
            , designed exclusively for{" "}
            <span className="text-danger font-semibold">
              labour recruitment agents and candidates
            </span>
            . It provides unmatched protection, value, and trust — ensuring
            candidates and agents remain covered when it matters most.
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

        {/* Pricing + Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
          {/* Pricing */}
          <motion.div
            className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-primary to-danger p-1"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white rounded-2xl">
              <CardBody>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Premium Overview
                </h3>
                <Table removeWrapper aria-label="Probation Guard Pricing">
                  <TableHeader>
                    <TableColumn className="text-center text-white font-semibold bg-gradient-to-r from-primary to-danger">
                      Component
                    </TableColumn>
                    <TableColumn className="text-center text-white font-semibold bg-gradient-to-r from-primary to-danger">
                      Limit
                    </TableColumn>
                    <TableColumn className="text-center text-white font-semibold bg-gradient-to-r from-primary to-danger">
                      Premium
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        component: "Probation Guard",
                        limit: 150000,
                        premium: 11500,
                      },
                      {
                        component: "Evacuation & Repatriation (E&R)",
                        limit: 100000,
                        premium: 3500,
                      },
                      {
                        component: "Total per candidate",
                        limit: 0,
                        premium: 15000,
                      },
                    ].map((row, idx) => (
                      <TableRow key={idx} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium text-gray-800">
                          {row.component}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-primary">
                          {row.limit > 0 ? (
                            <AnimatedNumber
                              prefix={currencySymbols[currency]}
                              value={convertValue(row.limit)}
                            />
                          ) : (
                            "-"
                          )}
                        </TableCell>
                        <TableCell className="text-center font-bold text-danger">
                          <AnimatedNumber
                            prefix={currencySymbols[currency]}
                            value={convertValue(row.premium)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </motion.div>

          {/* Sub-benefits */}
          <motion.div
            className="rounded-2xl shadow-xl overflow-hidden bg-gradient-to-r from-primary to-danger p-1"
            initial={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            whileInView={{ opacity: 1, y: 0 }}
          >
            <Card className="bg-white rounded-2xl">
              <CardBody>
                <h3 className="text-2xl font-bold text-center text-gray-800 mb-4">
                  Sub-benefits
                </h3>
                <Table removeWrapper aria-label="Probation Guard Sub-benefits">
                  <TableHeader>
                    <TableColumn className="text-center text-white font-semibold bg-gradient-to-r from-primary to-danger">
                      Sub-benefit
                    </TableColumn>
                    <TableColumn className="text-center text-white font-semibold bg-gradient-to-r from-primary to-danger">
                      Limit
                    </TableColumn>
                  </TableHeader>
                  <TableBody>
                    {[
                      {
                        sub: "Returning ticket for exiting candidate",
                        limit: 55000,
                      },
                      { sub: "Training cost for new candidate", limit: 10000 },
                      {
                        sub: "Passport issuance for new candidate",
                        limit: 15000,
                      },
                      { sub: "Medical checks", limit: 15000 },
                      { sub: "Visa processing costs", limit: 2500 },
                      { sub: "Air ticket for new candidate", limit: 55000 },
                    ].map((row, idx) => (
                      <TableRow key={idx} className="hover:bg-gray-50">
                        <TableCell className="text-center font-medium text-gray-800">
                          {row.sub}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-primary">
                          <AnimatedNumber
                            prefix={currencySymbols[currency]}
                            value={convertValue(row.limit)}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardBody>
            </Card>
          </motion.div>
        </div>

        {/* CTA Section */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          whileInView={{ opacity: 1, scale: 1 }}
        >
          <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-6">
            Ready to safeguard your candidates and agents?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            With{" "}
            <span className="text-primary font-semibold">Probation Guard</span>,
            you’re not only protecting candidates but also strengthening your
            brand’s reputation as a trusted recruitment partner.
          </p>
          <Button
            className="bg-gradient-to-r from-primary to-danger text-white font-semibold px-10 py-6 rounded-xl shadow-lg hover:scale-105 transition-transform"
            size="lg"
            startContent={<ShieldCheckIcon className="h-6 w-6" />}
            onClick={onOpen}
          >
            Protect with Probation Guard
          </Button>
        </motion.div>

        {/* Modal Form */}
        <Modal backdrop="blur" isOpen={isOpen} size="lg" onClose={onClose}>
          <ModalContent>
            <ModalHeader className="text-xl font-bold">
              Submit Your Request
            </ModalHeader>
            <ModalBody>
              <Input
                label="Full Name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <Input
                label="Email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <Input
                label="Phone"
                name="phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
              />
              <Textarea
                label="Request Details"
                name="request"
                value={form.request}
                onChange={(e) => setForm({ ...form, request: e.target.value })}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="light" onClick={onClose}>
                Cancel
              </Button>
              <Button color="danger" onClick={handleSubmit}>
                Submit
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </div>
    </section>
  );
};

export default ProbationGuard;
