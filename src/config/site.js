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
    publisherName: '',        // À RENSEIGNER : NOM et Prénom de l'entrepreneur (nom légal). « EI » est ajouté automatiquement.
    legalStatus: 'Entrepreneur individuel (EI) — micro-entrepreneur',
    siret: '928 666 577 00012', // À vérifier dans le répertoire officiel (Annuaire des entreprises / INSEE)
    address: '',              // À RENSEIGNER : adresse de domiciliation de l'entreprise (obligatoire sur le site)
    publicationDirector: '',  // À RENSEIGNER : responsable de publication (en général l'entrepreneur lui-même)
    phone: '',                // À RENSEIGNER : numéro de téléphone professionnel (demandé pour un entrepreneur individuel)
    hostName: 'GitHub, Inc. (GitHub Pages)',
    hostAddress: '88 Colin P. Kelly Jr. Street, San Francisco, CA 94107, États-Unis', // À vérifier sur une page officielle de GitHub
    hostPhone: '',            // Facultatif : GitHub indique ne pas proposer de support téléphonique (voir la liste de contrôle)
    hostContact: 'https://pages.github.com',
    otherInfo: '',            // À COMPLÉTER si nécessaire : TVA, immatriculation RCS / RM, etc. selon votre activité
    updatedAt: '',            // Facultatif : ex. « 15 octobre 2026 »
  },

  // Données personnelles (page /confidentialite).
  privacy: {
    legalBasis: '',     // À RENSEIGNER : base légale choisie par l'éditeur pour traiter les demandes de contact
    retention: '',      // À RENSEIGNER : durée de conservation choisie par l'éditeur
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
