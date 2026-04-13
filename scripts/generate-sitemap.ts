import { writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { blogPosts } from '../src/data/blogPosts';

const SITE_URL = 'https://ulagatkrg.kz';
const lastmod = new Date().toISOString().split('T')[0];

const staticRoutes = [
  { path: '/', changefreq: 'weekly', priority: '1.0' },
  { path: '/blog', changefreq: 'weekly', priority: '0.9' },
  { path: '/ensemble', changefreq: 'monthly', priority: '0.8' },
  { path: '/apply', changefreq: 'monthly', priority: '0.8' },
  { path: '/privacy', changefreq: 'yearly', priority: '0.3' },
  { path: '/terms', changefreq: 'yearly', priority: '0.3' },
];

const blogRoutes = blogPosts.map((post) => ({
  path: `/blog/${post.slug}`,
  changefreq: 'monthly',
  priority: '0.8',
}));

const routes = [...staticRoutes, ...blogRoutes];

const xmlBody = routes
  .map(
    (route) => `  <url>\n    <loc>${SITE_URL}${route.path}</loc>\n    <lastmod>${lastmod}</lastmod>\n    <changefreq>${route.changefreq}</changefreq>\n    <priority>${route.priority}</priority>\n  </url>`
  )
  .join('\n');

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${xmlBody}\n</urlset>\n`;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const sitemapPath = path.resolve(__dirname, '../public/sitemap.xml');

writeFileSync(sitemapPath, sitemap, 'utf8');
console.log(`Sitemap generated at ${sitemapPath}`);
