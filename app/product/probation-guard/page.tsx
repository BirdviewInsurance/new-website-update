import React from "react";
import ProductTemplate from "../components/ProductTemplate";

export default function Page() {
    return (
        <ProductTemplate
            title="Probation Guard"
            heroKicker="Supervised Protection"
            heroTagline="A safeguard solution providing monitoring, legal assistance and limited liability cover for people on probation and related services."
            heroImage="/images/probation-guard.jpg"
            overview={{
                heading: "Specialised support for probation-related needs",
                paragraphs: [
                    "Probation Guard blends legal assistance, bail support and specific liability cover where appropriate. Ideal for individuals and organisations that support probationers during rehabilitation.",
                ],
            }}
            benefits={[
                { title: "Legal assistance", desc: "Access to a legal advisory panel for covered events." },
                { title: "Supervision support", desc: "Coordination with approved supervision providers." },
                { title: "Liability cover", desc: "Selected liability cover for third-party incidents where applicable." },
            ]}
            coverages={[
                { heading: "Scope", paragraphs: ["Legal advisory services, limited bail support and counselling referrals; cover limits defined in the policy schedule."] },
            ]}
            eligibility={{
                heading: "Applies to",
                paragraphs: ["Individuals under supervised programs and organisations managing rehabilitation programs."],
            }}
            claims={{
                heading: "How it works",
                paragraphs: ["Notify our legal team for eligible incidents. Documentation required includes court notices and supervision reports."],
            }}
            faqs={[
                { q: "Is bail guaranteed?", a: "Bail support is discretionary and subject to policy limits and underwriting." },
            ]}
            cta={{ label: "Speak with a Specialist", href: "/Contact/legal-support" }}
            ctaSecondary={{ label: "Request a Quote", href: "/Products/probation-guard/quote" }}
        />
    );
}
