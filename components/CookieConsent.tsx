"use client";

import { useEffect, useState } from "react";
import { Button, Switch } from "@heroui/react";
import { motion, AnimatePresence } from "framer-motion";

export default function CookieConsent() {
    const [visible, setVisible] = useState(false);
    const [showPrefs, setShowPrefs] = useState(false);
    const [analytics, setAnalytics] = useState(true);
    const [marketing, setMarketing] = useState(false);

    const BRAND_COLOR = "#0057b7"; // 💙 Replace with your brand’s color

    useEffect(() => {
        const consent = localStorage.getItem("cookieConsent");
        if (!consent) {
            const timer = setTimeout(() => setVisible(true), 1200);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAcceptAll = () => {
        localStorage.setItem("cookieConsent", JSON.stringify({ analytics: true, marketing: true }));
        setVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem("cookieConsent", JSON.stringify({ analytics: false, marketing: false }));
        setVisible(false);
    };

    const handleSavePreferences = () => {
        localStorage.setItem("cookieConsent", JSON.stringify({ analytics, marketing }));
        setVisible(false);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    initial={{ x: "-100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "-100%", opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    className="fixed bottom-0 left-0 right-0 z-[9999]"
                >
                    <div
                        className="shadow-xl border-t-4 p-5 md:p-6 transition-colors duration-300
                                   backdrop-blur-md bg-gradient-to-r
                                   from-white/95 to-neutral-50/90
                                   dark:from-neutral-900/90 dark:to-neutral-800/90"
                        style={{
                            borderColor: BRAND_COLOR,
                        }}
                    >
                        <div className="mx-auto max-w-6xl flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div className="text-sm md:text-base text-neutral-800 dark:text-neutral-100 leading-relaxed">
                                <span
                                    className="font-semibold text-[15px]"
                                    style={{ color: BRAND_COLOR }}
                                >
                                    We respect your privacy.
                                </span>{" "}
                                We use cookies to personalize content, enhance your experience, and
                                analyze traffic. You can manage your preferences or accept all
                                cookies below.
                            </div>

                            <div className="flex flex-wrap items-center gap-3 justify-center md:justify-end">
                            <Button
                                size="sm"
                                variant="flat"
                                onPress={() => setShowPrefs(!showPrefs)}
                                style={{
                                    color: BRAND_COLOR,
                                    borderColor: BRAND_COLOR,
                                    backgroundColor: "transparent",
                                    transition: "all 0.3s ease",
                                }}
                                className={`
                                    border-2 font-medium
                                    hover:text-white
                                    hover:shadow-[0_0_10px_${BRAND_COLOR}50]
                                    transition-all duration-300
                                    dark:hover:brightness-110
                                `}
                                onMouseEnter={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = BRAND_COLOR;
                                    (e.currentTarget as HTMLButtonElement).style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    (e.currentTarget as HTMLButtonElement).style.backgroundColor = "transparent";
                                    (e.currentTarget as HTMLButtonElement).style.color = BRAND_COLOR;
                                }}
                            >
                                Manage Preferences
                            </Button>

                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onPress={handleDecline}
                                    className="text-neutral-700 dark:text-neutral-200 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                >
                                    Decline
                                </Button>

                                <Button
                                    size="sm"
                                    onPress={handleAcceptAll}
                                    style={{
                                        backgroundColor: BRAND_COLOR,
                                        color: "white",
                                        boxShadow: `0 0 15px ${BRAND_COLOR}50`,
                                    }}
                                    className="font-semibold hover:opacity-90 transition-all"
                                >
                                    Accept All
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Preferences Panel */}
                    <AnimatePresence>
                        {showPrefs && (
                            <motion.div
                                initial={{ y: "100%", opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                exit={{ y: "100%", opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                                className="fixed bottom-0 left-0 right-0 border-t shadow-2xl p-6 md:p-8 z-[10000]
                                           transition-colors duration-300
                                           bg-white dark:bg-neutral-900
                                           border-neutral-200 dark:border-neutral-800"
                            >
                                <div className="mx-auto max-w-4xl">
                                    <h3
                                        className="text-lg font-semibold mb-4"
                                        style={{ color: BRAND_COLOR }}
                                    >
                                        Cookie Preferences
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-neutral-100">
                                                    Essential Cookies
                                                </p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    Required for basic website functionality.
                                                </p>
                                            </div>
                                            <Switch isSelected isDisabled />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-neutral-100">
                                                    Analytics Cookies
                                                </p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    Help us understand how our site is used.
                                                </p>
                                            </div>
                                            <Switch
                                                isSelected={analytics}
                                                onValueChange={setAnalytics}
                                                color="primary"
                                            />
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-medium text-neutral-800 dark:text-neutral-100">
                                                    Marketing Cookies
                                                </p>
                                                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                                                    Used for personalized ads and content.
                                                </p>
                                            </div>
                                            <Switch
                                                isSelected={marketing}
                                                onValueChange={setMarketing}
                                                color="secondary"
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end mt-6 gap-3">
                                        <Button
                                            variant="ghost"
                                            onPress={() => setShowPrefs(false)}
                                            className="text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800"
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            onPress={handleSavePreferences}
                                            style={{
                                                backgroundColor: BRAND_COLOR,
                                                color: "white",
                                                boxShadow: `0 0 15px ${BRAND_COLOR}50`,
                                            }}
                                            className="font-semibold hover:opacity-90 transition-all"
                                        >
                                            Save Preferences
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
