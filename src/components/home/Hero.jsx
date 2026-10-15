import Button from '../ui/Button.jsx';
import YouTubePlayer from '../ui/YouTubePlayer.jsx';
import { site } from '../../config/site.js';
import { showreel } from '../../data/home.js';
import { buildYouTubeMedia } from '../../utils/youtube.js';
import { asset } from '../../utils/assetPath.js';

// Bande démo : uniquement si l'URL YouTube de data/home.js est valide.
const showreelMedia = showreel.url ? buildYouTubeMedia(showreel.url) : null;

export default function Hero() {
  const hasVideo = Boolean(showreelMedia);

  return (
    <section className="hero" aria-labelledby="hero-title">
      <div className="container hero__grid">
        <div className="hero__content">
          <p className="eyebrow hero-in" style={{ '--d': '80ms' }}>{site.tagline}</p>

          <h1 id="hero-title" className="hero__title hero-in" style={{ '--d': '180ms' }}>
            La créativité vidéo, <span className="gold-text">amplifiée par l'IA.</span>
          </h1>

          <p className="hero__lead hero-in" style={{ '--d': '300ms' }}>
            Tiya Prods associe direction créative, intelligence artificielle et savoir-faire en
            postproduction pour donner vie à des contenus vidéo pensés pour marquer les esprits.
          </p>

          <div className="hero__actions hero-in" style={{ '--d': '420ms' }}>
            <Button to="/portfolio" arrow>Explorer nos réalisations</Button>
            <Button to="/contact" variant="ghost">Parlons de votre projet</Button>
          </div>
        </div>

        <figure className="hero__visual hero-in" style={{ '--d': '300ms' }}>
          <div className={`hero-frame ${hasVideo ? 'hero-frame--video' : ''}`}>
            {hasVideo ? (
              <YouTubePlayer
                compact
                media={showreelMedia}
                title="Bande démo TIYA PRODS"
                thumbs={[showreelMedia.thumbMax, showreelMedia.thumbHq]}
              />
            ) : (
              <picture>
                <source type="image/webp" srcSet={asset('/images/logo-tiya-prods.webp')} />
                <img
                  src={asset('/images/logo-tiya-prods.jpg')}
                  alt={`Logo ${site.name} — ${site.tagline}`}
                  width="1536"
                  height="1024"
                  fetchpriority="high"
                  decoding="async"
                />
              </picture>
            )}
            <span className="hero-frame__corner hero-frame__corner--tl" aria-hidden="true" />
            <span className="hero-frame__corner hero-frame__corner--tr" aria-hidden="true" />
            <span className="hero-frame__corner hero-frame__corner--bl" aria-hidden="true" />
            <span className="hero-frame__corner hero-frame__corner--br" aria-hidden="true" />
          </div>
          <figcaption className="hero__caption">
            {hasVideo ? 'Bande démo — lue via YouTube après votre clic' : 'Bande démo — à venir'}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
