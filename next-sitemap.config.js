/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.bombaymaroc.com',
  generateRobotsTxt: true,
  generateIndexSitemap: true,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      { userAgent: '*', allow: '/' },
      { userAgent: '*', disallow: ['/api/', '/_next/', '/static/', '/private/'] },
    ],
    additionalSitemaps: ['https://www.bombaymaroc.com/sitemap-images.xml'],
  },
  transform: async (config, path) => {
    // Paths are now locale-prefixed (/en/menu, /fr/menu, etc.) after the
    // /en/ + /fr/ subdirectory restructure — map against the un-prefixed
    // tail so both locales get correct priority/changefreq.
    const stripLocale = (p) => p.replace(/^\/(en|fr)(\/|$)/, '/');
    const bare = stripLocale(path);

    const priorityMap = {
      '/': 1.0,
      '/menu': 0.9,
      '/about': 0.8,
      '/catering': 0.8,
      '/ramadan': 0.8,
      '/locations': 0.8,
      '/locations/gueliz': 0.9,
      '/locations/medina': 0.9,
      '/locations/casablanca': 0.9,
      '/chef': 0.7,
      '/gallery': 0.6,
      '/blog': 0.7,
    };
    const changefreqMap = {
      '/': 'weekly',
      '/menu': 'weekly',
      '/ramadan': 'daily',
      '/locations/gueliz': 'weekly',
      '/locations/medina': 'weekly',
      '/locations/casablanca': 'weekly',
      '/blog': 'weekly',
    };
    return {
      loc: path,
      changefreq: changefreqMap[bare] || 'monthly',
      priority: priorityMap[bare] || 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
