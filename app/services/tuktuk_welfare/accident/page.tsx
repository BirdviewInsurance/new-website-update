import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function TukTukAccidentPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Get Accident & Property Cover"
      description="Protect your TukTuk and its passengers with coverage for accidents and property damage, reducing financial risks while ensuring quick recovery from incidents."
      features={[
        "Vehicle and asset protection",
        "Accident and injury coverage",
        "Emergency response assistance",
        "Quick claims processing",
        "Individual and corporate fleet plans",
      ]}
      imageSrc="/images/tuktuk-accident.jpg"
      subtitle="Coverage for Accidents and TukTuk Assets"
      title="Accident & Property Damage"
    />
  );
}
