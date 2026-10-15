// Référencement : titres et descriptions de chaque page.
// Ce fichier est lu par le site (useDocumentMeta) ET par scripts/postbuild.mjs :
// il ne doit contenir aucun import ni JSX.

export const seo = {
  '/': {
    title: 'Tiya Prods | Studio de production vidéo et création IA',
    description:
      'Tiya Prods associe création vidéo, intelligence artificielle, montage et postproduction pour concevoir des contenus audiovisuels.',
  },
  '/portfolio': {
    title: 'Portfolio vidéo | Tiya Prods',
    description:
      'Découvrez les réalisations vidéo et les différents univers créatifs de Tiya Prods.',
  },
  '/services': {
    title: 'Services de production vidéo | Tiya Prods',
    description:
      'Publicités vidéo, UGC, avatars IA, clips et montage vidéo : découvrez les expertises de Tiya Prods.',
  },
  '/a-propos': {
    title: 'À propos | Tiya Prods, studio vidéo indépendant',
    description:
      'Tiya Prods est un studio indépendant qui associe savoir-faire audiovisuel et outils d’intelligence artificielle.',
  },
  '/contact': {
    title: 'Contact | Tiya Prods',
    description:
      'Décrivez votre projet vidéo à Tiya Prods : publicité, UGC, avatar IA, clip, anime, documentaire ou montage.',
  },
  '/mentions-legales': {
    title: 'Mentions légales | Tiya Prods',
    description: 'Informations légales relatives à l’éditeur et à l’hébergement du site de Tiya Prods.',
  },
  '/confidentialite': {
    title: 'Confidentialité | Tiya Prods',
    description:
      'Informations sur les données personnelles traitées via le formulaire de contact du site de Tiya Prods.',
  },
};

export const routes = Object.keys(seo);

export const notFoundSeo = {
  title: 'Page introuvable | Tiya Prods',
  description: 'Cette page n’existe pas ou a été déplacée.',
};
