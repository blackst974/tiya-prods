// Utilitaires YouTube : analyse des URL, miniatures et URL d'intégration.
// Module « pur » (aucun import, aucune API Vite) : utilisé par le site ET par scripts/postbuild.mjs.

const ID_RE = /^[\w-]{11}$/;
const HOSTS = new Set(['youtube.com', 'm.youtube.com', 'music.youtube.com', 'youtube-nocookie.com', 'youtu.be']);

// « 90 », « 90s », « 1m30s », « 1h2m3s » → nombre de secondes (0 si absent ou invalide).
function parseStart(value) {
  if (!value) return 0;
  const text = String(value).trim().toLowerCase();
  if (/^\d+$/.test(text)) return Math.min(Number(text), 86400);
  const match = text.match(/^(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?$/);
  if (!match || !(match[1] || match[2] || match[3])) return 0;
  const seconds = Number(match[1] || 0) * 3600 + Number(match[2] || 0) * 60 + Number(match[3] || 0);
  return Math.min(seconds, 86400);
}

// Retourne { id, start, short } ou null si l'URL n'est pas une URL de vidéo YouTube reconnue.
export function parseYouTube(input) {
  const value = String(input ?? '').trim();
  if (!value) return null;

  let url;
  try {
    url = new URL(/^[a-z][a-z0-9+.-]*:/i.test(value) ? value : `https://${value}`);
  } catch {
    return null;
  }
  if (url.protocol !== 'https:' && url.protocol !== 'http:') return null;

  const host = url.hostname.toLowerCase().replace(/^www\./, '');
  if (!HOSTS.has(host)) return null;

  const segments = url.pathname.split('/').filter(Boolean);
  let id = null;
  let short = false;

  if (host === 'youtu.be') {
    id = segments[0] || null;
  } else if (segments[0] === 'watch') {
    id = url.searchParams.get('v');
  } else if (['embed', 'shorts', 'live', 'v'].includes(segments[0])) {
    id = segments[1] || null;
    short = segments[0] === 'shorts';
  }

  if (!id || !ID_RE.test(id)) return null;

  const hashStart = new URLSearchParams(url.hash.replace(/^#/, '')).get('t');
  const start = parseStart(url.searchParams.get('t') || url.searchParams.get('start') || hashStart);

  return { id, start, short };
}

// URL d'intégration (domaine sans cookie de YouTube).
export function embedUrl(media, { autoplay = false, origin = '' } = {}) {
  const params = new URLSearchParams({ rel: '0', modestbranding: '1', playsinline: '1', enablejsapi: '1' });
  if (media.start > 0) params.set('start', String(media.start));
  if (autoplay) params.set('autoplay', '1');
  if (origin) params.set('origin', origin);
  return `https://www.youtube-nocookie.com/embed/${media.id}?${params.toString()}`;
}

// Regroupe tout ce qu'il faut pour afficher une vidéo YouTube, ou null si l'URL n'est pas valide.
export function buildYouTubeMedia(input) {
  const parsed = parseYouTube(input);
  if (!parsed) return null;
  return {
    id: parsed.id,
    start: parsed.start,
    vertical: parsed.short,
    watchUrl: `https://www.youtube.com/watch?v=${parsed.id}${parsed.start > 0 ? `&t=${parsed.start}s` : ''}`,
    thumbMax: `https://i.ytimg.com/vi/${parsed.id}/maxresdefault.jpg`,
    thumbHq: `https://i.ytimg.com/vi/${parsed.id}/hqdefault.jpg`,
  };
}
