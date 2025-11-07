import type { IConfig } from 'next-sitemap';
import { getDynamicUrls } from './lib/sitemapHelpers';

export default async function config(): Promise<IConfig> {
    // Example: fetch dynamic URLs (services, insurance plans, etc.)
    const dynamicPaths = await getDynamicUrls();

    return {
        siteUrl: 'https://www.birdviewmicroinsurance.com', // ✅ Your domain
        generateRobotsTxt: true,
        sitemapSize: 7000,
        exclude: ['/admin/*', '/dashboard/*'], // optional: exclude secure routes
        changefreq: 'weekly',
        priority: 0.7,

        transform: async (config, path) => ({
            loc: path,
            changefreq: path === '/' ? 'daily' : config.changefreq,
            priority: path === '/' ? 1.0 : config.priority,
            lastmod: new Date().toISOString(),
        }),

        // ✅ Add dynamically generated URLs
        additionalPaths: async (config) => {
            return dynamicPaths.map((path) => ({
                loc: path,
                changefreq: 'weekly',
                priority: 0.8,
                lastmod: new Date().toISOString(),
            }));
        },
    };
}
