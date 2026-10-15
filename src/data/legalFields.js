// Champs à compléter avant publication (mentions légales et confidentialité).
// Lu par le site (en développement uniquement) et par scripts/postbuild.mjs.
// `path` est un chemin dans l'objet `site` de src/config/site.js.

export const legalFields = [
  { path: 'legal.publisherName', label: 'Éditeur : nom ou dénomination', required: true },
  { path: 'legal.legalStatus', label: 'Éditeur : forme juridique ou statut', required: true },
  { path: 'legal.address', label: 'Éditeur : adresse professionnelle', required: true },
  { path: 'legal.publicationDirector', label: 'Responsable de publication', required: true },
  { path: 'email', label: 'E-mail de contact', required: true },
  { path: 'legal.hostName', label: 'Hébergeur : nom', required: true },
  { path: 'legal.hostAddress', label: 'Hébergeur : adresse ou coordonnées', required: true },
  { path: 'privacy.legalBasis', label: 'Confidentialité : base légale du traitement', required: true },
  { path: 'privacy.retention', label: 'Confidentialité : durée de conservation', required: true },
  { path: 'legal.siret', label: 'Éditeur : SIREN / SIRET (si applicable)', required: false },
];
