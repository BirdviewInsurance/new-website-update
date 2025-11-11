"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import NextLink from "next/link";
import clsx from "clsx";
import { ChevronRightIcon } from "@heroicons/react/24/solid";

import { SearchIcon } from "@/components/icons";

// Animation variants for dropdowns
const submenuVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0 },
};

// ✅ MobileMegaMenu component (fixed + scrollable internally)
const MobileMegaMenu = ({
  megaMenus,
  closeDrawer,
}: {
  megaMenus: any;
  closeDrawer: () => void;
}) => {
  const [openTop, setOpenTop] = useState<string | null>(null);
  const router = useRouter();
  const [openColumns, setOpenColumns] = useState<{
    [key: string]: number | null;
  }>({});

  const topLevelItems = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services", megaItems: megaMenus.Services },
    { label: "Products", href: "/products", megaItems: megaMenus.Products },
    { label: "Claims", href: "/claims", megaItems: megaMenus.Claims },
    {
      label: "Leadership",
      href: "/our-leadership",
      megaItems: megaMenus.Leadership,
    },
    { label: "About Us", href: "/about-us", megaItems: megaMenus.AboutUs },
  ];

  return (
    <div className="h-full overflow-y-auto p-6 flex flex-col gap-4 bg-gradient-to-br from-primary/95 via-secondary/90 to-primary/80 backdrop-blur-xl text-white">
      {topLevelItems.map((item) => {
        const mega = !!item.megaItems;
        const isOpen = openTop === item.label;

        return (
          <motion.div key={item.label} layout>
            {/* Top-level link */}
            <button
              className={clsx(
                "w-full flex justify-between items-center py-3 text-left font-semibold text-white text-base tracking-wide transition-all duration-300 border-b border-white/10",
                "hover:text-white hover:border-white",
              )}
              onClick={() => {
                if (!mega) {
                  router.push(item.href);
                  closeDrawer();
                } else {
                  setOpenTop(isOpen ? null : item.label);
                }
              }}
            >
              <span className="flex items-center gap-2">{item.label}</span>
              {mega && (
                <motion.span
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  className="text-white"
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRightIcon className="w-5 h-5 text-white font-bold drop-shadow-[0_1px_2px_rgba(255,255,255,0.4)]" />
                </motion.span>
              )}
            </button>

            {/* Submenu section */}
            <AnimatePresence>
              {mega && isOpen && (
                <motion.div
                  animate={{ height: "auto", opacity: 1 }}
                  className="pl-4 border-l-2 border-white/20 mt-2 mb-3"
                  exit={{ height: 0, opacity: 0 }}
                  initial={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35 }}
                >
                  {item.megaItems.map((col: any, colIdx: number) => {
                    const colOpen = openColumns[item.label] === colIdx;

                    return (
                      <motion.div key={colIdx} layout className="mb-2">
                        <button
                          className="flex justify-between items-center w-full text-sm font-medium text-white/80 py-2 hover:text-white transition-all"
                          onClick={() =>
                            setOpenColumns((prev) => ({
                              ...prev,
                              [item.label]: colOpen ? null : colIdx,
                            }))
                          }
                        >
                          {col.title}
                          <motion.span
                            animate={{ rotate: colOpen ? 90 : 0 }}
                            className="text-white"
                            transition={{ duration: 0.3 }}
                          >
                            <ChevronRightIcon className="w-4 h-4 text-white font-semibold drop-shadow-[0_1px_2px_rgba(255,255,255,0.3)]" />
                          </motion.span>
                        </button>

                        <AnimatePresence>
                          {colOpen && (
                            <motion.div
                              animate={{ height: "auto", opacity: 1 }}
                              className="pl-3 border-l border-white/10 flex flex-col gap-1 mt-1"
                              exit={{ height: 0, opacity: 0 }}
                              initial={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.3 }}
                            >
                              {col.links.map((link: any) => (
                                <Link
                                  key={link.href}
                                  className="py-1 text-sm text-white/70 hover:text-white hover:font-semibold transition-all duration-200 relative group"
                                  href={link.href}
                                  onClick={closeDrawer}
                                >
                                  <span>{link.label}</span>
                                  <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-white group-hover:w-full transition-all duration-300" />
                                </Link>
                              ))}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}

      {/* Footer */}
      <div className="mt-10 text-center text-sm text-white/70">
        © {new Date().getFullYear()}{" "}
        <span className="font-semibold text-white">Birdview Insurance</span>
        <p className="text-white/60 mt-1">Trusted Protection. Global Reach.</p>
      </div>
    </div>
  );
};

export const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // ✅ Disable body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "auto";
  }, [isDrawerOpen]);

  // Close menus on outside click or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenu(null);
      }
    };
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenMenu(null);
        setIsDrawerOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  // helper to close drawer
  const closeDrawer = () => setIsDrawerOpen(false);

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsDrawerOpen(false); // close mobile drawer if open
    }
  };

  const searchInput = (
    <Input
      aria-label="Search"
      classNames={{
        inputWrapper:
          "bg-default-100 rounded-lg border border-primary/20 shadow-sm",
        input: "text-sm placeholder:text-primary font-semibold",
      }}
      placeholder="Search..."
      size="sm"
      startContent={
        <SearchIcon className="text-base text-primary font-semibold pointer-events-none flex-shrink-0" />
      }
      type="search"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleSearchSubmit}
    />
  );

  // const retrieveInput = (
  //   <Input
  //     aria-label="Retrieve"
  //     classNames={{
  //       inputWrapper: "bg-default-100",
  //       input: "text-sm placeholder:text-primary font-semibold",
  //     }}
  //     placeholder="Retrieve Policy / ID..."
  //     type="text"
  //   />
  // );

  const megaMenus = {
    Services: [
      {
        title: "Evacuation & Repatriation",
        links: [
          {
            label: "Emergency Medical Evacuation",
            href: "/services/evacuation_and_repatriation/emergency",
          },
          {
            label: "Repatriation of Remains",
            href: "/services/evacuation_and_repatriation/repatriation",
          },
          {
            label: "Air Ambulance Support",
            href: "/services/evacuation_and_repatriation/air-ambulance",
          },
        ],
      },
      {
        title: "Last Expense",
        links: [
          {
            label: "Funeral Expense Cover",
            href: "/services/last_expense/funeral",
          },
          {
            label: "Family Support Cover",
            href: "/services/last_expense/family-support",
          },
          {
            label: "Corporate Group Last Expense",
            href: "/services/last_expense/group",
          },
        ],
      },
      {
        title: "Medical Insurance",
        links: [
          {
            label: "Individual Medical Plans",
            href: "/services/medical/individual",
          },
          { label: "Family Medical Cover", href: "/services/medical/family" },
          {
            label: "Corporate & SME Plans",
            href: "/services/medical/corporate",
          },
        ],
      },
      {
        title: "Hospital Cash",
        links: [
          {
            label: "Daily Hospital Benefit",
            href: "/services/hospital_cash/daily",
          },
          {
            label: "Extended Stay Benefit",
            href: "/services/hospital_cash/extended",
          },
          {
            label: "Accident Hospitalization",
            href: "/services/hospital_cash/accident",
          },
        ],
      },
      {
        title: "Personal Accident",
        links: [
          {
            label: "Individual Accident Cover",
            href: "/services/personal_accident/individual",
          },
          {
            label: "Family Accident Cover",
            href: "/services/personal_accident/family",
          },
          {
            label: "Corporate Accident Cover",
            href: "/services/personal_accident/corporate",
          },
        ],
      },
      {
        title: "BodaBoda Welfare Cover",
        links: [
          {
            label: "Rider Medical Cover",
            href: "/services/bodaboda_welfare/medical",
          },
          {
            label: "Accident & Injury Cover",
            href: "/services/bodaboda_welfare/accident",
          },
          {
            label: "Funeral & Repatriation",
            href: "/services/bodaboda_welfare/funeral",
          },
        ],
      },
      {
        title: "TukTuk Welfare Cover",
        links: [
          {
            label: "Driver & Passenger Cover",
            href: "/services/tuktuk_welfare/driver-passenger",
          },
          {
            label: "Accident & Property Damage",
            href: "/services/tuktuk_welfare/accident",
          },
          {
            label: "Medical & Last Expense",
            href: "/services/tuktuk_welfare/medical",
          },
        ],
      },
      {
        title: "Probation Guard",
        links: [
          {
            label: "Job Risk Protection",
            href: "/services/probation/job-protection",
          },
          {
            label: "Medical & Injury Cover",
            href: "/services/probation/medical",
          },
          {
            label: "Life & Accident Benefits",
            href: "/services/probation/life-benefits",
          },
        ],
      },
      {
        title: "AQUABIMA Insurance",
        links: [
          {
            label: "Fishermen Welfare Cover",
            href: "/services/aquabima/fishermen",
          },
          { label: "Marine Accident Cover", href: "/services/aquabima/marine" },
          {
            label: "Fishing Equipment Protection",
            href: "/services/aquabima/equipment",
          },
        ],
      },
    ],
    Products: [
      {
        title: "Evacuation & Repatriation",
        links: [
          { label: "Overview", href: "/product/evacuation-repatriation" },
          {
            label: "Benefits & Coverage",
            href: "/products/evacuation_and_repatriation",
          },
          {
            label: "Eligibility & Requirements",
            href: "/product/evacuation-repatriation/eligibility",
          },
          {
            label: "How It Works",
            href: "/product/evacuation-repatriation/how-it-works",
          },
          {
            label: "Get a Quote",
            href: "/product/evacuation-repatriation/quote",
          },
          { label: "FAQs", href: "/product/evacuation-repatriation/faqs" },
        ],
      },
      {
        title: "Last Expense",
        links: [
          { label: "Overview", href: "/product/last-expense" },
          { label: "Benefits & Premiums", href: "/products/last_expense" },
          {
            label: "Family Cover Options",
            href: "/product/last-expense/family-options",
          },
          { label: "Claim Process", href: "/product/last-expense/claims" },
          { label: "Policy Terms", href: "/product/last-expense/policy-terms" },
          { label: "Enroll Now", href: "/product/last-expense/enroll" },
        ],
      },
      {
        title: "Medical Insurance",
        links: [
          {
            label: "Individual Plans",
            href: "/product/medical-insurance/individual",
          },
          { label: "Benefits & Premiums", href: "/products/medical" },
          { label: "Family Plans", href: "/product/medical-insurance/family" },
          {
            label: "Corporate Packages",
            href: "/product/medical-insurance/corporate",
          },
          {
            label: "Hospitals Network",
            href: "/product/medical-insurance/hospitals",
          },
          {
            label: "Claims & Reimbursements",
            href: "/product/medical-insurance/claims",
          },
          {
            label: "Request a Quote",
            href: "/product/medical-insurance/quote",
          },
        ],
      },
      {
        title: "Hospital Cash",
        links: [
          {
            label: "How It Works",
            href: "/product/hospital-cash/how-it-works",
          },
          { label: "Benefits & Premiums", href: "/products/hospital_cash" },
          {
            label: "Daily Benefit Details",
            href: "/product/hospital-cash/details",
          },
          { label: "Eligibility", href: "/product/hospital-cash/eligibility" },
          { label: "Claim Procedure", href: "/product/hospital-cash/claims" },
          { label: "Pricing Plans", href: "/product/hospital-cash/pricing" },
          { label: "FAQs", href: "/product/hospital-cash/faqs" },
        ],
      },
      {
        title: "Personal Accident",
        links: [
          {
            label: "Coverage Summary",
            href: "/product/personal-accident/coverage",
          },
          {
            label: "Benefits & Compensation",
            href: "/products/personal_accident",
          },
          {
            label: "Exclusions",
            href: "/product/personal-accident/exclusions",
          },
          { label: "Claim Steps", href: "/product/personal-accident/claims" },
          { label: "Get Covered", href: "/product/personal-accident/enroll" },
          { label: "FAQs", href: "/product/personal-accident/faqs" },
        ],
      },
      {
        title: "BodaBoda Welfare Cover",
        links: [
          {
            label: "What’s Covered",
            href: "/product/bodaboda-welfare/coverage",
          },
          {
            label: "Accident & Hospitalization Benefits",
            href: "/products/bodaboda_welfare",
          },
          {
            label: "Member Requirements",
            href: "/product/bodaboda-welfare/requirements",
          },
          {
            label: "Premiums & Payments",
            href: "/product/bodaboda-welfare/premiums",
          },
          { label: "Join Now", href: "/product/bodaboda-welfare/enroll" },
          { label: "FAQs", href: "/product/bodaboda-welfare/faqs" },
        ],
      },
      {
        title: "TukTuk Welfare Cover",
        links: [
          { label: "Cover Overview", href: "/product/tuktuk-welfare" },
          {
            label: "Driver & Passenger Benefits",
            href: "/products/tuktuk_welfare",
          },
          { label: "Claim Guide", href: "/product/tuktuk-welfare/claims" },
          {
            label: "Membership Options",
            href: "/product/tuktuk-welfare/membership",
          },
          { label: "Apply Today", href: "/product/tuktuk-welfare/apply" },
          { label: "FAQs", href: "/product/tuktuk-welfare/faqs" },
        ],
      },
      {
        title: "Probation Guard",
        links: [
          {
            label: "What is Probation Guard?",
            href: "/product/probation-guard",
          },
          { label: "Benefits & Premiums", href: "/products/probation_guard" },
          {
            label: "Coverage Details",
            href: "/product/probation-guard/coverage",
          },
          {
            label: "Eligibility",
            href: "/product/probation-guard/eligibility",
          },
          {
            label: "Claims & Support",
            href: "/product/probation-guard/claims",
          },
          {
            label: "Policy Terms",
            href: "/product/probation-guard/policy-terms",
          },
          { label: "Get a Quote", href: "/product/probation-guard/quote" },
        ],
      },
      {
        title: "AQUABIMA Insurance",
        links: [
          { label: "About AQUABIMA", href: "/product/aquabima" },
          { label: "Benefits & Premiums", href: "/products/aquaculture" },
          {
            label: "Fishermen Cover Details",
            href: "/product/aquabima/details",
          },
          {
            label: "Accident & Death Benefits",
            href: "/product/aquabima/benefits",
          },
          { label: "Premium Plans", href: "/product/aquabima/premiums" },
          { label: "Claim Process", href: "/product/aquabima/claims" },
          { label: "Enroll Now", href: "/product/aquabima/enroll" },
        ],
      },
    ],
    Claims: [
      {
        title: "File a Claim",
        links: [
          {
            label: "Evacuation & Repartriation Claims",
            href: "/Claims/EvacuationRepatriationClaimForm",
          },
          {
            label: "Hospital Cash Claims",
            href: "/Claims/HospitalCashClaimForm",
          },
          {
            label: "Personal Accident Claims",
            href: "/Claims/PersonalAccidentClaimForm",
          },
          { label: "Medical Claims", href: "/Claims/MedicalClaimForm" },
          {
            label: "Last Expense Claims",
            href: "/Claims/LastExpenseClaimForm",
          },
        ],
      },
      {
        title: "Support",
        links: [
          { label: "Claims Process", href: "/Claims/process" },
          { label: "FAQs", href: "/Claims/faqs" },
          { label: "Contact Support", href: "/Claims/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Download Forms", href: "/Claims/forms" },
          { label: "Policy Information", href: "/Claims/policy-info" },
          { label: "Customer Stories", href: "/Claims/stories" },
        ],
      },
    ],
    Leadership: [
      {
        title: "Our Team",
        links: [
          { label: "Board of Directors", href: "/our-leadership#board" },
          { label: "Executive Team", href: "/our-leadership#executive" },
          { label: "Advisors", href: "/our-leadership#advisors" },
        ],
      },
      {
        title: "Careers",
        links: [
          { label: "Why Work With Us", href: "/careers#why-us" },
          { label: "Open Positions", href: "/careers#open-positions" },
          { label: "Internships", href: "/careers#internships" },
        ],
      },
      {
        title: "Culture & Values",
        links: [
          { label: "Our Values", href: "/our-leadership#values" },
          { label: "Diversity & Inclusion", href: "/our-leadership#diversity" },
          { label: "Community Engagement", href: "/our-leadership#community" },
        ],
      },
    ],
    AboutUs: [
      {
        title: "Company",
        links: [
          { label: "Our Story", href: "/about#story" },
          { label: "Mission & Vision", href: "/about#mission-vision" },
          { label: "Careers", href: "/careers" },
        ],
      },
      {
        title: "Legal",
        links: [
          { label: "Privacy Policy", href: "/privacy-policy" },
          { label: "Terms of Service", href: "/terms-of-service" },
          { label: "Regulatory Info", href: "/regulatory-info" },
        ],
      },
      {
        title: "Get in Touch",
        links: [
          { label: "Contact Form", href: "/contact-us#form" },
          { label: "Customer Support", href: "/contact-us#support" },
          { label: "Office Locations", href: "/contact-us#locations" },
        ],
      },
      {
        title: "Follow Us",
        links: [
          { label: "Facebook", href: "https://facebook.com/birdviewinsurance" },
          { label: "Twitter", href: "https://twitter.com/birdviewinsure" },
          {
            label: "LinkedIn",
            href: "https://linkedin.com/company/birdviewinsurance",
          },
          {
            label: "Instagram",
            href: "https://instagram.com/birdviewinsurance",
          },
          { label: "YouTube", href: "https://youtube.com/birdviewinsurance" },
          { label: "Tiktok", href: "https://tiktok.com/@birdviewinsurance" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Blog", href: "/blog" },
          { label: "Newsroom", href: "/newsroom" },
          { label: "FAQs", href: "/faqs" },
        ],
      },
    ],
  };

  return (
    <>
      {/* Topbar */}
      <div className="w-full bg-primary text-white text-sm px-4 py-5 flex items-center justify-between flex-wrap md:flex-nowrap relative z-50">
        {/* Left: Full-height white logo section */}
        <div className="hidden md:flex items-center gap-2 flex-shrink-0 bg-white h-full absolute left-0 top-0 px-4">
          <Link className="flex items-center gap-2 h-full" href="/">
            <img
              alt="Birdview Logo"
              className="h-16 md:h-22 w-auto md:w-38 object-contain"
              src="/images/logo1.png"
            />
            <span className="font-semibold text-primary" />
          </Link>
        </div>

        {/* Center: Menu links */}
        <div
          className="
    flex flex-wrap 
    justify-center items-center 
    w-full 
    gap-3 md:gap-6 lg:gap-10
    text-center 
    mx-auto
  "
        >
          {["Newsroom", "Careers", "Blog", "Complaints", "Contact Us"].map(
            (item) => (
              <Link
                key={item}
                className="hover:underline text-white font-medium tracking-wide transition-colors duration-300"
                href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {item}
              </Link>
            ),
          )}
        </div>
      </div>

      {/* HeroUI Navbar */}
      <HeroUINavbar
        className="bg-danger text-white shadow-md z-50"
        maxWidth="xl"
        position="sticky"
      >
        {/* Left side (brand + nav items) */}
        <NavbarContent className="basis-1/5 md:basis-full" justify="start">
          <NavbarBrand as="li" className="max-w-fit md:hidden">
            <NextLink
              className="flex justify-start items-center gap-2 bg-white px-2 py-1 rounded-md shadow-md"
              href="/"
            >
              <img
                alt="Birdview Logo"
                className="h-8 w-auto"
                src="/images/logo1.png"
              />
            </NextLink>
          </NavbarBrand>

          {/* Desktop / Tablet Nav Items (visible from md upwards) */}
          <ul className="hidden md:flex gap-4 justify-start ml-4 relative">
            {[
              { label: "Home", href: "/" },
              {
                label: "Services",
                href: "/services",
                mega: true,
                megaItems: megaMenus.Services,
              },
              {
                label: "Products",
                href: "/products",
                mega: true,
                megaItems: megaMenus.Products,
              },
              {
                label: "Claims",
                href: "/claims",
                mega: true,
                megaItems: megaMenus.Claims,
              },
              {
                label: "Leadership",
                href: "/our-leadership",
                mega: true,
                megaItems: megaMenus.Leadership,
              },
              {
                label: "About Us",
                href: "/about",
                mega: true,
                megaItems: megaMenus.AboutUs,
              },
            ].map((item) => {
              const isActive = pathname?.startsWith(item.href);

              return (
                <NavbarItem key={item.href} className="relative group">
                  <button
                    className={clsx(
                      "flex items-center gap-1 text-white relative transition-colors duration-300",
                      isActive ? "font-semibold" : "font-medium",
                    )}
                    onClick={() => {
                      if (item.label === "Home") {
                        router.push("/"); // ✅ navigate to homepage
                        setOpenMenu(null);
                      } else if (item.mega) {
                        setOpenMenu(
                          openMenu === item.label ? null : item.label,
                        );
                      }
                    }}
                  >
                    {item.label}
                    {item.mega && (
                      <span
                        className={clsx(
                          "inline-block transition-transform duration-300",
                          openMenu === item.label ? "rotate-180" : "rotate-0",
                        )}
                      >
                        ▼
                      </span>
                    )}
                    <span
                      className={clsx(
                        "absolute left-0 -bottom-1 h-1 bg-white transition-all duration-300",
                        isActive ? "w-full" : "group-hover:w-full",
                      )}
                    />
                    {isActive && (
                      <span className="absolute top-0 left-0 h-1 w-full bg-white" />
                    )}
                  </button>

                  {/* Desktop Mega Menu */}
                  <AnimatePresence>
                    {item.mega && openMenu === item.label && (
                      <>
                        <motion.div
                          animate={{ opacity: 0.4 }}
                          className="fixed inset-0 bg-black z-10"
                          exit={{ opacity: 0 }}
                          initial={{ opacity: 0 }}
                          onClick={() => setOpenMenu(null)}
                        />
                        <motion.div
                          animate={{ opacity: 1, y: 0 }}
                          className="fixed left-0 top-full mt-2 w-screen bg-white text-gray-900 shadow-lg p-8 grid grid-cols-3 gap-8 z-20"
                          exit={{ opacity: 0, y: -10 }}
                          initial={{ opacity: 0, y: -10 }}
                          transition={{ duration: 0.25 }}
                        >
                          {item.megaItems.map((col, idx) => (
                            <div key={idx} className="flex flex-col gap-2">
                              <h4 className="font-extrabold text-danger">
                                {col.title}
                              </h4>
                              {col.links.map((link) => (
                                <Link
                                  key={link.href}
                                  className="hover:text-primary transition"
                                  href={link.href}
                                  onClick={() => setOpenMenu(null)}
                                >
                                  {link.label}
                                </Link>
                              ))}
                            </div>
                          ))}
                        </motion.div>
                      </>
                    )}
                  </AnimatePresence>
                </NavbarItem>
              );
            })}
          </ul>
        </NavbarContent>

        {/* Right side (search + retrieve + theme) visible md+ */}
        <NavbarContent
          className="hidden md:flex basis-1/5 md:basis-full"
          justify="end"
        >
          <NavbarItem className="w-[220px] lg:w-[320px] font-semibold text-primary">
            {searchInput}
          </NavbarItem>

          {/* <NavbarItem className="hidden lg:flex font-semibold text-primary">
            {retrieveInput}
          </NavbarItem> */}

          <NavbarItem className="hidden md:flex gap-2">
            <div
              ref={menuRef}
              className="flex items-center justify-center md:justify-end gap-2 relative flex-shrink-0 ml-auto"
            >
              <Button
                className="bg-primary text-white font-semibold px-3 py-1.5 rounded-md transition-all duration-300 text-sm"
                onPress={() =>
                  setOpenMenu(openMenu === "portals" ? null : "portals")
                }
              >
                Portals
                <span
                  className={clsx(
                    "inline-block ml-1 transition-transform duration-300",
                    openMenu === "portals" ? "rotate-180" : "rotate-0",
                  )}
                >
                  ▼
                </span>
              </Button>

              <AnimatePresence>
              {openMenu === "portals" && (
                <motion.div
                  animate="visible"
                  className="absolute right-0 top-full mt-2 bg-white rounded-lg p-2 shadow-lg min-w-[220px]"
                  exit="hidden"
                  initial="hidden"
                  variants={submenuVariants}
                >
                  {[
                  { name: "Agent Portal", path: "https://portal.birdviewinsurance.com/auth/login" },
                  { name: "Broker Portal", path: "https://portal.birdviewinsurance.com/auth/login" },
                  { name: "Provider Portal", path: "https://provider.birdviewinsurance.com/" },
                  { name: "Welfare Portal", path: "https://partners.birdviewinsurance.com/auth/login" },
                  { name: "Intermediary Registration", path: "/forms/Intermediary-Registration-Form" },
                  { name: "Agent Registration", path: "/forms/Agents" },
                  { name: "Group Registration", path: "/forms/group-form" },
                  { name: "TukTuk Insurance Registration", path: "https://partners.birdviewinsurance.com/auth/login" },                
                  { name: "Agent Welfare Registration", path: "/forms/Agents/" },
                  ].map((item, index, arr) => (
                    <div key={item.name} className="flex flex-col">
                      {/* Menu item */}
                      <div
                        className="px-3 py-2 rounded-md cursor-pointer text-primary hover:text-danger hover:bg-gray-100 transition-colors font-semibold"
                        onClick={() => {
                          router.push(item.path);
                          setOpenMenu(null);
                        }}
                      >
                        {item.name}
                      </div>

                      {/* Line separator (except after last item) */}
                      {index !== arr.length - 1 && (
                        <div className="border-t border-danger mx-2 my-1"></div>
                      )}
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
            </div>
          </NavbarItem>
        </NavbarContent>

        {/* Mobile icons + Hamburger (visible on small screens only) */}
        <NavbarContent className="md:hidden basis-1 pl-4" justify="end">
          <div
            ref={menuRef}
            className="flex items-center justify-center md:justify-end gap-2 relative flex-shrink-0 ml-auto"
          >
            <Button
              className="bg-primary text-white font-semibold px-3 py-1.5 rounded-md transition-all duration-300 text-sm"
              onPress={() =>
                setOpenMenu(openMenu === "portals" ? null : "portals")
              }
            >
              Portals
              <span
                className={clsx(
                  "inline-block ml-1 transition-transform duration-300",
                  openMenu === "portals" ? "rotate-180" : "rotate-0",
                )}
              >
                ▼
              </span>
            </Button>

            <AnimatePresence>
            {openMenu === "portals" && (
              <motion.div
                animate="visible"
                exit="hidden"
                initial="hidden"
                variants={submenuVariants}
                className="absolute right-0 top-full mt-2 bg-white rounded-lg p-2 shadow-lg min-w-[220px]"
              >
                {[
                  { name: "Agent Portal", path: "https://portal.birdviewinsurance.com/auth/login" },
                  { name: "Broker Portal", path: "https://portal.birdviewinsurance.com/auth/login" },
                  { name: "Provider Portal", path: "https://provider.birdviewinsurance.com/" },
                  { name: "Welfare Portal", path: "https://partners.birdviewinsurance.com/auth/login" },
                  { name: "Intermediary Registration", path: "/forms/Intermediary-Registration-Form" },
                  { name: "Agent Registration", path: "/forms/Agents" },
                  { name: "Group Registration", path: "/forms/group-form" },
                  { name: "TukTuk Insurance Registration", path: "https://partners.birdviewinsurance.com/auth/login" },                
                  { name: "Agent Welfare Registration", path: "/forms/Agents/" },
                ].map((item, index, arr) => (
                  <div key={item.name} className="flex flex-col">
                    {/* Menu item */}
                    <div
                      className="px-3 py-2 rounded-md cursor-pointer text-primary hover:text-danger hover:bg-gray-100 transition-colors font-semibold"
                      onClick={() => {
                        router.push(item.path);
                        setOpenMenu(null);
                      }}
                    >
                      {item.name}
                    </div>

                    {/* Separator (except for last item) */}
                    {index !== arr.length - 1 && (
                      <div className="border-t border-danger mx-2 my-1"></div>
                    )}
                  </div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
          </div>
          {/* Mobile menu toggle */}
          <button
            aria-label={isDrawerOpen ? "Close menu" : "Open menu"}
            className="ml-2 p-2 rounded-md hover:bg-white/10 transition text-white"
            onClick={() => setIsDrawerOpen((s) => !s)}
          >
            {/* simple hamburger / close icon — keep your own icon if you prefer */}
            {isDrawerOpen ? "✕" : "☰"}
          </button>
        </NavbarContent>
      </HeroUINavbar>

      {/* Mobile Fullscreen Drawer */}
      <AnimatePresence>
        {isDrawerOpen && (
          <>
            {/* Dim background */}
            <motion.div
              animate={{ opacity: 0.6 }}
              className="fixed inset-0 bg-black z-30 backdrop-blur-sm"
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
              onClick={closeDrawer}
            />

            {/* Drawer content */}
            <motion.div
              animate={{ x: 0 }}
              className="fixed top-[120px] left-0 right-0 bottom-0 z-40 rounded-tr-3xl overflow-hidden flex flex-col"
              exit={{ x: "-100%" }}
              initial={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 180, damping: 25 }}
            >
              <MobileMegaMenu closeDrawer={closeDrawer} megaMenus={megaMenus} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
