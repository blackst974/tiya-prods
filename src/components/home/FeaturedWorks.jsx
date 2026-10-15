import { Link } from 'react-router-dom';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';
import YtThumb from '../ui/YtThumb.jsx';
import { getFeaturedVideos, getCategoryLabel } from '../../utils/videoHelpers.js';
import { hideFeaturedWhenEmpty } from '../../data/home.js';

export default function FeaturedWorks() {
  const featured = getFeaturedVideos(6);

  if (featured.length === 0 && hideFeaturedWhenEmpty) return null;

  return (
    <Section
      id="selection"
      eyebrow="Réalisations"
      title="Sélection de réalisations"
      alt
    >
      {featured.length > 0 ? (
        <>
          <ul className="works">
            {featured.map((video, index) => (
              <Reveal as="li" key={video.id} delay={(index % 3) * 100}>
                <Link
                  to={`/portfolio?video=${encodeURIComponent(video.id)}`}
                  className="work"
                  aria-label={`${video.title} — ${getCategoryLabel(video.category)}`}
                >
                  <span className="work__thumb">
                    <YtThumb sources={video.thumbs} alt={`Miniature de la vidéo ${video.title}`} />
                    <span className="work__play" aria-hidden="true">▶</span>
                  </span>
                  <span className="work__meta">
                    <span className="work__cat">{getCategoryLabel(video.category)}</span>
                    <span className="work__title">{video.title}</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </ul>
          <div className="works__more">
            <Button to="/portfolio" variant="ghost" arrow>Voir tout le portfolio</Button>
          </div>
        </>
      ) : (
        <Reveal className="works-empty">
          <p className="works-empty__title">Les premières réalisations seront publiées ici.</p>
          <p className="works-empty__text">
            Cette sélection se remplit automatiquement avec les projets mis en avant.
          </p>
          <Button to="/portfolio" variant="ghost" arrow>Accéder au portfolio</Button>
        </Reveal>
      )}
    </Section>
  );
}
