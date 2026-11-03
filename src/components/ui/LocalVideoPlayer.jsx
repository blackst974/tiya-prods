import { useEffect, useRef, useState } from 'react';
import YtThumb from './YtThumb.jsx';
import '../../styles/player.css';
import '../../styles/local-video.css';

// Lecteur pour une vidéo hébergée sur le site (fichier MP4).
// Une image avec un bouton de lecture est affichée d'abord ; le fichier vidéo n'est demandé qu'après le clic.
// Le clic du visiteur autorise la lecture avec le son.
export default function LocalVideoPlayer({ src, poster, title }) {
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!playing || !video) return;
    video.focus();
    const attempt = video.play();
    if (attempt && typeof attempt.catch === 'function') {
      // Si le navigateur refuse la lecture automatique, les contrôles permettent de la lancer.
      attempt.catch(() => {});
    }
  }, [playing]);

  return (
    <div className="yt-player yt-player--compact">
      <div className="yt-player__stage">
        {!playing && !failed && (
          <button
            type="button"
            className="yt-facade"
            onClick={() => setPlaying(true)}
            aria-label={`Lire la vidéo : ${title}`}
          >
            {poster ? (
              <YtThumb sources={[poster]} alt="" eager />
            ) : (
              <span className="yt-thumb-fallback" aria-hidden="true" />
            )}
            <span className="yt-facade__shade" aria-hidden="true" />
            <span className="yt-facade__play" aria-hidden="true">
              <svg viewBox="0 0 24 24" width="28" height="28">
                <path d="M8 5.5v13l11-6.5z" fill="currentColor" />
              </svg>
            </span>
            <span className="yt-facade__label" aria-hidden="true">Lancer la lecture</span>
          </button>
        )}

        {playing && !failed && (
          <video
            ref={videoRef}
            src={src}
            poster={poster || undefined}
            controls
            playsInline
            preload="auto"
            aria-label={title}
            onError={() => setFailed(true)}
          >
            Votre navigateur ne peut pas lire cette vidéo.
          </video>
        )}

        {failed && (
          <div className="yt-player__error" role="alert">
            <p className="yt-player__error-title">Cette vidéo ne peut pas être lue.</p>
            <p>Le fichier est introuvable ou son format n'est pas pris en charge par votre navigateur.</p>
          </div>
        )}
      </div>
    </div>
  );
}
