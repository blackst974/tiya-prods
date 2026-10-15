import Button from '../ui/Button.jsx';

export default function EmptyState({ variant, categoryLabel, onReset }) {
  if (variant === 'none') {
    return (
      <div className="empty">
        <p className="empty__title">Le portfolio sera enrichi prochainement.</p>
        <p className="empty__text">
          Les premières réalisations seront publiées ici. En attendant, parlez-nous de votre projet.
        </p>
        <Button to="/contact" arrow>Nous contacter</Button>
      </div>
    );
  }

  return (
    <div className="empty">
      <p className="empty__title">Aucune vidéo dans cette catégorie pour le moment.</p>
      <p className="empty__text">
        La catégorie « {categoryLabel} » n'a pas encore de réalisation publiée.
      </p>
      <Button variant="ghost" onClick={onReset}>Voir toutes les vidéos</Button>
    </div>
  );
}
