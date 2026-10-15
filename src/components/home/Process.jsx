import Section from '../ui/Section.jsx';
import Reveal from '../ui/Reveal.jsx';
import { steps } from '../../data/home.js';

export default function Process() {
  return (
    <Section
      id="methode"
      eyebrow="Méthode de production"
      title="De l'idée au livrable, en quatre temps."
    >
      <ol className="steps">
        {steps.map((step, index) => (
          <Reveal as="li" key={step.title} delay={index * 120} className="step">
            <span className="step__num" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
            <h3 className="step__title">{step.title}</h3>
            <p className="step__text">{step.text}</p>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
