import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function EquipmentProtectionPage() {
  return (
    <ServicePageTemplate
      ctaHref="/contact"
      ctaText="Protect Your Equipment"
      description="Protect your fishing equipment against loss, theft, or damage with our Fishing Equipment Protection plan, giving you financial coverage and peace of mind."
      features={[
        "Coverage for fishing gear and equipment",
        "Protection against theft, loss, or damage",
        "Quick claims and repair support",
        "Customizable coverage options",
        "Ideal for individuals and commercial fleets",
      ]}
      imageSrc="/images/aquabima-equipment.jpg"
      subtitle="Secure Your Tools & Gear"
      title="Fishing Equipment Protection"
    />
  );
}
