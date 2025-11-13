import { Metadata } from "next";

export interface SEOParams {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

const siteDefaults = {
  name: "Birdview Microinsurance",
  url: "https://birdviewmicroinsurance.com",
  description:
    "Exceeding your expectations with affordable, reliable, and accessible microinsurance solutions tailored for every Kenyan.",
  image: "/images/og-image.jpg",
  twitter: "@BirdviewInsur",
};

export function generateSEO({
  title,
  description,
  keywords,
  image,
  url,
}: SEOParams): Metadata {
  const pageTitle = title
    ? `${title} | ${siteDefaults.name}`
    : siteDefaults.name;

  const pageDescription = description || siteDefaults.description;
  const pageImage = image || siteDefaults.image;
  const pageUrl = url || siteDefaults.url;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || [
      "insurance",
      "microinsurance",
      "Kenya",
      "medical cover",
      "Birdview",
      "accident",
      "Birdview Microinsurance", 
      "Birdview Kenya",
      "Birdview", 
      "Bird view",
      "Insurance",
      "Insurance",
      "Birdview Microinsurance", 
      "Insurance in Kenya"  , 
      "Affordable Insurance Kenya"  , 
      "Comprehensive Insurance Solutions"  , 
      "Diaspora Insurance Solutions"  , 
      "Insurance for Kenyans"  , 
      "Reliable Coverage"  , 
      "Health Insurance Kenya"  , 
      "Life Insurance Kenya"    , 
      "Affordable Health Coverage"  , 
      "Kenyans in the Diaspora"  , 
      "Insurance Plans for Kenyans"  , 
      "Insurance Products"  , 
      "Birdview Coverage"  , 
      "Birdview Policies"  , 
      "Birdview Microinsurance Solutions"  , 
      "Insurance for Kenyans Abroad"  , 
      "Affordable Diaspora Insurance"  , 
      "Local Insurance Solutions"  , 
      "Kenyans Insurance Options"
    ],
    openGraph: {
      title: pageTitle,
      description: pageDescription,
      url: pageUrl,
      siteName: siteDefaults.name,
      images: [
        {
          url: pageImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description: pageDescription,
      images: [pageImage],
      creator: siteDefaults.twitter,
    },
  };
}
