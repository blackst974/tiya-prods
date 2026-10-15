// Informations à compléter ou à vérifier avant publication (mentions légales et confidentialité).
// Lu par le site (liste de contrôle visible en développement uniquement) et par scripts/postbuild.mjs.
// `path` est un chemin dans l'objet `site` de src/config/site.js.

// Champs vides à compléter.
export const legalFields = [
  { path: 'legal.publisherName', label: 'Éditeur : NOM et prénom de l’entrepreneur individuel (nom légal)', required: true },
  { path: 'legal.address', label: 'Éditeur : adresse de domiciliation de l’entreprise', required: true },
  { path: 'legal.phone', label: 'Éditeur : numéro de téléphone professionnel', required: true },
  { path: 'legal.publicationDirector', label: 'Responsable de publication', required: true },
  { path: 'legal.legalStatus', label: 'Éditeur : statut', required: true },
  { path: 'email', label: 'E-mail de contact', required: true },
  { path: 'legal.hostName', label: 'Hébergeur : nom', required: true },
  { path: 'legal.hostAddress', label: 'Hébergeur : adresse', required: true },
  { path: 'privacy.legalBasis', label: 'Confidentialité : base légale du traitement des demandes de contact', required: true },
  { path: 'privacy.retention', label: 'Confidentialité : durée de conservation des messages reçus', required: true },
  { path: 'legal.siret', label: 'Éditeur : SIREN / SIRET', required: false },
  { path: 'legal.otherInfo', label: 'Autres mentions selon l’activité (TVA, immatriculation RCS / RM…)', required: false },
];

// Points déjà renseignés (ou non applicables) mais à vérifier avant publication.
export const legalToVerify = [
  'SIRET : vérifier dans le répertoire officiel des entreprises (Annuaire des entreprises / INSEE) que le numéro, le statut et le nom correspondent.',
  'Statut : confirmer que « TIYA PRODS » est le nom commercial de l’entreprise individuelle, et non une société.',
  'Hébergeur : vérifier l’adresse de GitHub, Inc. sur une page officielle de GitHub.',
  'Hébergeur : le téléphone est demandé par la réglementation, mais GitHub indique ne pas proposer de support téléphonique. Décider de la mention avec un professionnel.',
  'Transferts hors Union européenne : GitHub (hébergement) et la messagerie Gmail (réception des e-mails) sont des services américains. Vérifier et documenter.',
  'Faire relire les deux pages par un professionnel du droit avant publication.',
];
