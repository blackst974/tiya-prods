import { useEffect, useMemo, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';

import PageHero from '../components/ui/PageHero.jsx';
import FilterBar from '../components/portfolio/FilterBar.jsx';
import VideoGrid from '../components/portfolio/VideoGrid.jsx';
import VideoModal from '../components/portfolio/VideoModal.jsx';
import EmptyState from '../components/portfolio/EmptyState.jsx';

import { categories } from '../data/categories.js';
import {
  allVideos,
  filterVideos,
  countByCategory,
  getCategoryLabel,
  getVideoById,
} from '../utils/videoHelpers.js';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

import '../styles/portfolio.css';

export default function Portfolio() {
  useDocumentMeta(
    'Portfolio',
    'Découvrez un aperçu des univers visuels, formats et histoires que Tiya Prods peut donner vie grâce à la création vidéo et à la postproduction.'
  );

  const [params, setParams] = useSearchParams();
  const galleryRef = useRef(null);
  const triggerRef = useRef(null);

  const categoryParam = params.get('categorie');
  const active = categories.some((c) => c.id === categoryParam) ? categoryParam : 'all';
  const selected = params.get('video') ? getVideoById(params.get('video')) : null;

  const counts = useMemo(() => countByCategory(), []);
  const list = useMemo(() => filterVideos(active), [active]);
  const activeLabel = getCategoryLabel(active) || 'Toutes les vidéos';
  const total = allVideos.length;

  // Arrivée via un lien de catégorie : on amène la galerie à l'écran.
  useEffect(() => {
    if (categoryParam && galleryRef.current) {
      galleryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateParams = (mutate) => {
    setParams(
      (prev) => {
        const next = new URLSearchParams(prev);
        mutate(next);
        return next;
      },
      { replace: true }
    );
  };

  const setFilter = (id) =>
    updateParams((next) => {
      if (id === 'all') next.delete('categorie');
      else next.set('categorie', id);
    });

  const openVideo = (video, trigger) => {
    triggerRef.current = trigger;
    updateParams((next) => next.set('video', video.id));
  };

  const closeVideo = () => {
    updateParams((next) => next.delete('video'));
    const trigger = triggerRef.current;
    if (trigger) {
      requestAnimationFrame(() => {
        if (document.contains(trigger)) trigger.focus();
      });
    }
  };

  const status =
    total === 0
      ? ''
      : `${list.length} ${list.length > 1 ? 'vidéos' : 'vidéo'} — ${activeLabel}`;

  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Nos réalisations"
        lead="Découvrez un aperçu des univers visuels, formats et histoires que Tiya Prods peut donner vie grâce à la création vidéo et à la postproduction."
      />

      <section id="galerie" ref={galleryRef} className="portfolio" aria-label="Galerie de vidéos">
        <FilterBar categories={categories} active={active} counts={counts} onChange={setFilter} />

        <div className="container portfolio__body">
          <p className="portfolio__status" role="status" aria-live="polite">{status}</p>

          {total === 0 && <EmptyState variant="none" />}

          {total > 0 && list.length === 0 && (
            <EmptyState
              variant="category"
              categoryLabel={activeLabel}
              onReset={() => setFilter('all')}
            />
          )}

          {list.length > 0 && <VideoGrid key={active} videos={list} onOpen={openVideo} />}
        </div>
      </section>

      {selected && <VideoModal key={selected.id} video={selected} onClose={closeVideo} />}
    </>
  );
}
