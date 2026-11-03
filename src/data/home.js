// Vidéo d'introduction affichée sur la page d'accueil (lecteur YouTube chargé après un clic).
// Pour la changer : remplace l'adresse. Pour la retirer : laisse l'adresse vide (le logo s'affiche alors).
export const showreel = {
  url: 'https://youtu.be/3rZZ7iQYHjs',
};

// true  = la section « Sélection de réalisations » disparaît tant qu'aucun projet n'est mis en avant.
// false = elle affiche un état vide soigné (pratique pendant la construction).
export const hideFeaturedWhenEmpty = false;

export const pillars = [
  {
    title: 'Direction créative',
    text: "Concept, narration et intention visuelle sont posés avant la première image.",
  },
  {
    title: 'Production assistée par IA',
    text: "Des outils d'IA générative, pilotés avec méthode, pour produire plans, voix et visuels.",
  },
  {
    title: 'Montage et finition',
    text: "Rythme, son, étalonnage et export : la postproduction qui donne sa cohérence au résultat.",
  },
];

export const expertises = [
  {
    id: 'publicites',
    title: 'Publicités vidéo',
    description: "Formats courts et percutants, conçus pour présenter une offre ou une marque.",
    filter: 'publicites',
  },
  {
    id: 'ugc',
    title: 'UGC',
    description: "Vidéos au ton naturel et direct, pensées pour les réseaux sociaux.",
    filter: 'ugc',
  },
  {
    id: 'avatar-ia',
    title: 'Avatars IA',
    description: "Présentateurs virtuels pour expliquer, raconter ou démontrer.",
    filter: 'avatar-ia',
  },
  {
    id: 'clips',
    title: 'Clips musicaux',
    description: "Mise en images d'un titre : rythme, atmosphère et direction visuelle.",
    filter: 'clip-video',
  },
  {
    id: 'anime',
    title: 'Anime',
    description: "Séquences d'inspiration animée, avec une identité graphique affirmée.",
    filter: 'anime',
  },
  {
    id: 'storytelling',
    title: 'Storytelling',
    description: "Une histoire, un ton, une structure : la narration au service de chaque vidéo.",
    filter: 'storytelling',
  },
  {
    id: 'documentaires',
    title: 'Documentaires',
    description: "Récits documentaires construits autour d'un sujet, d'un angle et d'un rythme.",
    filter: 'documentaire',
  },
  {
    id: 'vlogs-tutoriels',
    title: 'Vlogs et tutoriels',
    description: "Contenus pédagogiques ou personnels, clairs, bien montés et faciles à suivre.",
    filter: 'vlog',
  },
];

export const steps = [
  {
    title: 'Brief',
    text: "Comprendre les objectifs, la cible et le format.",
  },
  {
    title: 'Conception',
    text: "Définir le concept, le script et la direction visuelle.",
  },
  {
    title: 'Production',
    text: "Générer, sélectionner et monter les séquences.",
  },
  {
    title: 'Finalisation',
    text: "Effectuer les contrôles qualité et préparer les livrables.",
  },
];
