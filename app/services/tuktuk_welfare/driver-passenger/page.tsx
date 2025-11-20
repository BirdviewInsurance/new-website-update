import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function TukTukDriverPassengerPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/tuktuk_welfare"
      ctaText="Get TukTuk Welfare Cover"
      description="Our TukTuk Welfare plan provides comprehensive coverage for both drivers and passengers, ensuring safety and financial protection in case of accidents or injuries."
      features={[
        "Accident and injury coverage for drivers and passengers",
        "Medical support during emergencies",
        "Fast claims and assistance",
        "Affordable premiums for individuals and fleets",
        "Optional add-ons for extended benefits",
      ]}
      imageSrc="/images/product-photos/tuktuk-driver-passenger.png"
      subtitle="Comprehensive & Third Party Coverage for TukTuks"
      title="TukTuk Welfare Cover"
    />
  );
}
