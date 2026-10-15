export const site = {
  name: 'TIYA PRODS',
  tagline: 'AI VIDEO STUDIO',
  description:
    'Studio indépendant de montage vidéo et de production assistée par IA : publicités, UGC, avatars IA et créations audiovisuelles.',

  // À RENSEIGNER : URL finale du site, sans slash final (ex. https://tiyaprods.pages.dev).
  // Si le site est publié dans un sous-répertoire, incluez-le (ex. https://nom.github.io/nom-du-depot).
  url: '',

  // À RENSEIGNER : e-mail professionnel de contact. Vide = formulaire désactivé.
  email: '',

  // À RENSEIGNER : liens complets (https://...). Les liens vides ne s'affichent pas.
  socials: [
    { label: 'YouTube', url: '' },
    { label: 'Instagram', url: '' },
    { label: 'TikTok', url: '' },
  ],

  // À RENSEIGNER avant publication : mentions légales (page /mentions-legales).
  legal: {
    publisherName: '',        // nom et prénom de l'entrepreneur, ou dénomination de la société
    legalStatus: '',          // ex. statut d'entrepreneur individuel, société (forme juridique)
    siret: '',                // SIREN ou SIRET, si applicable
    address: '',              // adresse professionnelle
    publicationDirector: '',  // responsable de publication
    phone: '',                // facultatif
    hostName: '',             // nom de l'hébergeur du site
    hostAddress: '',          // adresse ou coordonnées de l'hébergeur
    hostContact: '',          // facultatif : téléphone ou site de l'hébergeur
    otherInfo: '',            // facultatif : TVA, RCS, capital, etc. selon votre situation
    updatedAt: '',            // facultatif : ex. « 15 octobre 2026 »
  },

  // À RENSEIGNER avant publication : données personnelles (page /confidentialite).
  privacy: {
    legalBasis: '',     // base légale choisie par l'éditeur pour le traitement des demandes de contact
    retention: '',      // durée de conservation choisie par l'éditeur
    rightsContact: '',  // facultatif : e-mail dédié aux droits ; sinon l'e-mail de contact est utilisé
    transfers: '',      // facultatif : transferts hors UE éventuels (ex. selon le fournisseur de messagerie)
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
