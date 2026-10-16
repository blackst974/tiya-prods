import { Link } from 'react-router-dom';
import PageHero from '../components/ui/PageHero.jsx';
import PageCta from '../components/ui/PageCta.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import Button from '../components/ui/Button.jsx';
import YtThumb from '../components/ui/YtThumb.jsx';
import { services } from '../data/services.js';
import { allVideos } from '../utils/videoHelpers.js';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/pages-info.css';
import '../styles/services-visuals.css';

// Catégories du portfolio dont on peut tirer le visuel d'un service (dans l'ordre de préférence).
// Par défaut : la catégorie du service. Les services sans vidéo correspondante gardent le visuel graphique.
const COVER_CATEGORIES = {
  'documentaires-vlogs-tutoriels': ['documentaire', 'vlog', 'tutoriel'],
};

// Retourne la première vraie vidéo du portfolio qui correspond au service, ou null.
function findCoverVideo(service) {
  const categories = COVER_CATEGORIES[service.id] || (service.filter ? [service.filter] : []);
  for (const category of categories) {
    const match = allVideos.find((video) => video.category === category);
    if (match) return match;
  }
  return null;
}

export default function Services() {
  useDocumentMeta(
    'Services',
    'Publicités vidéo, UGC assisté par IA, avatars virtuels, clips, anime, storytelling, documentaires, montage et postproduction : les services de TIYA PRODS.'
  );

  return (
    <>
      <PageHero
        variant="long"
        eyebrow="Services"
        title="Des idées aux images. Des images aux histoires."
        lead="Tiya Prods associe créativité, intelligence artificielle et expertise en montage pour concevoir des contenus vidéo adaptés aux marques, aux entreprises et aux créateurs."
      />

      <nav className="anchor-nav" aria-label="Aller à un service">
        <div className="container">
          <ul className="anchor-nav__list">
            {services.map((service) => (
              <li key={service.id}>
                <a className="anchor-link" href={`#${service.id}`}>{service.short}</a>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {services.map((service, index) => {
        const number = String(index + 1).padStart(2, '0');
        const cover = findCoverVideo(service);
        return (
          <section
            key={service.id}
            id={service.id}
            className={`service ${index % 2 === 1 ? 'service--flip' : ''}`}
            aria-labelledby={`${service.id}-title`}
          >
            <div className="container service__grid">
              <Reveal
                className={`service__visual ${cover ? 'has-image' : ''}`}
                aria-hidden="true"
              >
                {cover && (
                  <>
                    <YtThumb className="service__img" sources={cover.thumbs} alt="" showFallback={false} />
                    <span className="service__veil" />
                  </>
                )}
                <span className="service__num">{number}</span>
                <span className="service__short">{service.short}</span>
                {cover && <span className="service__caption">Extrait du portfolio : {cover.title}</span>}
              </Reveal>

              <Reveal className="service__content" delay={100}>
                <h2 id={`${service.id}-title`} className="service__title">{service.title}</h2>
                <p className="service__desc">{service.description}</p>
                {service.note && <p className="service__note">{service.note}</p>}

                <div className="service__lists">
                  <div>
                    <h3 className="service__label">Répond à</h3>
                    <ul className="service__needs">
                      {service.needs.map((need) => (
                        <li key={need}>{need}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h3 className="service__label">Formats possibles</h3>
                    <ul className="service__tags">
                      {service.formats.map((format) => (
                        <li key={format}>{format}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <p className="service__scope">
                  Format, durée et livrables sont définis avec vous, selon votre projet.
                </p>

                <div className="service__actions">
                  <Button to={`/contact?projet=${service.projectType}`} arrow>
                    Discutons de votre projet
                  </Button>
                  {service.filter && (
                    <Link className="text-link" to={`/portfolio?categorie=${service.filter}`}>
                      Voir dans le portfolio
                    </Link>
                  )}
                </div>
              </Reveal>
            </div>
          </section>
        );
      })}

      <PageCta
        id="services-cta-title"
        title="Votre prochain projet commence par une idée."
        label="Parlons de votre projet"
      />
    </>
  );
}
