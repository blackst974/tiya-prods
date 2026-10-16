export const site = {
  name: 'TIYA PRODS',
  tagline: 'AI VIDEO STUDIO',
  description:
    'Studio indépendant de montage vidéo et de production assistée par IA : publicités, UGC, avatars IA et créations audiovisuelles.',

  // À RENSEIGNER : URL finale du site, sans slash final (ex. https://tiyaprods.pages.dev).
  // Si le site est publié dans un sous-répertoire, incluez-le (ex. https://nom.github.io/nom-du-depot).
  url: '',

  // E-mail professionnel de contact (formulaire de contact, mentions légales, confidentialité).
  email: 'tiya.prods@gmail.com',

  // À RENSEIGNER : liens complets (https://...). Les liens vides ne s'affichent pas.
  socials: [
    { label: 'YouTube', url: '' },
    { label: 'Instagram', url: '' },
    { label: 'TikTok', url: '' },
  ],

  // Mentions légales (page /mentions-legales).
  // TIYA PRODS est le nom commercial d'une entreprise individuelle (micro-entrepreneur) :
  // l'éditeur du site est la personne physique, pas une société.
  legal: {
    publisherName: 'MATELOT Steven', // « entrepreneur individuel (EI) » est ajouté automatiquement
    legalStatus: 'Entrepreneur individuel (EI) — micro-entrepreneur',
    siret: '928 666 577 00012', // À vérifier dans le répertoire officiel (Annuaire des entreprises / INSEE)
    address: '920 Avenue Pierre Mendès France, 77176 Savigny-le-Temple', // Adresse affichée publiquement : doit correspondre à celle déclarée à l'immatriculation
    publicationDirector: 'MATELOT Steven',
    phone: '07 43 51 76 02', // Numéro affiché publiquement
    hostName: 'GitHub, Inc. (GitHub Pages)',
    hostAddress: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis', // À vérifier sur une page officielle de GitHub
    hostPhone: '',            // Facultatif : GitHub indique ne pas proposer de support téléphonique (voir la liste de contrôle)
    hostContact: 'https://pages.github.com',
    otherInfo: 'TVA non applicable, article 293 B du CGI.', // Franchise en base de TVA (à mettre à jour selon l'évolution de la mention officielle)
    updatedAt: '',            // Facultatif : ex. « 16 octobre 2026 »
  },

  // Données personnelles (page /confidentialite).
  // Base légale et durée : propositions rédigées à la demande de l'éditeur, À VALIDER (voir CHECKLIST-PUBLICATION.md).
  privacy: {
    legalBasis:
      'Mesures précontractuelles prises à la demande de la personne concernée (article 6, 1., b du RGPD) et, pour les messages qui ne concernent pas un projet, intérêt légitime de l’éditeur à répondre aux demandes reçues (article 6, 1., f du RGPD).',
    retention:
      'Les messages sont conservés le temps nécessaire au traitement de la demande, puis supprimés 12 mois après le dernier échange. Si une collaboration est engagée, les informations nécessaires sont conservées pendant la durée de la relation, puis archivées pour la durée légale applicable.',
    rightsContact: '',  // Facultatif : e-mail dédié aux droits ; sinon l'e-mail de contact est utilisé
    transfers: '',      // À COMPLÉTER après vérification : transferts hors UE éventuels (hébergeur, messagerie)
  },
};

export const navigation = [
  { label: 'Accueil', to: '/' },
  { label: 'Portfolio', to: '/portfolio' },
  { label: 'Services', to: '/services' },
  { label: 'À propos', to: '/a-propos' },
  { label: 'Contact', to: '/contact' },
];

export const legalLinks = [
  { label: 'Mentions légales', to: '/mentions-legales' },
  { label: 'Confidentialité', to: '/confidentialite' },
];
