"use client";
import React from "react";

export function TikTokColourIcon({ className }: { className?: string }) {
  return (
    <svg
      aria-label="TikTok"
      className={className}
      fill="currentColor"
      role="img"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.8 2h3.2c.2 1 .8 2 1.6 2.8.9.9 2.1 1.4 3.4 1.6v3.3c-1.3 0-2.6-.3-3.8-.9v6.8c0 3.7-3 6.7-6.7 6.7-1.8 0-3.5-.7-4.8-2s-2-3-2-4.8c0-3.7 3-6.7 6.7-6.7.2 0 .4 0 .6.1v3.4c-.2 0-.4-.1-.6-.1-1.8 0-3.3 1.5-3.3 3.3 0 .9.3 1.7 1 2.4.6.6 1.5 1 2.4 1 1.8 0 3.3-1.5 3.3-3.3V2z" />
    </svg>
  );
}
