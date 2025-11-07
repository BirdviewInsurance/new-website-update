"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { motion, AnimatePresence } from "framer-motion";

import CategoryBar from "./CategoryBar";

const posts = [
  {
    title: "Hospital Cash Insurance in Kenya: How It Works & Why You Need It",
    excerpt:
      "Hospital cash insurance cushions families during unexpected hospital stays, offering affordable protection when most needed.",
    date: "Sep 1, 2025",
    image: "/images/blog-hospital-cash.jpg",
    slug: "hospital-cash-insurance-kenya-how-it-works-why-you-need-it",
    category: "Insurance",
  },
  {
    title: "Last Expense Insurance in Kenya: A Complete Guide for Families",
    excerpt:
      "Funeral costs can overwhelm grieving families. Learn how last expense insurance provides dignity, preparedness, and financial relief.",
    date: "Sep 3, 2025",
    image: "/images/blog-last-expense.jpg",
    slug: "last-expense-insurance-kenya-complete-guide-families",
    category: "Insurance",
  },
  {
    title:
      "Group Medical Insurance for SMEs in Kenya: Costs, Benefits & How It Works",
    excerpt:
      "SMEs power Kenya’s economy. Group medical insurance helps attract and retain talent while keeping costs manageable.",
    date: "Sep 5, 2025",
    image: "/images/blog-sme-medical.jpg",
    slug: "group-medical-insurance-smes-kenya-costs-benefits",
    category: "Insurance",
  },
  {
    title:
      "How Medical Evacuation & Repatriation Insurance Saves Kenyan Families (And Why It’s Becoming Essential)",
    excerpt:
      "Emergencies strike without warning. Medical evacuation and repatriation insurance ensures safety and dignity anywhere in the world.",
    date: "Sep 7, 2025",
    image: "/images/blog-evacuation.jpg",
    slug: "medical-evacuation-repatriation-insurance-kenya-essential",
    category: "Insurance",
  },
  {
    title: "Birdview Brings the Vibe: Chill & Vybz Mombasa Edition",
    excerpt:
      "Birdview Insurance joined Chill & Vybz Season 4 as proud sponsors, celebrating culture, music, and togetherness in Mombasa.",
    date: "Sep 10, 2025",
    image: "/images/blog-chillvybz.jpg",
    slug: "birdview-brings-vibe-chill-vybz-mombasa-edition",
    category: "Events",
  },
  {
    title:
      "Birdview at the Kenya-UK Investment Mission 2025: Championing Diaspora Protection Alongside Progress",
    excerpt:
      "At the Kenya-UK Investment Mission, Birdview highlighted its role in protecting diaspora families navigating life abroad.",
    date: "Sep 12, 2025",
    image: "/images/blog-uk-mission.jpg",
    slug: "birdview-kenya-uk-investment-mission-2025-diaspora-protection",
    category: "Events",
  },
  {
    title:
      "Celebrating Culture and Connection: Birdview at Kenya-UK Utamaduni Day",
    excerpt:
      "Birdview proudly sponsored Utamaduni Day, uniting the Kenyan diaspora in the UK with culture, pride, and heritage.",
    date: "Sep 14, 2025",
    image: "/images/blog-utamaduni.jpg",
    slug: "birdview-kenya-uk-utamaduni-day-celebration",
    category: "Events",
  },
  {
    title:
      "Mitigating the Crisis: How Birdview Insurance Protects Kenyans Abroad from the Worst-Case Scenarios",
    excerpt:
      "Birdview provides critical insurance for Kenyans abroad, protecting them against abuse, exploitation, and tragic loss.",
    date: "Sep 16, 2025",
    image: "/images/blog-crisis.jpg",
    slug: "mitigating-crisis-birdview-insurance-protects-kenyans-abroad",
    category: "Insurance",
  },
  {
    title:
      "South Sudan Insurance Conference: Birdview Leads the Way in Diaspora Protection",
    excerpt:
      "Birdview deepened its regional presence by hosting the Diaspora Insurance Conference in Juba, South Sudan.",
    date: "Sep 18, 2025",
    image: "/images/blog-south-sudan.jpg",
    slug: "south-sudan-insurance-conference-birdview-diaspora-protection",
    category: "Events",
  },
  {
    title: "Evacuation & Repatriation Insurance for Kenyans Abroad",
    excerpt:
      "Evacuation and repatriation cover ensures dignity and financial support for Kenyans abroad during emergencies.",
    date: "Sep 20, 2025",
    image: "/images/blog-repatriation.jpg",
    slug: "evacuation-repatriation-insurance-kenyans-abroad",
    category: "Insurance",
  },
  {
    title:
      "How Digital Innovation Is Making Insurance More Accessible in Kenya & Beyond",
    excerpt:
      "From mobile to automation, digital innovation is transforming how Kenyans access affordable, instant insurance.",
    date: "Sep 22, 2025",
    image: "/images/blog-digital.jpg",
    slug: "digital-innovation-making-insurance-accessible-kenya-beyond",
    category: "Innovation",
  },
  {
    title:
      "Affordable Insurance Solutions for Migrant Workers & Kenyans in the Diaspora",
    excerpt:
      "Birdview offers affordable, tailored coverage for migrant workers, protecting against risks like job loss and medical emergencies.",
    date: "Sep 23, 2025",
    image: "/images/blog-diaspora.jpg",
    slug: "affordable-insurance-solutions-migrant-workers-kenyans-diaspora",
    category: "Insurance",
  },
  {
    title:
      "Why Birdview Exists: A Story of Purpose, Protection, and Kenyan Resilience",
    excerpt:
      "Birdview was founded to make protection simple, affordable, and accessible—especially when it matters most.",
    date: "Sep 24, 2025",
    image: "/images/blog-purpose.jpg",
    slug: "why-birdview-exists-purpose-protection-kenyan-resilience",
    category: "Corporate",
  },
  {
    title:
      "Case Study: The Emotional and Financial Toll of Repatriation – A Call for Preparedness",
    excerpt:
      "Repatriating a loved one is emotionally heavy and financially draining. Learn why preparedness is essential.",
    date: "Sep 25, 2025",
    image: "/images/blog-case-repatriation.jpg",
    slug: "case-study-repatriation-emotional-financial-toll",
    category: "Case Study",
  },
  {
    title:
      "Why Traditional Insurance Isn’t Built for Everyone—and How Microinsurance Is Changing the Game",
    excerpt:
      "Traditional insurance often excludes millions. Microinsurance provides affordable, practical solutions for everyday realities.",
    date: "Sep 26, 2025",
    image: "/images/blog-microinsurance.jpg",
    slug: "why-traditional-insurance-not-for-everyone-microinsurance-changing-game",
    category: "Innovation",
  },
  {
    title:
      "Birdview Insurance Connects with Diaspora at LDSCKF Kenya Cultural Day",
    excerpt:
      "Birdview engaged diaspora communities at the LDSCKF Kenya Cultural Day, reinforcing its mission of protection.",
    date: "Sep 27, 2025",
    image: "/images/blog-culturalday.jpg",
    slug: "birdview-insurance-diaspora-ldsckf-kenya-cultural-day",
    category: "Events",
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredPosts = useMemo(() => {
    if (activeCategory === "All") return posts;

    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory]);

  return (
    <section className="relative w-screen max-w-none bg-background overflow-hidden">
      {/* Hero Section */}
      <div className="relative h-[40vh] flex flex-col items-center justify-center text-center text-white overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-blue-700 to-red-600" />
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Our Insights & Updates
          </h1>
          <p className="mt-3 text-lg text-white/90">
            Explore our latest stories, news, and innovations.
          </p>
        </div>
      </div>

      {/* Floating Category Bar */}
      <CategoryBar
        activeCategory={activeCategory}
        onSelect={setActiveCategory}
      />

      {/* Posts Grid */}
      <div className="max-w-7xl mx-auto py-12 px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        <AnimatePresence mode="wait">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.slug}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              initial={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.4 }}
            >
              <Link href={`/blog/${post.slug}`}>
                <Card
                  isHoverable
                  className="border border-primary/30 hover:border-primary transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                >
                  <CardHeader className="p-0">
                    <img
                      alt={post.title}
                      className="w-full h-52 object-cover rounded-t-xl"
                      src={post.image}
                    />
                  </CardHeader>
                  <CardBody className="p-5">
                    <h3 className="text-lg font-semibold text-primary mb-2">
                      {post.title}
                    </h3>
                    <p className="text-sm text-neutral-600 dark:text-neutral-300 mb-3">
                      {post.excerpt}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {post.date} ·{" "}
                      <span className="font-medium">{post.category}</span>
                    </p>
                  </CardBody>
                </Card>
              </Link>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
