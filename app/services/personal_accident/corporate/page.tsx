import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function CorporateAccidentPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Enroll Your Employees"
      description="Provide your workforce with comprehensive accident protection. Our Corporate Accident Cover safeguards employees and enhances corporate responsibility and morale."
      features={[
        "Coverage for all employees",
        "Accidental death and disability protection",
        "Hospitalization and emergency support",
        "Customizable corporate packages",
        "Dedicated account and claims management",
      ]}
      imageSrc="/images/accident-corporate.jpg"
      subtitle="Employee Safety and Welfare"
      title="Corporate Accident Cover"
    />
  );
}
