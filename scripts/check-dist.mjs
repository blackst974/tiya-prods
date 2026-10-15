// Vérifie les chemins des ressources locales du site construit (dossier dist/).
// - Détecte le « base » réellement utilisé par Vite à partir du script principal de index.html.
// - Contrôle dans tous les fichiers .html et .css que chaque chemin commençant par « / »
//   reste sous ce base et pointe vers un fichier qui existe dans dist/.
// Aucune dépendance : uniquement Node.js.

import { readFile, readdir } from 'node:fs/promises';
import { existsSync, statSync } from 'node:fs';
import path from 'node:path';

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await walk(full)));
    else files.push(full);
  }
  return files;
}

function referencesIn(file, text) {
  const refs = [];
  if (file.endsWith('.html')) {
    for (const match of text.matchAll(/\s(?:href|src)="([^"]+)"/g)) refs.push(match[1]);
    for (const match of text.matchAll(/\ssrcset="([^"]+)"/g)) {
      match[1].split(',').forEach((item) => refs.push(item.trim().split(/\s+/)[0]));
    }
  } else {
    for (const match of text.matchAll(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g)) refs.push(match[2]);
  }
  return refs.filter((ref) => ref.startsWith('/') && !ref.startsWith('//'));
}

export async function checkDist(dist) {
  const index = await readFile(path.join(dist, 'index.html'), 'utf8');
  const entry = index.match(/<script[^>]+src="([^"]*?)assets\/[^"]+\.js"/);
  const base = entry ? entry[1] : '/';

  const problems = [];
  let checked = 0;

  const files = (await walk(dist)).filter((file) => /\.(html|css)$/.test(file));
  for (const file of files) {
    const text = await readFile(file, 'utf8');
    for (const ref of new Set(referencesIn(file, text))) {
      checked += 1;
      const shown = path.relative(dist, file) || file;

      if (!ref.startsWith(base)) {
        problems.push(`${shown} : « ${ref} » ne commence pas par le base « ${base} »`);
        continue;
      }
      const clean = decodeURIComponent(ref.slice(base.length).split(/[?#]/)[0]);
      const target = path.join(dist, clean);
      const found =
        clean === ''
          ? existsSync(path.join(dist, 'index.html'))
          : existsSync(target) && (statSync(target).isFile() || existsSync(path.join(target, 'index.html')));
      if (!found) problems.push(`${shown} : « ${ref} » pointe vers un fichier absent de dist/`);
    }
  }

  return { base, checked, files: files.length, problems };
}
