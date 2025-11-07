"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@heroui/button";

const categories = [
  "All",
  "Insurance",
  "Events",
  "Innovation",
  "Announcements",
  "CSR",
];

export default function CategoryBar({
  activeCategory,
  onSelect,
}: {
  activeCategory: string;
  onSelect: (category: string) => void;
}) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 100);

    window.addEventListener("scroll", onScroll);

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="sticky top-[72px] z-40 w-full bg-white/90 dark:bg-neutral-900/90 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 shadow-sm"
          exit={{ opacity: 0, y: -20 }}
          initial={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          <div className="flex overflow-x-auto no-scrollbar justify-center gap-2 px-4 py-3 md:gap-4 md:px-6 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <Button
                key={cat}
                className={`transition-all duration-300 ${
                  activeCategory === cat
                    ? "text-white"
                    : "text-neutral-700 dark:text-neutral-200 hover:border-primary"
                }`}
                color={activeCategory === cat ? "primary" : "default"}
                size="sm"
                variant={activeCategory === cat ? "solid" : "flat"}
                onPress={() => onSelect(cat)}
              >
                {cat}
              </Button>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
