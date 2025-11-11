// next-sitemap.config.js
const { getDynamicUrls } = require("./lib/sitemapHelpers");

module.exports = async () => {
  console.log("✨ [next-sitemap] Loading dynamic URLs...");

  // Fetch dynamic URLs
  const dynamicPathsRaw = await getDynamicUrls();
  const dynamicPaths = Array.isArray(dynamicPathsRaw) ? dynamicPathsRaw : [];

  console.log("✨ [next-sitemap] Dynamic URLs fetched:", dynamicPaths);

  const config = {
    siteUrl: "https://www.birdviewmicroinsurance.com",
    generateRobotsTxt: true,
    sitemapSize: 7000,
    changefreq: "daily",
    priority: 0.7,

    transform: async (config, path) => ({
      loc: path,
      changefreq: path === "/" ? "daily" : config.changefreq,
      priority: path === "/" ? 1.0 : config.priority,
      lastmod: new Date().toISOString(),
    }),

    additionalPaths: async () =>
      dynamicPaths.map((path) => ({
        loc: path,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      })),

    exclude: [
      "/404",
      "/500",
      "/_error",
      "/_not-found",
      "/api/*",
      "/forms/*",
      "/Claims/*",
      "/dashboard/*",
    ],
  };

  console.log("✅ [next-sitemap] Configuration prepared");
  return config;
};
