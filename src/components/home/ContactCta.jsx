import Reveal from '../ui/Reveal.jsx';
import Button from '../ui/Button.jsx';

export default function ContactCta() {
  return (
    <section className="cta" aria-labelledby="cta-title">
      <div className="container">
        <Reveal className="cta__inner">
          <p className="eyebrow cta__eyebrow">Contact</p>
          <h2 id="cta-title" className="cta__title">Un projet vidéo en tête ?</h2>
          <p className="cta__text">
            Parlons de votre idée et construisons ensemble le format adapté à vos objectifs.
          </p>
          <Button to="/contact" arrow>Parlons de votre projet</Button>
        </Reveal>
      </div>
    </section>
  );
}
