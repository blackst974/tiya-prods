/*
  PORTFOLIO — vidéos YouTube uniquement.

  AJOUTER UNE VIDÉO : copie un bloc ci-dessous à la suite des autres, puis remplis-le.

  {
    title: 'Titre réel de la vidéo',
    url: 'https://youtu.be/XXXXXXXXXXX',   // adresse YouTube (watch, youtu.be ou shorts)
    category: 'publicites',                // voir la liste ci-dessous
    description: 'Courte description.',    // facultatif
    tags: ['montage', 'ia'],               // facultatif
    featured: true,                        // facultatif : true = affichée sur l'accueil (6 maximum)
  },

  Catégories : avatar-ia, publicites, clip-video, anime, documentaire, vlog, tutoriel, ugc, storytelling, autres

  L'ordre ci-dessous est l'ordre d'affichage. La première vidéo de « Toutes les vidéos » s'affiche en grand.
  Une entrée invalide est ignorée sans casser le site : la console du navigateur (npm run dev)
  et le terminal (npm run build) indiquent laquelle et pourquoi.
*/

export const videos = [
  {
    title: 'Ti Rogé',
    url: 'https://youtu.be/vX-EbX41OLM',
    category: 'clip-video',
    description: 'Clip vidéo dans un style anime réalisé par IA',
    featured: true,
  },
  {
    title: 'Resonance',
    url: 'https://youtu.be/73RMvM9U2yU',
    category: 'anime',
    featured: true,
  },
  {
    title: 'Parfum NOIR',
    url: 'https://www.youtube.com/shorts/6PMlsCohuao',
    category: 'publicites',
    featured: true,
  },
  {
    title: 'Vidéo UGC',
    url: 'https://youtu.be/l0DJpPTU1ZQ',
    category: 'ugc',
    featured: true,
  },
  {
    title: 'Avatar AI man',
    url: 'https://youtu.be/czCqNKtZsoo',
    category: 'avatar-ia',
    featured: true,
  },
  {
    title: 'Les océans',
    url: 'https://youtu.be/UQETJq-rN-c',
    category: 'documentaire',
    featured: true,
  },
  {
    title: 'Exorcisme de la chambre 17',
    url: 'https://youtu.be/CBO1qkvHRak',
    category: 'documentaire',
  },
  {
    title: 'Doc criminel',
    url: 'https://youtu.be/YwZsRHHiBNA',
    category: 'documentaire',
  },
  {
    title: 'Avatar AI Little girl',
    url: 'https://youtu.be/D_BTtesUaqk',
    category: 'avatar-ia',
  },
  {
    title: 'Avatar AI Little boy',
    url: 'https://youtu.be/RKMLwnO0bUg',
    category: 'avatar-ia',
  },
  {
    title: 'Youtubeur',
    url: 'https://youtu.be/RSXwhWt14WY',
    category: 'autres',
  },
  {
    title: 'La Nativité',
    url: 'https://youtu.be/w6n_rjk2ReU',
    category: 'anime',
  },
  {
    title: 'Capitaine Zoom',
    url: 'https://youtu.be/Z4GtNWl3idE',
    category: 'anime',
  },
  {
    title: 'Story',
    url: 'https://youtu.be/voUYFTQSUcU',
    category: 'storytelling',
  },
  {
    title: 'New York City',
    url: 'https://youtu.be/lZIAQPMLwNg',
    category: 'vlog',
  },
  {
    title: 'Youtubeur 2',
    url: 'https://youtu.be/qgOMr2jMMYo',
    category: 'autres',
  },
  {
    title: 'Paray',
    url: 'https://youtu.be/RmbvkP4rUw4',
    category: 'vlog',
  },
  {
    title: 'Pub TV minceur',
    url: 'https://youtu.be/uqeAhwl9MVw',
    category: 'publicites',
  },
  {
    title: 'Extrait clip',
    url: 'https://youtu.be/j4DyuhSczNg',
    category: 'clip-video',
  },
  {
    title: 'Tutoriel',
    url: 'https://youtu.be/68_AawSrpO8',
    category: 'tutoriel',
  },
];
