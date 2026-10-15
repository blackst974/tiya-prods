import Reveal from './Reveal.jsx';

export default function Section({
  id,
  eyebrow,
  title,
  lead,
  alt = false,
  className = '',
  children,
}) {
  return (
    <section id={id} className={`section ${alt ? 'section--alt' : ''} ${className}`.trim()}>
      <div className="container">
        {(eyebrow || title || lead) && (
          <Reveal className="section__head">
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            {title && <h2 className="section__title">{title}</h2>}
            {lead && <p className="section__lead">{lead}</p>}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
