import { lazy, Suspense } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import Header from './components/layout/Header.jsx';
import Footer from './components/layout/Footer.jsx';
import ScrollToTop from './components/layout/ScrollToTop.jsx';
import ErrorBoundary from './components/layout/ErrorBoundary.jsx';

import Home from './pages/Home.jsx';

const Portfolio = lazy(() => import('./pages/Portfolio.jsx'));
const Services = lazy(() => import('./pages/Services.jsx'));
const About = lazy(() => import('./pages/About.jsx'));
const Contact = lazy(() => import('./pages/Contact.jsx'));
const Legal = lazy(() => import('./pages/Legal.jsx'));
const Privacy = lazy(() => import('./pages/Privacy.jsx'));
const NotFound = lazy(() => import('./pages/NotFound.jsx'));

export default function App() {
  const { pathname } = useLocation();

  return (
    <>
      <a className="skip-link" href="#contenu">Aller au contenu</a>
      <ScrollToTop />
      <Header />
      <main id="contenu" tabIndex={-1}>
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<div className="route-loading" role="status">Chargement…</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/portfolio" element={<Portfolio />} />
              <Route path="/services" element={<Services />} />
              <Route path="/a-propos" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/mentions-legales" element={<Legal />} />
              <Route path="/confidentialite" element={<Privacy />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
