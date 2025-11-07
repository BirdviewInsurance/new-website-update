"use client";

import { motion } from "framer-motion";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Button } from "@heroui/button";
import { FileDown } from "lucide-react";

export default function DownloadFormsPage() {
  const forms = [
    {
      name: "Claim Submission Form",
      desc: "Use this form to file a new claim under any of your active policies.",
      file: "/forms/claim_submission.pdf",
    },
    {
      name: "Accident Report Form",
      desc: "For accidents or incidents requiring detailed reporting and verification.",
      file: "/forms/accident_report.pdf",
    },
    {
      name: "Medical Reimbursement Form",
      desc: "Submit for medical-related reimbursements under your coverage.",
      file: "/forms/medical_reimbursement.pdf",
    },
  ];

  return (
    <section className="min-h-screen bg-background text-foreground">
      {/* Hero */}
      <div className="relative h-[40vh] bg-gradient-to-r from-blue-600 via-blue-700 to-red-600 text-white flex items-center justify-center">
        <div className="absolute inset-0 bg-black/40" />
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center px-6"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-5xl font-semibold mb-3">Download Forms</h1>
          <p className="text-lg text-gray-200 max-w-2xl mx-auto">
            Access official claim and policy forms for quick submission.
          </p>
        </motion.div>
      </div>

      {/* Forms */}
      <motion.div
        animate={{ opacity: 1 }}
        className="max-w-6xl mx-auto px-6 py-20"
        initial={{ opacity: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="grid md:grid-cols-3 gap-8">
          {forms.map((form, i) => (
            <Card
              key={i}
              className="rounded-2xl border border-default-200 bg-white/70 backdrop-blur-sm shadow-sm hover:shadow-md transition"
            >
              <CardBody>
                <h2 className="text-xl font-semibold mb-2 text-primary">
                  {form.name}
                </h2>
                <p className="text-default-600">{form.desc}</p>
              </CardBody>
              <CardFooter>
                <Button
                  download
                  as="a"
                  className="
                                  text-white 
                                    font-semibold 
                                    shadow-md 
                                    transition-all 
                                    duration-300 
                                    ease-out 
                                    hover:scale-[1.03] 
                                    hover:shadow-[0_8px_20px_rgba(255,0,0,0.25)]
                                    hover:bg-gradient-to-r 
                                    hover:from-danger-600 
                                    hover:to-danger-500
                                    active:scale-[0.98]
                                "
                  color="danger"
                  href={form.file}
                  startContent={<FileDown className="w-4 h-4" />}
                  variant="solid"
                >
                  Download PDF
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
