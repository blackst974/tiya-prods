// Validation et normalisation des entrées de src/data/videos.js.
// Module « pur » (pas d'API Vite) : utilisé par le site ET par scripts/postbuild.mjs.

import { categories } from '../data/categories.js';
import { buildYouTubeMedia } from './youtube.js';

// Exclusion absolue : ce nom ne doit jamais apparaître dans le portfolio.
const BLOCKED = ['lumeaeclat'];

const simplify = (value = '') =>
  String(value)
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '');

const categoryList = categories.filter((c) => c.id !== 'all');

// Accepte l'identifiant (« avatar-ia ») ou le libellé (« Avatar IA »), sans tenir compte des accents ni de la casse.
export function resolveCategory(value) {
  const key = simplify(value);
  if (!key) return null;
  const found = categoryList.find((c) => simplify(c.id) === key || simplify(c.label) === key);
  return found ? found.id : null;
}

function toTags(value) {
  if (Array.isArray(value)) return value.map((t) => String(t).trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((t) => t.trim()).filter(Boolean);
  return [];
}

function isBlocked(raw) {
  const haystack = simplify(
    [raw.id, raw.title, raw.description, raw.url, raw.videoUrl, raw.thumbnail, toTags(raw.tags).join(' ')]
      .filter(Boolean)
      .join(' ')
  );
  return BLOCKED.some((word) => haystack.includes(word));
}

// Chemin local (/...) ou URL https uniquement, pour une miniature personnalisée facultative.
const isSafeImage = (value) => typeof value === 'string' && /^(\/(?!\/)|https:\/\/)/.test(value.trim());

// Retourne { videos, issues } : les entrées valides, et la liste des entrées ignorées avec la raison.
export function normalizeVideos(rawList) {
  const videos = [];
  const issues = [];
  const seen = new Set();

  (Array.isArray(rawList) ? rawList : []).forEach((raw, index) => {
    const reject = (message) => issues.push({ index, title: raw && raw.title ? String(raw.title) : '', message });
    try {
      if (!raw || typeof raw !== 'object') return reject('entrée vide ou invalide');
      if (isBlocked(raw)) return reject('exclue du portfolio (nom exclu)');

      const title = String(raw.title || '').trim();
      if (!title) return reject('titre manquant');

      const media = buildYouTubeMedia(raw.url ?? raw.videoUrl);
      if (!media) return reject('URL YouTube non reconnue (attendu : youtube.com/watch?v=…, youtu.be/…, /shorts/…)');

      const category = resolveCategory(raw.category);
      if (!category) {
        return reject(
          `catégorie inconnue « ${raw.category ?? ''} » (choisir parmi : ${categoryList.map((c) => c.id).join(', ')})`
        );
      }

      if (seen.has(media.id)) return reject('vidéo en double (même vidéo YouTube déjà présente)');
      seen.add(media.id);

      videos.push({
        id: media.id,
        title,
        category,
        description: String(raw.description || '').trim(),
        tags: toTags(raw.tags),
        featured: raw.featured === true,
        orientation: media.vertical || raw.orientation === 'vertical' ? 'vertical' : 'landscape',
        year: Number.isInteger(raw.year) ? raw.year : null,
        url: String(raw.url ?? raw.videoUrl).trim(),
        media,
        customThumbnail: isSafeImage(raw.thumbnail) ? raw.thumbnail.trim() : '',
      });
    } catch {
      reject('erreur inattendue');
    }
  });

  return { videos, issues };
}
