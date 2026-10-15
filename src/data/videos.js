/*
  AJOUTER UNE VIDÉO (YouTube uniquement)

  1. Copie le modèle ci-dessous dans le tableau `videos`, puis remplis-le.
  2. Colle l'adresse de ta vidéo dans `url` : barre d'adresse (youtube.com/watch?v=…),
     bouton « Partager » (youtu.be/…), ou adresse d'un Short (youtube.com/shorts/…).
     Un temps de départ est accepté (ex. …?t=90 ou …?t=1m30s).
  3. `category` : un identifiant parmi
       avatar-ia, publicites, clip-video, anime, documentaire, vlog, tutoriel, ugc, autres
     (le libellé exact, par exemple « Avatar IA », est aussi accepté).
  4. `featured: true` affiche la vidéo dans « Sélection de réalisations » sur l'accueil (6 maximum).

  Modèle :
  {
    title: 'Titre réel de la vidéo',
    url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
    category: 'publicites',
    description: 'Courte description (facultatif).',
    tags: ['montage', 'ia'],      // facultatif
    featured: true,               // facultatif (false par défaut)
  },

  Facultatif : `thumbnail: '/thumbnails/mon-image.jpg'` pour utiliser ta propre miniature
  (image placée dans public/thumbnails/) à la place de celle de YouTube.

  Champs obligatoires : title, url, category.
  Une entrée invalide est ignorée sans casser le site : la console du navigateur (npm run dev)
  et le terminal (npm run build) indiquent laquelle et pourquoi.
*/

export const videos = [];
