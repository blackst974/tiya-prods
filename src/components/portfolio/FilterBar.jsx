import { useEffect, useRef } from 'react';

export default function FilterBar({ categories, active, counts, onChange }) {
  const scrollerRef = useRef(null);

  // Garde le filtre actif visible dans la barre défilante (mobile).
  useEffect(() => {
    const bar = scrollerRef.current;
    const el = bar && bar.querySelector('[aria-pressed="true"]');
    if (!bar || !el) return;
    const left = el.offsetLeft - (bar.clientWidth - el.offsetWidth) / 2;
    bar.scrollTo({ left: Math.max(0, left), behavior: 'smooth' });
  }, [active]);

  return (
    <div className="filter-bar">
      <div className="container">
        <div
          className="filter-bar__scroller"
          ref={scrollerRef}
          role="group"
          aria-label="Filtrer les vidéos par catégorie"
        >
          {categories.map((c) => {
            const isActive = active === c.id;
            return (
              <button
                key={c.id}
                type="button"
                className={`chip ${isActive ? 'is-active' : ''}`}
                aria-pressed={isActive}
                onClick={() => onChange(c.id)}
              >
                <span>{c.label}</span>
                <span className="chip__count" aria-hidden="true">{counts[c.id] ?? 0}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
