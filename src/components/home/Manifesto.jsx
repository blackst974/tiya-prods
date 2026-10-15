import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import { pillars } from '../../data/home.js';

export default function Manifesto() {
  return (
    <Section
      eyebrow="Manifeste"
      title={<>L'IA génère. <span className="gold-text">Tiya Prods réalise.</span></>}
      lead="La technologie ouvre de nouvelles possibilités. Le regard créatif, le storytelling, le rythme et la postproduction transforment ces possibilités en véritables contenus audiovisuels."
      alt
    >
      <ul className="pillars">
        {pillars.map((pillar, index) => (
          <Reveal as="li" key={pillar.title} delay={index * 120} className="pillar">
            <span className="pillar__num">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="pillar__title">{pillar.title}</h3>
            <p className="pillar__text">{pillar.text}</p>
          </Reveal>
        ))}
      </ul>
    </Section>
  );
}
