import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function EmergencyEvacuationPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Request Emergency Evacuation"
      description="Our Emergency Medical Evacuation service ensures critical medical emergencies are handled swiftly, transporting you or your loved ones to the nearest medical facility with utmost care."
      features={[
        "24/7 emergency hotline and dispatch",
        "Global network of medical partners",
        "Advanced air and ground transportation",
        "Expert medical personnel onboard",
        "Customizable evacuation plans for individuals & corporate clients",
      ]}
      imageSrc="/images/evacuation-emergency.jpg"
      subtitle="Rapid Response, Global Coverage"
      title="Emergency Medical Evacuation"
    />
  );
}
