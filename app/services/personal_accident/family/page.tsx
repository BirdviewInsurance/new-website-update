import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function FamilyAccidentPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/personal_accident"
      ctaText="Protect Your Family"
      description="Protect your entire family against accidents with our Family Accident Cover. Enjoy peace of mind knowing that your dependents are financially secure in case of emergencies."
      features={[
        "Coverage for spouse and children",
        "Accidental death and disability benefits",
        "Emergency medical and hospitalization support",
        "Flexible premium options",
        "Quick claim settlement and family assistance",
      ]}
      imageSrc="/images/product-photos/accident-family.jpg"
      subtitle="Comprehensive Protection for Your Loved Ones"
      title="Family Accident Cover"
    />
  );
}
