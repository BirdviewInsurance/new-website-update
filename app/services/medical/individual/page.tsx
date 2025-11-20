import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function IndividualMedicalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/medical"
      ctaText="Get Your Medical Plan"
      description="Our Individual Medical Plans provide comprehensive health insurance, giving you access to quality healthcare and financial protection for medical emergencies."
      features={[
        "Coverage for hospitalization and outpatient care",
        "Access to a wide network of hospitals and clinics",
        "Specialist consultations and diagnostic tests",
        "Flexible premiums and coverage options",
        "24/7 customer support and medical assistance",
      ]}
      imageSrc="/images/product-photos/medical-individual.jpg"
      subtitle="Tailored Health Coverage for Individuals"
      title="Individual Medical Plans"
    />
  );
}
