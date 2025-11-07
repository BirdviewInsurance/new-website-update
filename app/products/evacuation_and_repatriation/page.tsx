"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Button,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Card,
  CardBody,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Chip,
} from "@heroui/react";
import {
  Eye,
  Shield,
  HeartHandshake,
  Globe,
  Clock,
  Award,
  Users,
} from "lucide-react";

import AnimatedNumber from "../../../components/AnimateNumber";

const EvacAndRepatriation = () => {
  const [currency, setCurrency] = useState("KES");
  const [exchangeRates, setExchangeRates] = useState<Record<string, number>>(
    {},
  );
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const currencySymbols: Record<string, string> = {
    USD: "$",
    KES: "KSh",
    EUR: "€",
    GBP: "£",
  };

  const insurancePlans = [
    { plan: "Plan 1", limit: 100000, premium: 3500 },
    { plan: "Plan 2", limit: 200000, premium: 7000 },
    { plan: "Plan 3", limit: 300000, premium: 10500 },
    { plan: "Plan 4", limit: 500000, premium: 14400 },
  ];

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(
          "https://snownet-customer-quotation-server.onrender.com/api/underwriting/quotation/onlineQuotation/products/exchangeRate/",
        );
        const ratesMap: Record<string, number> = {};
        const data = (response.data as any)?.data || [];

        for (let item of data) {
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

  const handleOpenDialog = (plan: any) => {
    setSelectedPlan(plan);
    onOpen();
  };

  const handleClickEvacAndRepatriation = () => {
    window.location.href = "https://quote.birdviewinsurance.com/?ProductID=1";
  };

  return (
    <div className="relative bg-gradient-to-br from-blue-50 via-white to-red-50 py-16 px-4">
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Intro */}
        <div className="text-center space-y-4">
          <Chip
            className="uppercase tracking-wide font-semibold"
            color="danger"
            size="lg"
            variant="flat"
          >
            Evacuation & Repatriation Cover
          </Chip>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900">
            Protection <span className="text-blue-600">When Abroad</span>,
            <br /> Peace of Mind <span className="text-red-600">Back Home</span>
          </h1>
          <p className="max-w-3xl mx-auto text-lg text-gray-600">
            Whether it’s a sudden emergency or the need to bring loved ones
            home, our global evacuation and repatriation solutions ensure you’re
            never stranded. Trusted by families, businesses, and communities
            worldwide.
          </p>
        </div>

        {/* Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: <Globe className="w-10 h-10 text-blue-600" />,
              title: "Worldwide Reach",
              desc: "Access to a global evacuation and medical network.",
            },
            {
              icon: <Clock className="w-10 h-10 text-red-600" />,
              title: "24/7 Assistance",
              desc: "Emergency response teams always ready to act fast.",
            },
            {
              icon: <HeartHandshake className="w-10 h-10 text-blue-600" />,
              title: "Trusted Partner",
              desc: "20+ years of experience supporting families abroad.",
            },
          ].map((b, idx) => (
            <Card
              key={idx}
              className="bg-white/80 backdrop-blur-md border border-gray-100 hover:shadow-xl transition"
              shadow="sm"
            >
              <CardBody className="flex flex-col items-center text-center space-y-3">
                {b.icon}
                <h3 className="text-lg font-semibold text-gray-900">
                  {b.title}
                </h3>
                <p className="text-gray-600">{b.desc}</p>
              </CardBody>
            </Card>
          ))}
        </div>

        {/* Pricing */}
        <div className="bg-gradient-to-r from-blue-600 to-red-600 rounded-3xl shadow-2xl p-8 md:p-12">
          {/* Currency Selector - Premium Corporate Style */}
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

          {/* Desktop Table */}
          <div className="hidden md:block">
            <Table
              isStriped
              removeWrapper
              aria-label="Pricing Table"
              classNames={{
                th: "bg-white/10 text-white text-center font-semibold",
                td: "text-center font-bold text-white",
              }}
            >
              <TableHeader>
                <TableColumn>Plan</TableColumn>
                <TableColumn>Benefit Cover</TableColumn>
                <TableColumn>Premium</TableColumn>
              </TableHeader>
              <TableBody>
                {insurancePlans.map((plan, idx) => (
                  <TableRow
                    key={idx}
                    className="cursor-pointer hover:bg-white/20 transition"
                    onClick={() => handleOpenDialog(plan)}
                  >
                    <TableCell>
                      <Button
                        className="font-semibold text-white"
                        color="primary"
                        endContent={<Eye size={16} />}
                        radius="sm"
                        size="sm"
                      >
                        {plan.plan}
                      </Button>
                    </TableCell>
                    <TableCell>
                      <AnimatedNumber
                        prefix={currencySymbols[currency]}
                        value={
                          Number(plan.limit) * (exchangeRates[currency] || 1)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      <AnimatedNumber
                        prefix={currencySymbols[currency]}
                        value={
                          Number(plan.premium) * (exchangeRates[currency] || 1)
                        }
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Mobile Cards */}
          <div className="grid gap-4 md:hidden mt-6">
            {insurancePlans.map((plan, idx) => (
              <Card
                key={idx}
                className="bg-white/90 border border-gray-200 cursor-pointer hover:shadow-lg"
                shadow="sm"
                onClick={() => handleOpenDialog(plan)}
              >
                <CardBody className="space-y-2">
                  <h3 className="text-lg font-semibold">{plan.plan}</h3>
                  <p className="text-blue-600">
                    Cover:{" "}
                    <AnimatedNumber
                      prefix={currencySymbols[currency]}
                      value={
                        Number(plan.limit) * (exchangeRates[currency] || 1)
                      }
                    />
                  </p>
                  <p className="text-red-600">
                    Premium:{" "}
                    <AnimatedNumber
                      prefix={currencySymbols[currency]}
                      value={
                        Number(plan.premium) * (exchangeRates[currency] || 1)
                      }
                    />
                  </p>
                </CardBody>
              </Card>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="flex flex-wrap justify-center gap-6 mt-12">
          <div className="flex items-center gap-2">
            <Award className="text-blue-600 w-6 h-6" />
            <span className="font-medium text-gray-700">
              ISO 9001 Certified
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="text-red-600 w-6 h-6" />
            <span className="font-medium text-gray-700">
              Trusted by 10,000+ Customers
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="text-blue-600 w-6 h-6" />
            <span className="font-medium text-gray-700">
              Secure & Transparent
            </span>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center space-y-4 mt-12">
          <p className="text-lg font-medium text-gray-700">
            Ready to secure your family’s peace of mind?
          </p>
          <Button
            className="font-bold shadow-xl px-8 py-6 text-lg text-white"
            color="danger"
            endContent={<Shield size={22} />}
            radius="full"
            size="lg"
            onClick={handleClickEvacAndRepatriation}
          >
            Get a Quote
          </Button>
        </div>
      </div>

      {/* Modal */}
      <Modal backdrop="blur" isOpen={isOpen} size="lg" onClose={onClose}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="bg-blue-700 text-white">
                {selectedPlan?.plan} Details
              </ModalHeader>
              <ModalBody>
                {selectedPlan &&
                  Object.entries(selectedPlan).map(
                    ([key, value]) =>
                      key !== "plan" && (
                        <div
                          key={key}
                          className="flex justify-between py-2 border-b border-gray-200 text-sm"
                        >
                          <span className="font-medium capitalize text-gray-700">
                            {key}
                          </span>
                          <span className="text-gray-900">
                            <AnimatedNumber
                              prefix={currencySymbols[currency]}
                              value={
                                Number(value) * (exchangeRates[currency] || 1)
                              }
                            />
                          </span>
                        </div>
                      ),
                  )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default EvacAndRepatriation;
