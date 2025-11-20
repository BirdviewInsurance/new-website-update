import React from "react";

import { ServicePageTemplate } from "@/components/ServicePageTemplate";

export default function FamilyMedicalPage() {
  return (
    <ServicePageTemplate
      ctaHref="/products/medical"
      ctaText="Protect Your Family"
      description="Ensure your entire family receives top-notch medical care with our Family Medical Cover. Flexible plans cater to families of all sizes, offering financial security and peace of mind."
      features={[
        "Coverage for children, spouses, and dependents",
        "Preventive care and wellness programs",
        "Access to specialized healthcare providers",
        "Affordable family premiums",
        "Dedicated claims support for families",
      ]}
      imageSrc="/images/product-photos/medical-family.jpg"
      subtitle="Comprehensive Health Protection for Your Loved Ones"
      title="Family Medical Cover"
    />
  );
}
