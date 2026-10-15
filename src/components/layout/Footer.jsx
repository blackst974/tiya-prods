import { Link } from 'react-router-dom';
import { site, navigation, legalLinks } from '../../config/site.js';

export default function Footer() {
  const socials = site.socials.filter((s) => s.url);
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="container">
        <p className="site-footer__wordmark gold-text" aria-hidden="true">
          {site.name}
        </p>

        <div className="site-footer__grid">
          <div>
            <Link to="/" className="footer-brand" aria-label={`${site.name} — accueil`}>
              <span className="footer-brand__mark" aria-hidden="true" />
              <span className="footer-brand__text">
                <strong>{site.name}</strong>
                <small>{site.tagline}</small>
              </span>
            </Link>
            <p className="site-footer__intro">
              Studio indépendant de montage vidéo et de production assistée par IA : publicités,
              UGC, avatars IA et créations audiovisuelles.
            </p>
          </div>

          <nav aria-label="Navigation du pied de page">
            <h2 className="site-footer__title">Navigation</h2>
            <ul className="site-footer__list">
              {navigation.map((item) => (
                <li key={item.to}>
                  <Link to={item.to}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="site-footer__title">Contact</h2>
            <ul className="site-footer__list">
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`}>{site.email}</a>
                </li>
              )}
              {socials.map((s) => (
                <li key={s.label}>
                  <a href={s.url} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </li>
              ))}
              {!site.email && socials.length === 0 && (
                <li>
                  <Link to="/contact">Page de contact</Link>
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="site-footer__bottom">
          <span>© {year} {site.name}. Tous droits réservés.</span>
          <ul className="site-footer__list" style={{ display: 'flex', gap: '1.5rem' }}>
            {legalLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
