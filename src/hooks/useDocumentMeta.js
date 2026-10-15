import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { site } from '../config/site.js';
import { seo, notFoundSeo } from '../data/seo.js';

const origin = String(site.url || '').trim().replace(/\/+$/, '');

function upsertMeta(attr, key, content) {
  const selector = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(selector);
  if (content === null || content === undefined || content === '') {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertCanonical(href) {
  let el = document.head.querySelector('link[rel="canonical"]');
  if (!href) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', 'canonical');
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

// Les arguments sont conservés pour compatibilité : ils ne servent que si la route est absente de seo.js.
export default function useDocumentMeta(legacyTitle, legacyDescription) {
  const { pathname } = useLocation();

  useEffect(() => {
    const key = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;
    const entry = seo[key];
    const meta = entry || {
      title: legacyTitle ? `${legacyTitle} | ${site.name}` : notFoundSeo.title,
      description: legacyDescription || notFoundSeo.description,
    };
    const url = entry && origin ? `${origin}${key === '/' ? '/' : key}` : '';

    document.title = meta.title;
    upsertMeta('name', 'description', meta.description);
    upsertMeta('property', 'og:title', meta.title);
    upsertMeta('property', 'og:description', meta.description);
    upsertMeta('property', 'og:url', url);
    upsertCanonical(url);
    upsertMeta('name', 'robots', entry ? null : 'noindex');
  }, [pathname, legacyTitle, legacyDescription]);
}
