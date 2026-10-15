import Reveal from './Reveal.jsx';

export default function PageHero({ eyebrow, title, lead, variant }) {
  const className = ['page-hero', variant ? `page-hero--${variant}` : ''].filter(Boolean).join(' ');
  return (
    <header className={className}>
      <div className="container">
        <Reveal>
          {eyebrow && <p className="eyebrow">{eyebrow}</p>}
          <h1 className="page-hero__title">{title}</h1>
          {lead && <p className="page-hero__lead">{lead}</p>}
        </Reveal>
      </div>
    </header>
  );
}
