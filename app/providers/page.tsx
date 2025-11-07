"use client";

import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  Spinner,
  Pagination,
  Select,
  SelectItem,
} from "@heroui/react";
import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle } from "lucide-react";

interface Provider {
  id: string;
  name: string;
  email: string;
  service: string;
  status: "Active" | "Pending" | "Suspended";
  joinedAt: string;
}

const mockProviders: Provider[] = [
  {
    id: "1",
    name: "SkyNet Healthcare",
    email: "contact@skynethealth.com",
    service: "Telemedicine",
    status: "Active",
    joinedAt: "2025-10-27",
  },
  {
    id: "2",
    name: "WellNest Diagnostics",
    email: "info@wellnestlabs.com",
    service: "Diagnostics",
    status: "Pending",
    joinedAt: "2025-10-28",
  },
  {
    id: "3",
    name: "PrimeCare Pharmacy",
    email: "support@primecarepharmacy.com",
    service: "Pharmacy",
    status: "Active",
    joinedAt: "2025-10-29",
  },
];

export default function ProvidersPage() {
  const [providers, setProviders] = useState<Provider[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  useEffect(() => {
    setTimeout(() => {
      const extended = Array.from({ length: 65 }, (_, i) => ({
        ...mockProviders[i % mockProviders.length],
        id: (i + 1).toString(),
        name: `Provider ${i + 1}`,
        email: `provider${i + 1}@mail.com`,
        joinedAt: `2025-10-${(i % 29) + 1}`,
      }));

      setProviders(extended);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const newProvider: Provider = {
        id: Math.random().toString(36).substring(2, 9),
        name: `Provider ${providers.length + 1}`,
        email: `new${providers.length + 1}@mail.com`,
        service: ["Diagnostics", "Pharmacy", "Telemedicine"][
          Math.floor(Math.random() * 3)
        ],
        status: ["Active", "Pending"][
          Math.floor(Math.random() * 2)
        ] as Provider["status"],
        joinedAt: new Date().toISOString().split("T")[0],
      };

      setProviders((prev) => [...prev, newProvider]);
    }, 7000);

    return () => clearInterval(interval);
  }, [providers]);

  const totalPages = Math.ceil(providers.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentProviders = providers.slice(
    startIndex,
    startIndex + rowsPerPage,
  );

  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="relative p-6 min-h-screen overflow-hidden"
      initial={{ opacity: 0 }}
    >
      {/* 🔹 Background image with overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: "url('/images/backdrop1.jpg')",
          filter: "brightness(0.6)",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-white/80 via-gray-100/80 to-gray-200/70 backdrop-blur-sm z-0" />

      {/* 🔹 Foreground content */}
      <div className="relative z-10">
        <Card
          className="max-w-7xl mx-auto shadow-2xl border border-gray-200 bg-white/90 backdrop-blur-xl"
          radius="lg"
        >
          <CardHeader className="flex justify-between items-center px-6 py-4 border-b border-gray-200">
            <h1 className="text-2xl font-bold text-primary">
              Onboarded Providers
            </h1>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <CheckCircle className="text-primary" size={20} />
              Live auto-update enabled
            </div>
          </CardHeader>

          <CardBody>
            {loading ? (
              <div className="flex justify-center py-20">
                <Spinner color="primary" label="Loading providers..." />
              </div>
            ) : (
              <>
                <Table
                  aria-label="Providers list"
                  classNames={{
                    wrapper: "bg-transparent text-gray-900",
                    th: "bg-primary/10 text-primary uppercase tracking-wide",
                    td: "text-sm text-gray-700 border-b border-gray-200",
                  }}
                >
                  <TableHeader>
                    <TableColumn>#</TableColumn>
                    <TableColumn>NAME</TableColumn>
                    <TableColumn>EMAIL</TableColumn>
                    <TableColumn>SERVICE</TableColumn>
                    <TableColumn>STATUS</TableColumn>
                    <TableColumn>JOINED</TableColumn>
                  </TableHeader>
                  <TableBody>
                    {currentProviders.map((p, idx) => (
                      <TableRow
                        key={p.id}
                        className="hover:bg-primary/5 transition-all duration-200 cursor-pointer"
                      >
                        <TableCell className="font-semibold">
                          {startIndex + idx + 1}
                        </TableCell>
                        <TableCell className="font-semibold">
                          {p.name}
                        </TableCell>
                        <TableCell>{p.email}</TableCell>
                        <TableCell>{p.service}</TableCell>
                        <TableCell>
                          <Chip
                            color={
                              p.status === "Active"
                                ? "success"
                                : p.status === "Pending"
                                  ? "warning"
                                  : "danger"
                            }
                            startContent={
                              p.status === "Active" ? (
                                <CheckCircle size={16} />
                              ) : (
                                <AlertTriangle size={16} />
                              )
                            }
                            variant="flat"
                          >
                            {p.status}
                          </Chip>
                        </TableCell>
                        <TableCell>{p.joinedAt}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                {/* Pagination controls */}
                <div className="flex justify-between items-center mt-6 px-4">
                  <div className="flex items-center justify-between mt-4">
                    <div className="text-sm text-gray-500">
                      Showing{" "}
                      <span className="font-semibold text-gray-800">
                        {Math.min(
                          (page - 1) * rowsPerPage + 1,
                          providers.length,
                        )}
                      </span>{" "}
                      –{" "}
                      <span className="font-semibold text-gray-800">
                        {Math.min(page * rowsPerPage, providers.length)}
                      </span>{" "}
                      of{" "}
                      <span className="font-semibold text-gray-800">
                        {providers.length}
                      </span>{" "}
                      providers
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="text-sm text-gray-600">
                        Rows per page:
                      </span>
                      <Select
                        aria-label="Rows per page"
                        className="w-[80px] text-black"
                        selectedKeys={[rowsPerPage.toString()]}
                        size="sm"
                        onChange={(e) => setRowsPerPage(Number(e.target.value))}
                      >
                        {[15, 30, 50, 100].map((n) => (
                          <SelectItem key={n}>{n}</SelectItem>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <Pagination
                    showControls
                    className="text-white"
                    color="primary"
                    page={currentPage}
                    total={totalPages}
                    onChange={setCurrentPage}
                  />
                </div>
              </>
            )}
          </CardBody>
        </Card>
      </div>
    </motion.div>
  );
}
