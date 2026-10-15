import PageHero from '../components/ui/PageHero.jsx';
import Button from '../components/ui/Button.jsx';
import useDocumentMeta from '../hooks/useDocumentMeta.js';

export default function NotFound() {
  useDocumentMeta('Page introuvable');
  return (
    <>
      <PageHero
        eyebrow="Erreur 404"
        title="Page introuvable"
        lead="Cette page n'existe pas ou a été déplacée."
      />
      <div className="container" style={{ paddingTop: '2.5rem' }}>
        <Button to="/" arrow>Retour à l'accueil</Button>
      </div>
    </>
  );
}
