import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function TukTukMedicalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Enroll in Medical & Last Expense"
      description="Our Medical & Last Expense plan ensures drivers have access to medical care and financial support for last expenses, offering peace of mind for operators and their families."
      features={[
        "Hospitalization and medical coverage",
        "Funeral and last expense support",
        "Fast claims and 24/7 assistance",
        "Affordable individual and group plans",
        "Flexible coverage tailored to TukTuk operators",
      ]}
      imageSrc="/images/tuktuk-medical.jpg"
      subtitle="Comprehensive Welfare for TukTuk Operators"
      title="Medical & Last Expense"
    />
  );
}
