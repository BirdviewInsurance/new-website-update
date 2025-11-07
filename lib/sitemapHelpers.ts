export async function getDynamicUrls(): Promise<string[]> {
  // Example: Replace with your API or CMS fetch logic
  const services = [
    { slug: "health-insurance" },
    { slug: "life-cover" },
    { slug: "group-policy" },
  ];

  // Return full path list
  return services.map((s) => `/services/${s.slug}`);
}
