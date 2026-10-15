# Liste de contrôle avant publication — pages légales

Ce fichier est un aide-mémoire interne. Il n'est pas affiché sur le site.

## Informations à fournir (champs encore vides dans `src/config/site.js`)

- [ ] `legal.publisherName` : NOM et prénom de l'entrepreneur individuel (nom légal). La mention « entrepreneur individuel (EI) » est ajoutée automatiquement.
- [ ] `legal.address` : adresse de domiciliation de l'entreprise (mention obligatoire sur le site).
- [ ] `legal.phone` : numéro de téléphone professionnel.
- [ ] `legal.publicationDirector` : responsable de publication.
- [ ] `privacy.legalBasis` : base légale choisie pour traiter les demandes de contact.
- [ ] `privacy.retention` : durée de conservation choisie pour les messages reçus.
- [ ] `legal.otherInfo` (si nécessaire) : TVA, immatriculation RCS / RM, selon l'activité.
- [ ] `url` : adresse finale du site (après la première publication).

## Informations renseignées à vérifier

- [ ] SIRET `928 666 577 00012` : contrôler dans le répertoire officiel (Annuaire des entreprises / INSEE) le numéro, le statut et le nom.
- [ ] Statut : confirmer que TIYA PRODS est le nom commercial de l'entreprise individuelle, et non une société.
- [ ] Hébergeur (GitHub Pages) : vérifier l'adresse de GitHub, Inc. sur une page officielle de GitHub.
- [ ] Hébergeur : le téléphone est demandé par la réglementation ; GitHub indique ne pas proposer de support téléphonique. Décider de la mention avec un professionnel.
- [ ] Transferts hors Union européenne : GitHub et Gmail sont des services américains. Vérifier et renseigner `privacy.transfers`.
- [ ] Faire relire les pages Mentions légales et Confidentialité par un professionnel avant publication.

## Où voir l'état

- `npm run dev` : la liste de contrôle apparaît en haut des pages Mentions légales et Confidentialité (jamais sur le site publié).
- `npm run build` : le terminal liste les champs vides.
- Sur le site publié, un champ obligatoire encore vide s'affiche « Non renseigné » : ne publiez pas tant que ce n'est pas corrigé.
