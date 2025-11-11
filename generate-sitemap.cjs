/* eslint-disable @typescript-eslint/no-var-requires */
const { generateSitemap } = require("next-sitemap");

(async () => {
  try {
    await generateSitemap({
      configPath: "./next-sitemap.config.js", // 👈 use compiled JS config
    });
    console.log("✅ Sitemap generated successfully");
  } catch (error) {
    console.error("❌ Failed to generate sitemap:", error);
    process.exit(1);
  }
})();

