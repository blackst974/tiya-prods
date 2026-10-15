import { useState } from 'react';
import '../../styles/player.css';

// Affiche la première miniature disponible parmi `sources`.
// Si aucune ne se charge, affiche un fond neutre aux couleurs du site (sauf si showFallback est false).
// Les miniatures YouTube manquantes (maxresdefault) renvoient une image grise de 120 px de large :
// on la détecte et on passe à la suivante.
export default function YtThumb({ sources, alt = '', eager = false, className = '', showFallback = true }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState(false);
  const src = sources && sources[index];

  const next = () => {
    if (sources && index < sources.length - 1) setIndex(index + 1);
    else setFailed(true);
  };

  if (!src || failed) {
    return showFallback ? <span className="yt-thumb-fallback" aria-hidden="true" /> : null;
  }

  return (
    <img
      className={className || undefined}
      src={src}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      referrerPolicy="no-referrer"
      onError={next}
      onLoad={(event) => {
        const isYouTubeImage = src.includes('i.ytimg.com');
        if (isYouTubeImage && event.currentTarget.naturalWidth <= 120) next();
      }}
    />
  );
}
