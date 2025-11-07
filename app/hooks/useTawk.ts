"use client";

import { useEffect } from "react";

/**
 * Integrates the Tawk.to chat widget
 * @param propertyId - Your Tawk property ID
 * @param widgetId - Your Tawk widget ID
 */
export function useTawk(propertyId: string, widgetId: string) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (document.getElementById("tawk-script")) return; // prevent duplicates

        const script = document.createElement("script");
        script.id = "tawk-script";
        script.async = true;
        script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`;
        script.charset = "UTF-8";
        script.setAttribute("crossorigin", "*");
        document.body.appendChild(script);

        return () => {
            const existing = document.getElementById("tawk-script");
            if (existing) existing.remove();
            // @ts-ignore
            if (window.Tawk_API) delete window.Tawk_API;
        };
    }, [propertyId, widgetId]);
}
