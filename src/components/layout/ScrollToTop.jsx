import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

export default function ScrollToTop() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    if (previous.current !== pathname) {
      previous.current = pathname;
      const main = document.getElementById('contenu');
      if (main) main.focus({ preventScroll: true });
    }
  }, [pathname]);

  return null;
}
