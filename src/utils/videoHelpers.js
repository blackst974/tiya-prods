import { categories } from '../data/categories.js';
import { videos } from '../data/videos.js';
import { normalizeVideos } from './videoModel.js';
import { asset } from './assetPath.js';

const { videos: normalized, issues } = normalizeVideos(videos);

if (import.meta.env.DEV) {
  issues.forEach((issue) =>
    console.warn(
      `[videos.js] Entrée n°${issue.index + 1}${issue.title ? ` « ${issue.title} »` : ''} ignorée : ${issue.message}.`
    )
  );
}

// Chaque vidéo expose :
//  - thumbs : miniatures à essayer dans l'ordre (la dernière valide est affichée)
//  - thumbnail : miniature fiable (utilisée comme fond des cartes d'expertise)
//  - thumbsFromYouTube : true si les miniatures sont chargées depuis les serveurs de YouTube
export const allVideos = normalized.map((video) => {
  const custom = video.customThumbnail ? asset(video.customThumbnail) : '';
  return {
    ...video,
    thumbs: custom ? [custom] : [video.media.thumbMax, video.media.thumbHq],
    thumbnail: custom || video.media.thumbHq,
    thumbsFromYouTube: !custom,
  };
});

export function getCategoryLabel(id) {
  const found = categories.find((c) => c.id === id);
  return found ? found.label : '';
}

export function getVideoById(id) {
  return allVideos.find((v) => v.id === id) || null;
}

export function getFeaturedVideos(limit = 6) {
  return allVideos.filter((v) => v.featured).slice(0, limit);
}

export function getCategoryCover(categoryId) {
  if (!categoryId) return null;
  const match = allVideos.find((v) => v.category === categoryId);
  return match ? match.thumbnail : null;
}

// Miniatures (à essayer dans l'ordre) de la première vidéo d'une catégorie, ou null s'il n'y en a pas.
export function getCategoryThumbs(categoryId) {
  if (!categoryId) return null;
  const match = allVideos.find((v) => v.category === categoryId);
  return match ? match.thumbs : null;
}

export function filterVideos(categoryId) {
  if (!categoryId || categoryId === 'all') return allVideos;
  return allVideos.filter((v) => v.category === categoryId);
}

export function countByCategory() {
  const counts = { all: allVideos.length };
  categories.forEach((c) => {
    if (c.id !== 'all') counts[c.id] = allVideos.filter((v) => v.category === c.id).length;
  });
  return counts;
}
