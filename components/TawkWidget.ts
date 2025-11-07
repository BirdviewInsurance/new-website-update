"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        Tawk_API?: Record<string, any>;
        Tawk_LoadStart?: Date;
    }
}

export default function TawkWidget() {
    useEffect(() => {
        // Avoid duplicate script injection
        if (document.getElementById("tawk-script")) return;

        const s1 = document.createElement("script");
        const s0 = document.getElementsByTagName("script")[0];

        s1.id = "tawk-script";
        s1.async = true;
        s1.src = "https://embed.tawk.to/6698d0b232dca6db2cb191f0/1i3fh201c";
        s1.charset = "UTF-8";
        s1.setAttribute("crossorigin", "*");

        s0.parentNode?.insertBefore(s1, s0);

        window.Tawk_LoadStart = new Date();

        return () => {
            // Optional cleanup on unmount
            const script = document.getElementById("tawk-script");
            if (script && script.parentNode) {
                script.parentNode.removeChild(script);
            }
            delete window.Tawk_API;
        };
    }, []);

    return null;
}
