"use client";

import { useEffect } from "react";

declare global {
    interface Window {
        __lc?: any;
        LiveChatWidget?: any;
    }
}

export default function LiveChatWidget() {
    useEffect(() => {
        if (typeof window === "undefined") return;
        if (document.getElementById("livechat-script")) return;

        window.__lc = window.__lc || {};
        window.__lc.license = 19361155;
        window.__lc.integration_name = "manual_channels";
        window.__lc.product_name = "livechat";

        const script = document.createElement("script");
        script.id = "livechat-script";
        script.async = true;
        script.type = "text/javascript";
        script.src = "https://cdn.livechatinc.com/tracking.js";
        document.head.appendChild(script);

        return () => {
            const existing = document.getElementById("livechat-script");
            if (existing) existing.remove();
            delete window.LiveChatWidget;
        };
    }, []);

    return (
        <div
            dangerouslySetInnerHTML={{
                __html: `
          <noscript>
            <a href="https://www.livechat.com/chat-with/19361155/" rel="nofollow">
              Chat with us
            </a>
          </noscript>
        `,
            }}
        />
    );
}
