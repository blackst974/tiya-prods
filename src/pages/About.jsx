import PageHero from '../components/ui/PageHero.jsx';
import PageCta from '../components/ui/PageCta.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/pages-info.css';

const icons = {
  creative: (
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <rect x="8" y="12" width="40" height="32" />
      <path d="M8 22h40M20 12v32" />
      <circle cx="34" cy="33" r="5" />
    </svg>
  ),
  ai: (
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <circle cx="12" cy="28" r="4" />
      <circle cx="28" cy="12" r="4" />
      <circle cx="28" cy="44" r="4" />
      <circle cx="44" cy="28" r="4" />
      <path d="M15.5 26l9-12M15.5 30l9 12M31.5 14l9 12M31.5 42l9-12" />
    </svg>
  ),
  edit: (
    <svg viewBox="0 0 56 56" aria-hidden="true">
      <path d="M6 16h28M6 28h40M6 40h20" />
      <path d="M40 8v40M35 8h10" />
    </svg>
  ),
};

const pillars = [
  {
    key: 'creative',
    title: 'Direction créative',
    text: 'Construire un concept, définir une intention visuelle et donner une direction claire au contenu.',
  },
  {
    key: 'ai',
    title: 'Intelligence artificielle',
    text: 'Explorer des possibilités de création et de production adaptées au format, au budget et aux objectifs du projet.',
  },
  {
    key: 'edit',
    title: 'Montage et finition',
    text: 'Travailler le rythme, la continuité, le son et la cohérence finale pour obtenir un contenu exploitable.',
  },
];

export default function About() {
  useDocumentMeta(
    'À propos',
    'TIYA PRODS est un studio indépendant qui associe savoir-faire audiovisuel et outils d’intelligence artificielle.'
  );

  return (
    <>
      <PageHero
        variant="long"
        eyebrow="Le studio"
        title="La technologie ouvre le champ des possibles. La réalisation leur donne du sens."
        lead="Tiya Prods explore de nouvelles façons de concevoir et de produire des vidéos. L'intelligence artificielle permet d'expérimenter de nouveaux univers visuels ; le travail de conception, le montage et la postproduction donnent à chaque projet sa cohérence."
      />

      <section className="section" aria-labelledby="piliers-title">
        <div className="container">
          <Reveal className="section__head">
            <p className="eyebrow">Les piliers du studio</p>
            <h2 id="piliers-title" className="section__title">Trois façons de faire exister une vidéo.</h2>
          </Reveal>

          <ul className="pillar-rows">
            {pillars.map((pillar, index) => (
              <Reveal as="li" key={pillar.key} delay={index * 100} className="pillar-row">
                <span className="pillar-row__icon">{icons[pillar.key]}</span>
                <span className="pillar-row__num" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="pillar-row__title">{pillar.title}</h3>
                <p className="pillar-row__text">{pillar.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="statement" aria-label="Positionnement du studio">
        <div className="container">
          <Reveal>
            <p className="eyebrow">Positionnement</p>
            <blockquote className="statement__text">
              L'IA est un <span className="gold-text">outil de production.</span> La réflexion
              créative, la sélection des images et le montage restent essentiels.
            </blockquote>
            <p className="statement__sub">
              Tiya Prods est un studio indépendant : il associe savoir-faire audiovisuel et outils
              d'intelligence artificielle pour concevoir des vidéos adaptées à chaque projet.
            </p>
          </Reveal>
        </div>
      </section>

      <PageCta id="about-cta-title" title="Imaginons votre prochain contenu." label="Nous contacter" />
    </>
  );
}
