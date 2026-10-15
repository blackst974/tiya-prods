// Préfixe les chemins locaux avec le « base » de Vite (utile si le site est publié dans un sous-répertoire).
const BASE = (import.meta.env.BASE_URL || '/').replace(/\/$/, '');

export function asset(path) {
  if (!path || typeof path !== 'string') return path;
  if (/^(https?:)?\/\//i.test(path)) return path;
  return `${BASE}${path.startsWith('/') ? path : `/${path}`}`;
}
