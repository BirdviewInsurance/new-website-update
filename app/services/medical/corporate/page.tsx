import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function CorporateMedicalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/medical"
      ctaText="Enroll Your Employees"
      description="Provide your employees with comprehensive health benefits through our Corporate & SME Medical Plans, designed to boost productivity and safeguard workforce wellness."
      features={[
        "Tailored plans for SMEs and large corporations",
        "Employee wellness and preventive programs",
        "Flexible coverage options and network hospitals",
        "Simplified claims management for HR teams",
        "24/7 dedicated corporate support",
      ]}
      imageSrc="/Events/SLVA8028.jpg"
      subtitle="Health Insurance for Businesses and Employees"
      title="Corporate & SME Plans"
    />
  );
}
