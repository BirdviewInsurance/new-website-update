import React from "react";
import ProductTemplate from "../components/ProductTemplate";
import { Stethoscope } from "lucide-react";

export default function Page() {
    return (
        <ProductTemplate
            title="Medical Insurance"
            heroKicker="Comprehensive Care"
            heroTagline="Personal, family and corporate medical plans with an extensive provider network and flexible benefits."
            heroImage="/images/medical-insurance-hero.jpg"
            overview={{
                heading: "Healthcare coverage built around your life",
                paragraphs: [
                    "From routine consultations to major surgeries, our medical insurance plans cover essential and advanced medical needs with cashless hospitalisation at partner hospitals.",
                    "Choose between individual, family and corporate packages with add-ons for maternity, dental and optical.",
                ],
            }}
            benefits={[
                { title: "Large Hospital Network", desc: "Cashless treatment across partner hospitals countrywide.", icon: <Stethoscope /> },
                { title: "Flexible Plans", desc: "Multiple tiers to match budgets and health needs." },
                { title: "Chronic Care Management", desc: "Support programs for diabetes, hypertension and other long-term conditions." },
            ]}
            coverages={[
                {
                    heading: "In-patient cover",
                    paragraphs: ["Hospitalisation, theatre, ICU and post-surgery care."],
                    bullets: ["Room & board", "Surgical fees", "Medication & consumables"],
                },
                {
                    heading: "Out-patient options",
                    paragraphs: ["Out-patient consultations, diagnostics and selected therapies available on selected plans."],
                },
            ]}
            eligibility={{
                heading: "Entry requirements",
                paragraphs: ["Standard underwriting applies. Waiting periods may apply for certain conditions, maternity and optical/dental benefits."],
            }}
            claims={{
                heading: "Claims & reimbursements",
                paragraphs: ["Cashless claims at network hospitals. Reimbursement available for private providers with supporting invoices."],
            }}
            faqs={[
                { q: "Are pre-existing conditions covered?", a: "Some conditions may be covered after a waiting period — check your policy wording." },
            ]}
            cta={{ label: "Request a Quote", href: "/Products/medical-insurance/quote" }}
            ctaSecondary={{ label: "Find Hospitals", href: "/Products/medical-insurance/hospitals" }}
            crossSell={[{ title: "Hospital Cash", href: "/Products/hospital-cash", desc: "Daily benefit for hospital stays." }]}
        />
    );
}
