# Liste de contrôle avant publication — pages légales

Ce fichier est un aide-mémoire interne. Il n'est pas affiché sur le site.

## Renseigné dans `src/config/site.js`

- [x] Nom et prénom (EI), adresse, téléphone, responsable de publication.
- [x] SIRET, statut, e-mail, hébergeur (GitHub Pages).
- [x] Franchise en base de TVA : « TVA non applicable, article 293 B du CGI ».
- [x] Base légale et durée de conservation : propositions rédigées, à valider (voir ci-dessous).

## À vérifier avant publication

- [ ] SIRET `928 666 577 00012` : contrôler dans l'Annuaire des entreprises le numéro, le statut et le nom.
- [ ] Statut : confirmer que TIYA PRODS est le nom commercial de l'entreprise individuelle, et non une société.
- [ ] Adresse et téléphone : affichés publiquement. L'adresse doit être celle déclarée à l'immatriculation.
- [ ] Immatriculation : activité commerciale → inscription au RCS obligatoire et mention à ajouter (greffe) ; activité artisanale → répertoire des métiers. Vérifier la nature de l'activité (commerciale, artisanale ou libérale) et ce qui figure dans l'Annuaire des entreprises, puis compléter `legal.otherInfo`.
- [ ] TVA : la référence à l'article 293 B du CGI est tolérée jusqu'au 31 décembre 2027, puis remplacée par une référence au CIBS.
- [ ] Base légale (mesures précontractuelles, avec intérêt légitime pour les autres messages) : à valider.
- [ ] Durée de conservation (12 mois après le dernier échange) : à valider, et s'engager à supprimer réellement les messages passé ce délai.
- [ ] Activité déclarée : vérifier qu'elle couvre les services proposés sur le site (montage, production assistée par IA, etc.).
- [ ] Hébergeur : vérifier l'adresse de GitHub, Inc. sur une page officielle de GitHub.
- [ ] Hébergeur : le téléphone est demandé par la réglementation ; GitHub indique ne pas proposer de support téléphonique. Décider de la mention avec un professionnel.
- [ ] Transferts hors Union européenne : GitHub et Gmail sont des services américains. Vérifier et renseigner `privacy.transfers`.
- [ ] `url` : renseigner l'adresse finale du site après la première publication.
- [ ] Faire relire les pages Mentions légales et Confidentialité par un professionnel avant publication.

## Où voir l'état

- `npm run dev` : la liste de contrôle apparaît en haut des pages Mentions légales et Confidentialité (jamais sur le site publié).
- `npm run build` : le terminal liste les champs vides.
