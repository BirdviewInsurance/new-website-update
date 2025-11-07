/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
  
    images: {
      domains: [
        "images.unsplash.com",
        "res.cloudinary.com",
        "cdn.pixabay.com",
        "birdviewmicroinsurance.com",
      ],
    },
  
    // ✅ Skip ESLint during production builds
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig;
  