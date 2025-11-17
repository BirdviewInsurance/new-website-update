"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { SearchIcon } from "@/components/icons";
import NextLink from "next/link";

// Search index - all searchable content from the website
const searchIndex = [
  // Main pages
  { title: "Home", href: "/", category: "Pages", description: "Birdview Insurance homepage" },
  { title: "About Us", href: "/about-us", category: "Pages", description: "Learn about Birdview Insurance" },
  { title: "Contact Us", href: "/contact-us", category: "Pages", description: "Get in touch with our team" },
  { title: "FAQs", href: "/faq", category: "Pages", description: "Frequently asked questions" },
  { title: "Newsroom", href: "/newsroom", category: "Pages", description: "Latest news and updates" },
  { title: "Careers", href: "/careers", category: "Pages", description: "Join our team" },
  { title: "Blog", href: "/blog", category: "Pages", description: "Insurance insights and articles" },
  { title: "Our Leadership", href: "/our-leadership", category: "Pages", description: "Meet our leadership team" },
  { title: "Complaints", href: "/complaints", category: "Pages", description: "Submit a complaint" },
  { title: "Privacy Policy", href: "/privacy-policy", category: "Legal", description: "Privacy policy and data protection" },
  { title: "Terms of Service", href: "/terms-of-service", category: "Legal", description: "Terms and conditions" },
  { title: "Regulatory Info", href: "/regulatory-info", category: "Legal", description: "Regulatory information" },
  
  // Products
  { title: "Evacuation & Repatriation", href: "/products/evacuation_and_repatriation", category: "Products", description: "Emergency medical evacuation and repatriation services" },
  { title: "Last Expense Insurance", href: "/products/last_expense", category: "Products", description: "Funeral and last expense coverage" },
  { title: "Medical Insurance", href: "/products/medical", category: "Products", description: "Comprehensive medical insurance plans" },
  { title: "Hospital Cash", href: "/products/hospital_cash", category: "Products", description: "Daily hospital cash benefits" },
  { title: "Personal Accident", href: "/products/personal_accident", category: "Products", description: "Personal accident insurance coverage" },
  { title: "BodaBoda Welfare Cover", href: "/products/bodaboda_welfare", category: "Products", description: "Insurance for motorcycle riders" },
  { title: "TukTuk Welfare Cover", href: "/products/tuktuk_welfare", category: "Products", description: "Insurance for tuk-tuk drivers" },
  { title: "Probation Guard", href: "/products/probation_guard", category: "Products", description: "Job protection during probation period" },
  { title: "AQUABIMA Insurance", href: "/products/aquaculture", category: "Products", description: "Fishermen and marine insurance" },
  
  // Services
  { title: "Emergency Medical Evacuation", href: "/services/evacuation_and_repatriation/emergency", category: "Services", description: "Emergency medical evacuation services" },
  { title: "Repatriation of Remains", href: "/services/evacuation_and_repatriation/repatriation", category: "Services", description: "Repatriation services for remains" },
  { title: "Air Ambulance Support", href: "/services/evacuation_and_repatriation/air-ambulance", category: "Services", description: "Air ambulance transportation" },
  { title: "Funeral Expense Cover", href: "/services/last_expense/funeral", category: "Services", description: "Funeral expense coverage" },
  { title: "Family Support Cover", href: "/services/last_expense/family-support", category: "Services", description: "Family support coverage" },
  { title: "Individual Medical Plans", href: "/services/medical/individual", category: "Services", description: "Individual medical insurance plans" },
  { title: "Family Medical Cover", href: "/services/medical/family", category: "Services", description: "Family medical insurance coverage" },
  { title: "Corporate & SME Plans", href: "/services/medical/corporate", category: "Services", description: "Corporate medical insurance plans" },
  { title: "Daily Hospital Benefit", href: "/services/hospital_cash/daily", category: "Services", description: "Daily hospital cash benefits" },
  { title: "Extended Stay Benefit", href: "/services/hospital_cash/extended", category: "Services", description: "Extended hospital stay benefits" },
  { title: "Accident Hospitalization", href: "/services/hospital_cash/accident", category: "Services", description: "Accident hospitalization coverage" },
  { title: "Individual Accident Cover", href: "/services/personal_accident/individual", category: "Services", description: "Individual accident insurance" },
  { title: "Family Accident Cover", href: "/services/personal_accident/family", category: "Services", description: "Family accident insurance" },
  { title: "Corporate Accident Cover", href: "/services/personal_accident/corporate", category: "Services", description: "Corporate accident insurance" },
  { title: "Rider Medical Cover", href: "/services/bodaboda_welfare/medical", category: "Services", description: "Medical cover for motorcycle riders" },
  { title: "Accident & Injury Cover", href: "/services/bodaboda_welfare/accident", category: "Services", description: "Accident and injury coverage for riders" },
  { title: "Driver & Passenger Cover", href: "/services/tuktuk_welfare/driver-passenger", category: "Services", description: "Insurance for tuk-tuk drivers and passengers" },
  { title: "Accident & Property Damage", href: "/services/tuktuk_welfare/accident", category: "Services", description: "Accident and property damage coverage" },
  { title: "Job Risk Protection", href: "/services/probation/job-protection", category: "Services", description: "Job protection during probation" },
  { title: "Medical & Injury Cover", href: "/services/probation/medical", category: "Services", description: "Medical and injury coverage" },
  { title: "Fishermen Welfare Cover", href: "/services/aquabima/fishermen", category: "Services", description: "Insurance for fishermen" },
  { title: "Marine Accident Cover", href: "/services/aquabima/marine", category: "Services", description: "Marine accident insurance" },
  
  // Claims
  { title: "File Evacuation & Repatriation Claim", href: "/Claims/EvacuationRepatriationClaimForm", category: "Claims", description: "Submit an evacuation and repatriation claim" },
  { title: "File Hospital Cash Claim", href: "/Claims/HospitalCashClaimForm", category: "Claims", description: "Submit a hospital cash claim" },
  { title: "File Personal Accident Claim", href: "/Claims/PersonalAccidentClaimForm", category: "Claims", description: "Submit a personal accident claim" },
  { title: "File Medical Claim", href: "/Claims/MedicalClaimForm", category: "Claims", description: "Submit a medical claim" },
  { title: "File Last Expense Claim", href: "/Claims/LastExpenseClaimForm", category: "Claims", description: "Submit a last expense claim" },
  { title: "Claims Process", href: "/Claims/process", category: "Claims", description: "Learn about the claims process" },
  { title: "Claims FAQs", href: "/Claims/faqs", category: "Claims", description: "Frequently asked questions about claims" },
  { title: "Contact Claims Support", href: "/Claims/contact", category: "Claims", description: "Contact our claims support team" },
  { title: "Download Claim Forms", href: "/Claims/forms", category: "Claims", description: "Download claim forms" },
  
  // Forms
  { title: "Intermediary Registration", href: "/forms/Intermediary-Registration-Form", category: "Forms", description: "Register as an intermediary" },
  { title: "Agent Registration", href: "/forms/Agents", category: "Forms", description: "Register as an agent" },
  { title: "Group Registration", href: "/forms/group-form", category: "Forms", description: "Register a group" },
  { title: "Job Application", href: "/forms/JobApplicationForm", category: "Forms", description: "Apply for a job" },
  
  // Portals
  { title: "Agent Portal", href: "https://portal.birdviewinsurance.com/auth/login", category: "Portals", description: "Access the agent portal" },
  { title: "Broker Portal", href: "https://portal.birdviewinsurance.com/auth/login", category: "Portals", description: "Access the broker portal" },
  { title: "Provider Portal", href: "https://provider.birdviewinsurance.com/", category: "Portals", description: "Access the provider portal" },
  { title: "Welfare Portal", href: "https://partners.birdviewinsurance.com/auth/login", category: "Portals", description: "Access the welfare portal" },
];

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryParam = searchParams.get("q") || "";
  const [searchQuery, setSearchQuery] = useState(queryParam);
  const [selectedCategory, setSelectedCategory] = useState<string | "All">("All");

  useEffect(() => {
    setSearchQuery(queryParam);
  }, [queryParam]);

  const categories = useMemo(() => {
    const cats = Array.from(new Set(searchIndex.map((item) => item.category)));
    return ["All", ...cats];
  }, []);

  const filteredResults = useMemo(() => {
    const query = searchQuery.toLowerCase().trim();
    
    if (!query) return [];

    return searchIndex.filter((item) => {
      const matchesQuery =
        item.title.toLowerCase().includes(query) ||
        item.description.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query) ||
        item.href.toLowerCase().includes(query);
      
      const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
      
      return matchesQuery && matchesCategory;
    });
  }, [searchQuery, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 md:p-12">
      {/* Header */}
      <div className="max-w-6xl mx-auto mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Search Results
        </h1>
        
        {/* Search Bar */}
        <form onSubmit={handleSearch} className="mb-6">
          <div className="flex gap-3">
            <Input
              aria-label="Search"
              classNames={{
                inputWrapper: "bg-white rounded-lg border border-primary/20 shadow-sm flex-1",
                input: "text-sm",
              }}
              placeholder="Search the website..."
              size="lg"
              startContent={
                <SearchIcon className="text-base text-primary pointer-events-none flex-shrink-0" />
              }
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              className="bg-primary text-white font-semibold px-6"
              type="submit"
            >
              Search
            </Button>
          </div>
        </form>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-primary text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Count */}
        {searchQuery && (
          <p className="text-sm text-gray-600 mb-4">
            {filteredResults.length === 0
              ? "No results found"
              : `Found ${filteredResults.length} result${filteredResults.length !== 1 ? "s" : ""} for "${searchQuery}"`}
          </p>
        )}
      </div>

      {/* Results */}
      <div className="max-w-6xl mx-auto">
        {!searchQuery ? (
          <div className="text-center py-12">
            <SearchIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 text-lg">
              Enter a search term to find pages, products, services, and more
            </p>
          </div>
        ) : filteredResults.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg mb-4">
              No results found for "{searchQuery}"
            </p>
            <p className="text-gray-500">
              Try different keywords or browse by category above
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredResults.map((item, index) => (
              <motion.div
                key={`${item.href}-${index}`}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                transition={{ delay: index * 0.05 }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <NextLink
                        className="text-xl font-semibold text-primary hover:text-danger transition-colors"
                        href={item.href}
                      >
                        {item.title}
                      </NextLink>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                        {item.category}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{item.description}</p>
                    <p className="text-gray-400 text-xs font-mono">{item.href}</p>
                  </div>
                  <NextLink href={item.href}>
                    <Button
                      className="bg-primary text-white"
                      size="sm"
                    >
                      Visit →
                    </Button>
                  </NextLink>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-gray-100 p-6 md:p-12">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Search Results
          </h1>
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">Loading search...</p>
          </div>
        </div>
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}

