import { getMissingFields } from '../../utils/legalCheck.js';

export default function LegalChecklist() {
  if (!import.meta.env.DEV) return null;

  const missing = getMissingFields();

  return (
    <aside className="legal-checklist" aria-label="Liste de contrôle interne">
      <h2 className="legal-checklist__title">Liste de contrôle interne (visible uniquement en développement)</h2>
      {missing.length === 0 ? (
        <p>Tous les champs prévus sont renseignés dans src/config/site.js. Ils restent à faire vérifier.</p>
      ) : (
        <>
          <p>Champs à compléter dans <code>src/config/site.js</code> avant la publication :</p>
          <ul>
            {missing.map((field) => (
              <li key={field.path}>
                {field.label}
                {field.required ? '' : ' (selon votre situation)'}
              </li>
            ))}
          </ul>
        </>
      )}
    </aside>
  );
}
