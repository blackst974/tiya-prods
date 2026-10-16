import { useEffect, useRef, useState } from 'react';
import { embedUrl } from '../../utils/youtube.js';
import YtThumb from './YtThumb.jsx';
import '../../styles/player.css';

const EMBED_ORIGIN = 'https://www.youtube-nocookie.com';

// Codes d'erreur renvoyés par le lecteur YouTube.
function describeError(code) {
  switch (code) {
    case 2:
      return { text: 'Le lien de cette vidéo n’est pas valide.', canOpen: false };
    case 5:
      return { text: 'Le lecteur n’a pas pu lire cette vidéo dans ce navigateur.', canOpen: true };
    case 100:
      return { text: 'Cette vidéo est introuvable : elle a peut-être été supprimée ou rendue privée.', canOpen: false };
    case 101:
    case 150:
      return { text: 'Le propriétaire de cette vidéo n’autorise pas sa lecture sur d’autres sites.', canOpen: true };
    case 153:
      return { text: 'YouTube n’a pas pu valider l’origine de la page. Essayez d’ouvrir la vidéo sur YouTube.', canOpen: true };
    default:
      return { text: 'Cette vidéo ne peut pas être lue ici.', canOpen: true };
  }
}

// Lecteur YouTube « à la demande » : une miniature avec un bouton de lecture est affichée d'abord.
// Le lecteur YouTube n'est chargé qu'après un clic du visiteur.
export default function YouTubePlayer({ media, title, thumbs, vertical = false, compact = false }) {
  const [playing, setPlaying] = useState(false);
  const [errorCode, setErrorCode] = useState(null);
  const iframeRef = useRef(null);

  // Écoute les messages du lecteur (erreurs : vidéo privée, intégration désactivée, etc.)
  // et désactive les sous-titres affichés par défaut.
  useEffect(() => {
    if (!playing) return undefined;

    let heardPlayer = false;
    const timeouts = [];

    // Demande au lecteur de décharger le module de sous-titres (au mieux : la méthode n'est pas documentée par YouTube).
    const disableCaptions = () => {
      const frame = iframeRef.current;
      if (!frame || !frame.contentWindow) return;
      ['captions', 'cc'].forEach((module) => {
        frame.contentWindow.postMessage(
          JSON.stringify({ event: 'command', func: 'unloadModule', args: [module], id: 1, channel: 'widget' }),
          EMBED_ORIGIN
        );
      });
    };

    const onMessage = (event) => {
      const frame = iframeRef.current;
      if (event.origin !== EMBED_ORIGIN || !frame || event.source !== frame.contentWindow) return;

      if (!heardPlayer) {
        heardPlayer = true;
        [0, 400, 1200, 2500].forEach((delay) => timeouts.push(window.setTimeout(disableCaptions, delay)));
      }

      let data = event.data;
      if (typeof data === 'string') {
        try {
          data = JSON.parse(data);
        } catch {
          return;
        }
      }
      if (data && data.event === 'onError') setErrorCode(Number(data.info) || 0);
    };
    window.addEventListener('message', onMessage);

    // Demande au lecteur de nous envoyer ses événements (répété brièvement le temps qu'il soit prêt).
    let tries = 0;
    const timer = window.setInterval(() => {
      const frame = iframeRef.current;
      tries += 1;
      if (heardPlayer || tries > 20 || !frame || !frame.contentWindow) {
        window.clearInterval(timer);
        return;
      }
      frame.contentWindow.postMessage(
        JSON.stringify({ event: 'listening', id: 1, channel: 'widget' }),
        EMBED_ORIGIN
      );
    }, 400);

    return () => {
      window.removeEventListener('message', onMessage);
      window.clearInterval(timer);
      timeouts.forEach((id) => window.clearTimeout(id));
    };
  }, [playing]);

  // Déplace le focus vers le lecteur une fois chargé (utilisation au clavier).
  useEffect(() => {
    if (playing && iframeRef.current) iframeRef.current.focus();
  }, [playing]);

  const error = errorCode !== null ? describeError(errorCode) : null;
  const classes = ['yt-player', vertical ? 'yt-player--vertical' : '', compact ? 'yt-player--compact' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div className={classes}>
      <div className="yt-player__stage">
        {!playing && !error && (
          <button type="button" className="yt-facade" onClick={() => setPlaying(true)} aria-label={`Lire la vidéo : ${title}`}>
            <YtThumb sources={thumbs} alt="" eager />
            <span className="yt-facade__shade" aria-hidden="true" />
            <span className="yt-facade__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="yt-facade__label" aria-hidden="true">Lancer la lecture</span>
          </button>
        )}

        {playing && !error && (
          <iframe
            ref={iframeRef}
            src={embedUrl(media, { autoplay: true, origin: window.location.origin })}
            title={`Lecteur YouTube : ${title}`}
            allow="autoplay; fullscreen; picture-in-picture; encrypted-media"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
          />
        )}

        {error && (
          <div className="yt-player__error" role="alert">
            <p className="yt-player__error-title">Cette vidéo ne peut pas être lue ici.</p>
            <p>{error.text}</p>
            {error.canOpen && (
              <a className="btn btn--ghost btn--small" href={media.watchUrl} target="_blank" rel="noopener noreferrer">
                <span>Ouvrir sur YouTube</span>
              </a>
            )}
          </div>
        )}
      </div>

      {!compact && (
        <p className="yt-player__note">
          Vidéo lue via YouTube, uniquement après votre clic.{' '}
          <a href={media.watchUrl} target="_blank" rel="noopener noreferrer">
            Ouvrir sur YouTube <span aria-hidden="true">↗</span>
          </a>
        </p>
      )}
    </div>
  );
}
