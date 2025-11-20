import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function RiderAccidentPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/bodaboda_welfare"
      ctaText="Enroll iBodaBoda Welfare Cover"
      description="Our Accident & Injury Cover protects BodaBoda riders against financial loss resulting from accidents, providing compensation for injuries and hospitalization."
      features={[
        "Accidental injury compensation",
        "Medical and hospital cash benefits",
        "Coverage for permanent disability",
        "Fast claims and emergency support",
        "Affordable individual and group options",
      ]}
      imageSrc="/images/product-photos/bodaboda-accident.png"
      subtitle="Safety Net for Riders on the Road"
      title="Accident & Injury Cover"
    />
  );
}
