"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        __lc?: any;
        LiveChatWidget?: any;
    }
}

/**
 * Integrates LiveChat widget in a React app.
 * @param license - Your LiveChat license number
 */
export function useLiveChat(license: number) {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (document.getElementById("livechat-script")) return; // prevent duplicates

        // Set LiveChat configuration
        window.__lc = window.__lc || {};
        window.__lc.license = license;
        window.__lc.integration_name = "manual_onboarding";
        window.__lc.product_name = "livechat";

        // Inject script
        const script = document.createElement("script");
        script.id = "livechat-script";
        script.async = true;
        script.type = "text/javascript";
        script.src = "https://cdn.livechatinc.com/tracking.js";
        document.head.appendChild(script);

        return () => {
            // Cleanup if the component unmounts
            const existing = document.getElementById("livechat-script");
            if (existing) existing.remove();
            delete window.LiveChatWidget;
        };
    }, [license]);
}
