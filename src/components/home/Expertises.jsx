import { Link } from 'react-router-dom';
import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import YtThumb from '../ui/YtThumb.jsx';
import { expertises } from '../../data/home.js';
import { getCategoryThumbs } from '../../utils/videoHelpers.js';

export default function Expertises() {
  return (
    <Section
      id="expertises"
      eyebrow="Nos expertises"
      title="Des formats pour chaque ambition."
      lead="Du contenu publicitaire au récit documentaire, chaque format est pensé avec la même exigence de réalisation."
    >
      <ul className="expertises">
        {expertises.map((item, index) => {
          const thumbs = getCategoryThumbs(item.filter);
          const to = item.filter ? `/portfolio?categorie=${item.filter}` : '/portfolio';
          return (
            <Reveal as="li" key={item.id} delay={(index % 4) * 90}>
              <Link to={to} className="expertise">
                {thumbs && (
                  <YtThumb className="expertise__cover" sources={thumbs} showFallback={false} />
                )}
                <span className="expertise__shade" aria-hidden="true" />
                <span className="expertise__num">{String(index + 1).padStart(2, '0')}</span>
                <span className="expertise__body">
                  <span className="expertise__title">{item.title}</span>
                  <span className="expertise__text">{item.description}</span>
                  <span className="expertise__link">
                    Voir dans le portfolio <span aria-hidden="true">→</span>
                  </span>
                </span>
              </Link>
            </Reveal>
          );
        })}
      </ul>
    </Section>
  );
}
