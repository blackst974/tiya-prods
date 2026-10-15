# TIYA PRODS — site officiel

Site vitrine statique (React + Vite) du studio TIYA PRODS — AI VIDEO STUDIO.
Aucun serveur, aucun abonnement : le site se publie gratuitement sur un hébergement statique.
Toutes les vidéos du portfolio sont des vidéos YouTube : aucun fichier vidéo n'est hébergé sur le site.

## 1. Installer et lancer en local

Prérequis : [Node.js](https://nodejs.org) version 22 (ou 20.19 et plus).

```bash
npm install
npm run dev
```

Le site s'ouvre sur http://localhost:5173.

## 2. Informations à renseigner avant la publication

Tout se fait dans `src/config/site.js` :

- `url` : adresse finale du site, sans slash final. Sur GitHub Pages : `https://NOM-UTILISATEUR.github.io/NOM-DU-DEPOT`.
- `email` : e-mail professionnel de contact. Tant qu'il est vide, le formulaire de contact est désactivé.
- `socials` : liens de réseaux sociaux (facultatifs).
- `legal` et `privacy` : informations des pages Mentions légales et Confidentialité.

`npm run dev` affiche, sur ces deux pages, une liste de contrôle des champs manquants.
`npm run build` affiche aussi un rappel dans le terminal. Ces textes sont à faire relire pour votre situation.

## 3. Ajouter une vidéo YouTube

1. Ouvrez `src/data/videos.js`.
2. Copiez le modèle commenté en haut du fichier dans le tableau `videos`, puis remplissez-le :

```js
{
  title: 'Titre réel de la vidéo',
  url: 'https://www.youtube.com/watch?v=XXXXXXXXXXX',
  category: 'publicites',
  description: 'Courte description (facultatif).',
  tags: ['montage', 'ia'],
  featured: true,
},
```

3. `url` : adresse de la barre d'adresse, du bouton « Partager » (`youtu.be/…`) ou d'un Short (`/shorts/…`).
4. `category` : `avatar-ia`, `publicites`, `clip-video`, `anime`, `documentaire`, `vlog`, `tutoriel`, `ugc` ou `autres`.
5. `featured: true` : la vidéo apparaît aussi dans « Sélection de réalisations » sur l'accueil (6 maximum).
6. Vérification : `npm run dev` affiche dans la console du navigateur les entrées ignorées et la raison ; `npm run build` les affiche dans le terminal.

La vidéo doit être publique ou non répertoriée, et l'intégration doit être autorisée par YouTube.

Miniature personnalisée (facultatif) : placez l'image dans `public/thumbnails/` et ajoutez `thumbnail: '/thumbnails/mon-image.jpg'`.

Bande démo de l'accueil (facultatif) : renseignez `showreel.url` dans `src/data/home.js`.

## 4. Construire et tester le site

### Test à la racine (comme en local)

```bash
npm run build
npm run preview
```

Ouvrez l'adresse affichée (en général http://localhost:4173/).

### Test comme sur GitHub Pages (sous-répertoire)

Le « base » du site est lu dans la variable `VITE_BASE` (voir `vite.config.js`). Pour reproduire GitHub Pages avec un dépôt nommé `tiya-prods` :

- macOS / Linux : `VITE_BASE=/tiya-prods/ npm run build`
- Windows PowerShell : `$env:VITE_BASE="/tiya-prods/"; npm run build`
- Windows cmd : `set VITE_BASE=/tiya-prods/ && npm run build`

Puis `npm run preview` et ouvrez http://localhost:4173/tiya-prods/ (adresse affichée dans le terminal).
Pensez à retirer la variable ensuite (PowerShell : `Remove-Item Env:VITE_BASE`).

À la fin du build, le terminal affiche une ligne « Chemins : base … » et signale (« ERREUR ») toute ressource qui ne serait pas sous le bon dossier ou absente de `dist/`.

`npm run build` crée le dossier `dist/` : une page HTML par route, `404.html`, `robots.txt` et (si `url` est renseigné) `sitemap.xml`.

## 5. Publier gratuitement sur GitHub Pages

1. Créez un dépôt **public** sur GitHub (par exemple `tiya-prods`).
2. Envoyez-y tous les fichiers de ce dossier (sans `node_modules` ni `dist`) :
   - soit avec GitHub Desktop ou `git` ;
   - soit par l'interface web : « Add file » → « Upload files ». Si le dossier `.github` n'est pas pris en compte, créez le fichier à la main : « Add file » → « Create new file », nom `.github/workflows/deploy.yml`, et collez le contenu du fichier fourni.
3. Dans le dépôt : « Settings » → « Pages » → « Build and deployment » → Source : **GitHub Actions**.
4. Le déploiement se lance à chaque envoi sur la branche `main` (onglet « Actions » pour suivre l'avancement).
5. Le site est ensuite disponible sur `https://NOM-UTILISATEUR.github.io/NOM-DU-DEPOT/`.

Le fichier `.github/workflows/deploy.yml` fixe automatiquement `VITE_BASE` : `/NOM-DU-DEPOT/`, ou `/` si le dépôt s'appelle `NOM-UTILISATEUR.github.io`.
Avec un nom de domaine personnalisé, le site est à la racine : dans ce cas, remplacez la valeur de `VITE_BASE` dans le workflow par `/`.
Pensez à renseigner `url` dans `src/config/site.js`, puis à renvoyer le fichier.

## 6. Limites des hébergements gratuits

Vérifiez les limites actuelles de l'hébergeur (taille du site, bande passante).
Les vidéos étant sur YouTube, elles ne consomment ni l'espace ni la bande passante de l'hébergeur.
Conservez toujours vos fichiers sources d'origine.

## Structure

- `src/config/site.js` : informations du site.
- `src/data/` : catégories, vidéos, services, SEO, textes de l'accueil.
- `src/utils/youtube.js`, `src/utils/videoModel.js`, `src/utils/videoHelpers.js` : lecture des URL YouTube, validation et accès aux vidéos.
- `src/components/`, `src/pages/` : composants et pages.
- `src/styles/` : feuilles de style.
- `public/` : logo, icônes, miniatures personnalisées.
- `scripts/postbuild.mjs` : pages HTML par route, `robots.txt`, `sitemap.xml` et vérification des vidéos.
- `scripts/check-dist.mjs` : vérification des chemins des ressources dans `dist/`.
