import Reveal from './Reveal.jsx';
import Button from './Button.jsx';

export default function PageCta({ id, title, text, label, to = '/contact' }) {
  return (
    <section className="cta cta--page" aria-labelledby={id}>
      <div className="container">
        <Reveal className="cta__inner">
          <p className="eyebrow cta__eyebrow">Contact</p>
          <h2 id={id} className="cta__title">{title}</h2>
          {text && <p className="cta__text">{text}</p>}
          <Button to={to} arrow>{label}</Button>
        </Reveal>
      </div>
    </section>
  );
}
