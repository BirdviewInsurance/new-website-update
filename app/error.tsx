"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div
      className="relative min-h-screen flex flex-col items-center justify-center text-center text-white px-6"
      style={{
        backgroundImage: "url('/images/error-bg.png')", // 🔹 Replace with your image path
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-black/70 to-primary/90 backdrop-blur-sm -z-10" />

      <div className="max-w-lg mx-auto space-y-6">
        <h2 className="text-4xl text-black md:text-5xl font-bold drop-shadow-lg">
          Something went wrong!
        </h2>
        <p className="text-black text-lg font-medium drop-shadow-lg">
          We encountered an unexpected error. You can try again or go back home.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-6">
          <button
            className="px-6 py-3 rounded-full bg-danger hover:bg-white/40 border border-white/30 
                       transition-all duration-300 text-white font-semibold"
            onClick={() => reset()}
          >
            🔄 Try Again
          </button>

          <a
            className="px-6 py-3 rounded-full bg-primary hover:bg-primary/80 text-white 
                       font-semibold transition-all duration-300"
            href="/"
          >
            Go Home
          </a>
        </div>
      </div>
    </div>
  );
}
