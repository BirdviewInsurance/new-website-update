import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function RiderMedicalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/bodaboda_welfare"
      ctaText="Get Rider Medical Cover"
      description="Our Rider Medical Cover provides essential medical insurance to BodaBoda riders, ensuring access to quality healthcare and financial protection in case of injuries or illnesses."
      features={[
        "Hospitalization and outpatient coverage",
        "Emergency medical support",
        "Flexible affordable premiums",
        "Support for minor and major injuries",
        "Fast claim processing for riders",
      ]}
      imageSrc="/images/product-photos/bodaboda-medical.jpg"
      subtitle="Healthcare Protection for BodaBoda Riders"
      title="Rider Medical Cover"
    />
  );
}
