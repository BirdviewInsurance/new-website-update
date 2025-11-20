import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function AirAmbulancePage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/evacuation_and_repatriation"
      ctaText="Book Air Ambulance"
      description="Our air ambulance service delivers immediate, safe, and medically equipped transport for critical emergencies, ensuring patients receive care en route to specialized facilities."
      features={[
        "Fully equipped aircraft with ICU facilities",
        "Certified medical team onboard",
        "Rapid deployment anywhere in the world",
        "Customized patient care protocols",
        "Seamless coordination with hospitals and emergency centers",
      ]}
      imageSrc="/images/product-photos/evacuation-air-ambulance.jpg"
      subtitle="Advanced Life-Saving Air Transport"
      title="Air Ambulance Support"
    />
  );
}
