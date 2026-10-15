import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { site, navigation } from '../../config/site.js';
import Button from '../ui/Button.jsx';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle('no-scroll', open);
    const onKey = (e) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('no-scroll');
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const headerClass = ['site-header', scrolled ? 'is-scrolled' : '', open ? 'is-open' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <header className={headerClass}>
      <div className="container site-header__inner">
        <Link to="/" className="brand" aria-label={`${site.name} — accueil`}>
          <span className="brand__mark" aria-hidden="true" />
          <span className="brand__text">
            <strong>{site.name}</strong>
            <small>{site.tagline}</small>
          </span>
        </Link>

        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-controls="menu-principal"
          aria-label={open ? 'Fermer le menu' : 'Ouvrir le menu'}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav
          id="menu-principal"
          className={`site-nav ${open ? 'is-open' : ''}`}
          aria-label="Navigation principale"
        >
          <ul className="site-nav__list">
            {navigation.map((item, index) => (
              <li key={item.to}>
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) => `site-nav__link ${isActive ? 'is-active' : ''}`}
                >
                  <span>{String(index + 1).padStart(2, '0')}</span>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
          <Button to="/contact" size="small" className="site-nav__cta">
            Démarrer un projet
          </Button>
        </nav>
      </div>
    </header>
  );
}
