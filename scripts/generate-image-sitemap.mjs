import { readdirSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const SITE = 'https://www.bombaymaroc.com';
const PUBLIC_DIR = join(process.cwd(), 'public');
const OUT = join(PUBLIC_DIR, 'sitemap-images.xml');
const EXTS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function walk(dir) {
  const out = [];
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) out.push(...walk(full));
    else if (EXTS.has(entry.slice(entry.lastIndexOf('.')).toLowerCase())) {
      // Skip obvious non-photo assets
      if (/favicon|logo|mark|test_page/i.test(entry)) continue;
      out.push(full);
    }
  }
  return out;
}

// Map file paths to the page most relevant for that image. Paths are
// locale-prefixed (/en/...) since the site is now split into /en/ + /fr/
// subdirectories — images are associated with the English route by
// default; add the French equivalents below.
function pageFor(relPath) {
  if (/menu_pdf|food_/i.test(relPath)) return '/en/menu';
  if (/chef_/i.test(relPath)) return '/en/chef';
  if (/hero_medina/i.test(relPath)) return '/en/locations/medina';
  if (/hero_casablanca/i.test(relPath)) return '/en/locations/casablanca';
  if (/hero_royal_lounge/i.test(relPath)) return '/en/locations/gueliz';
  if (/ambiance_luxury_table/i.test(relPath)) return '/en/catering';
  return '/en/gallery';
}

const files = walk(join(PUBLIC_DIR, 'images'));
const byPage = {};
for (const f of files) {
  const rel = f.slice(PUBLIC_DIR.length).replace(/\\/g, '/');
  const page = pageFor(rel);
  (byPage[page] ||= []).push(`${SITE}${rel}`);
}

const today = new Date().toISOString().slice(0, 10);
const urls = Object.entries(byPage)
  .map(
    ([page, images]) => `  <url>
    <loc>${SITE}${page}</loc>
    <lastmod>${today}</lastmod>
${images
  .map(
    (img) => `    <image:image>
      <image:loc>${img}</image:loc>
    </image:image>`
  )
  .join('\n')}
  </url>`
  )
  .join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
${urls}
</urlset>
`;

writeFileSync(OUT, xml);
console.log(`[image-sitemap] ${files.length} images -> sitemap-images.xml`);
