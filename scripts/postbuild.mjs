// Étape exécutée après `vite build` : génère, dans dist/, une page HTML par route
// (métadonnées SEO correctes pour chaque URL), 404.html, robots.txt et sitemap.xml.
// Vérifie aussi les chemins des ressources et les vidéos de src/data/videos.js.
// Aucune dépendance : uniquement Node.js.

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { checkDist } from './check-dist.mjs';

const root = process.cwd();
const dist = path.join(root, 'dist');
const load = (file) => import(pathToFileURL(path.join(root, file)).href);

const { site } = await load('src/config/site.js');
const { seo, routes, notFoundSeo } = await load('src/data/seo.js');
const { legalFields } = await load('src/data/legalFields.js');
const { videos } = await load('src/data/videos.js');
const { normalizeVideos } = await load('src/utils/videoModel.js');

const indexPath = path.join(dist, 'index.html');
if (!existsSync(indexPath)) {
  console.error('[postbuild] dist/index.html introuvable : lancez d’abord « vite build ».');
  process.exit(1);
}

const origin = String(site.url || '').trim().replace(/\/+$/, '');
const esc = (value) =>
  String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const template = await readFile(indexPath, 'utf8');

const strip = (html) =>
  html
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta\s+name="description"[^>]*>/gi, '')
    .replace(/<meta\s+name="robots"[^>]*>/gi, '')
    .replace(/<meta\s+property="og:[^"]*"[^>]*>/gi, '')
    .replace(/<meta\s+name="twitter:[^"]*"[^>]*>/gi, '')
    .replace(/<link\s+rel="canonical"[^>]*>/gi, '')
    .replace(/<script\s+type="application\/ld\+json">[\s\S]*?<\/script>/gi, '');

function headFor(route, entry, { noindex = false } = {}) {
  const url = origin ? `${origin}${route === '/' ? '/' : route}` : '';
  const image = origin ? `${origin}/images/og-cover.jpg` : '';
  const lines = [
    `<title>${esc(entry.title)}</title>`,
    `<meta name="description" content="${esc(entry.description)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(site.name)}" />`,
    `<meta property="og:locale" content="fr_FR" />`,
    `<meta property="og:title" content="${esc(entry.title)}" />`,
    `<meta property="og:description" content="${esc(entry.description)}" />`,
  ];
  if (noindex) lines.push(`<meta name="robots" content="noindex" />`);
  if (url && !noindex) {
    lines.push(`<link rel="canonical" href="${esc(url)}" />`);
    lines.push(`<meta property="og:url" content="${esc(url)}" />`);
  }
  if (image) {
    lines.push(`<meta property="og:image" content="${esc(image)}" />`);
    lines.push(`<meta property="og:image:alt" content="${esc(`Logo ${site.name} — ${site.tagline}`)}" />`);
    lines.push(`<meta name="twitter:card" content="summary_large_image" />`);
  }
  if (route === '/' && origin && !noindex) {
    const data = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: site.name,
      url: `${origin}/`,
      logo: `${origin}/images/logo-tiya-prods.jpg`,
    };
    if (site.email) data.email = site.email;
    const sameAs = (site.socials || []).map((s) => s.url).filter(Boolean);
    if (sameAs.length) data.sameAs = sameAs;
    lines.push(
      `<script type="application/ld+json">${JSON.stringify(data).replace(/</g, '\\u003c')}</script>`
    );
  }
  return lines.map((line) => `    ${line}`).join('\n');
}

const build = (route, entry, options) =>
  strip(template).replace('</head>', `${headFor(route, entry, options)}\n  </head>`);

for (const route of routes) {
  const html = build(route, seo[route]);
  if (route === '/') {
    await writeFile(indexPath, html);
  } else {
    const dir = path.join(dist, route.replace(/^\//, ''));
    await mkdir(dir, { recursive: true });
    await writeFile(path.join(dir, 'index.html'), html);
  }
}
await writeFile(path.join(dist, '404.html'), build('/404', notFoundSeo, { noindex: true }));

const robots = ['User-agent: *', 'Allow: /'];
if (origin) robots.push('', `Sitemap: ${origin}/sitemap.xml`);
await writeFile(path.join(dist, 'robots.txt'), `${robots.join('\n')}\n`);

if (origin) {
  const urls = routes
    .map((route) => `  <url><loc>${esc(`${origin}${route === '/' ? '/' : route}`)}</loc></url>`)
    .join('\n');
  await writeFile(
    path.join(dist, 'sitemap.xml'),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`
  );
}

console.log(`[postbuild] ${routes.length} pages générées + 404.html + robots.txt${origin ? ' + sitemap.xml' : ''}.`);

// Vérification des chemins des ressources (CSS, JS, images, icônes) dans dist/.
const report = await checkDist(dist);
console.log(
  `[postbuild] Chemins : base « ${report.base} », ${report.checked} référence(s) locale(s) vérifiée(s) dans ${report.files} fichier(s) HTML/CSS.`
);
if (report.problems.length) {
  console.warn(`[postbuild] ERREUR : ${report.problems.length} chemin(s) de ressource incorrect(s) :`);
  report.problems.forEach((problem) => console.warn(`  - ${problem}`));
}

// Vérification du portfolio (affichée dans le terminal uniquement).
const { videos: validVideos, issues } = normalizeVideos(videos);
const featuredCount = validVideos.filter((v) => v.featured).length;
console.log(
  `[postbuild] Portfolio : ${validVideos.length} vidéo(s) valide(s), dont ${featuredCount} mise(s) en avant.`
);
if (issues.length) {
  console.warn(`[postbuild] ATTENTION : ${issues.length} entrée(s) de src/data/videos.js ignorée(s) :`);
  issues.forEach((issue) =>
    console.warn(`  - entrée n°${issue.index + 1}${issue.title ? ` « ${issue.title} »` : ''} : ${issue.message}`)
  );
}
if (featuredCount > 6) {
  console.warn('[postbuild] Note : seules les 6 premières vidéos mises en avant s’affichent sur l’accueil.');
}

// Rappels avant publication (affichés dans le terminal uniquement).
const get = (object, dotted) => dotted.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), object);
const missing = legalFields.filter((field) => !String(get(site, field.path) || '').trim());
if (!origin) {
  console.warn('[postbuild] ATTENTION : site.url est vide → pas de sitemap.xml, de balise canonical ni d’image Open Graph.');
}
if (missing.length) {
  console.warn('[postbuild] Informations à compléter dans src/config/site.js avant publication :');
  missing.forEach((field) =>
    console.warn(`  - ${field.label}${field.required ? '' : ' (selon votre situation)'}`)
  );
}
