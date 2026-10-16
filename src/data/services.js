export const projectTypes = [
  { value: 'publicite', label: 'Publicité vidéo' },
  { value: 'ugc', label: 'UGC' },
  { value: 'avatar-ia', label: 'Avatar IA' },
  { value: 'clip-video', label: 'Clip vidéo' },
  { value: 'anime', label: 'Anime' },
  { value: 'storytelling', label: 'Storytelling' },
  { value: 'documentaire', label: 'Documentaire' },
  { value: 'vlog', label: 'Vlog' },
  { value: 'tutoriel', label: 'Tutoriel' },
  { value: 'montage', label: 'Montage et postproduction' },
  { value: 'autre', label: 'Autre projet' },
];

export const services = [
  {
    id: 'publicites-video',
    short: 'Publicité',
    title: 'Publicités vidéo',
    description:
      'Création de contenus publicitaires courts, avec réflexion créative, script, production visuelle, montage et déclinaisons adaptées aux plateformes.',
    note: null,
    needs: [
      'Présenter un produit, un service ou une marque en quelques secondes',
      'Décliner un même message pour plusieurs plateformes',
      'Explorer plusieurs approches créatives autour d’une même idée',
    ],
    formats: ['Formats courts', 'Vertical ou horizontal selon la plateforme', 'Déclinaisons d’un même film'],
    projectType: 'publicite',
    filter: 'publicites',
  },
  {
    id: 'ugc-ia',
    short: 'UGC',
    title: 'Vidéos UGC assistées par IA',
    description:
      'Création de vidéos inspirées des codes des contenus sociaux : présentation d’un produit, démonstration, témoignage scénarisé ou mise en situation.',
    note:
      'Un personnage généré par IA n’est jamais présenté comme un véritable client ayant réellement utilisé un produit : les mises en scène sont assumées comme telles.',
    needs: [
      'Présenter un produit sur un ton direct et naturel',
      'Montrer un usage ou une démonstration',
      'Alimenter des formats pensés pour les réseaux sociaux',
    ],
    formats: ['Vidéos verticales courtes', 'Démonstration produit', 'Mise en situation scénarisée'],
    projectType: 'ugc',
    filter: 'ugc',
  },
  {
    id: 'avatars-presentateurs',
    short: 'Avatar',
    title: 'Avatars et présentateurs virtuels',
    description:
      'Conception de contenus avec avatars IA, présentateurs virtuels et narration.',
    note:
      'La synchronisation labiale dépend des outils utilisés et du besoin réel : sa faisabilité est étudiée projet par projet.',
    needs: [
      'Donner un visage et une voix à un message explicatif ou commercial',
      'Présenter ou raconter sans organiser de tournage',
      'Proposer une narration claire et régulière',
    ],
    formats: ['Présentateur virtuel', 'Narration', 'Vidéo explicative'],
    projectType: 'avatar-ia',
    filter: 'avatar-ia',
  },
  {
    id: 'clips-musicaux',
    short: 'Clip',
    title: 'Clips musicaux',
    description:
      'Création de clips et de séquences visuelles pour accompagner un univers musical, avec une attention portée à l’ambiance, au rythme et à la cohérence artistique.',
    note: null,
    needs: [
      'Mettre en images un titre ou un univers musical',
      'Construire une ambiance visuelle cohérente avec la musique',
    ],
    formats: ['Clip complet', 'Séquences visuelles', 'Extraits pour les réseaux sociaux'],
    projectType: 'clip-video',
    filter: 'clip-video',
  },
  {
    id: 'anime-creations',
    short: 'Anime',
    title: 'Anime et créations artistiques',
    description:
      'Production de contenus animés ou inspirés de l’esthétique anime, avec une direction artistique adaptée au projet.',
    note: null,
    needs: [
      'Explorer une esthétique anime ou illustrée',
      'Donner une identité graphique forte à un projet',
    ],
    formats: ['Séquences animées', 'Créations d’inspiration anime', 'Visuels artistiques en mouvement'],
    projectType: 'anime',
    filter: 'anime',
  },
  {
    id: 'storytelling',
    short: 'Récit',
    title: 'Storytelling et vidéos narratives',
    description:
      'Conception de récits visuels, de scènes cinématographiques et de formats narratifs, avec une attention particulière portée à la continuité, à l’atmosphère et au montage.',
    note: null,
    needs: [
      'Raconter une histoire ou un concept en images',
      'Installer une atmosphère cohérente d’une scène à l’autre',
    ],
    formats: ['Scènes cinématographiques', 'Formats narratifs', 'Récits visuels'],
    projectType: 'storytelling',
    filter: 'storytelling',
  },
  {
    id: 'documentaires-vlogs-tutoriels',
    short: 'Documentaire',
    title: 'Documentaires, vlogs et tutoriels',
    description:
      'Montage et structuration de contenus informatifs, narratifs ou pédagogiques.',
    note: null,
    needs: [
      'Structurer un sujet pour le rendre clair',
      'Rendre un contenu pédagogique facile à suivre',
      'Mettre en forme un récit ou un témoignage personnel',
    ],
    formats: ['Documentaire', 'Vlog', 'Tutoriel'],
    projectType: 'documentaire',
    filter: 'documentaire',
  },
  {
    id: 'montage-postproduction',
    short: 'Postproduction',
    title: 'Montage et postproduction',
    description:
      'Amélioration du rythme, assemblage des séquences, transitions, intégration sonore, sous-titres et préparation des livrables.',
    note: null,
    needs: [
      'Donner du rythme à un contenu existant',
      'Harmoniser des séquences d’origines différentes',
      'Préparer des fichiers prêts à être diffusés',
    ],
    formats: ['Montage complet', 'Sous-titres', 'Livrables adaptés aux plateformes'],
    projectType: 'montage',
    filter: null,
  },
];
