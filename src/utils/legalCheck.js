import { site } from '../config/site.js';
import { legalFields, legalToVerify } from '../data/legalFields.js';

export const isFilled = (value) => Boolean(String(value || '').trim());

const get = (object, dotted) =>
  dotted.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), object);

export function getMissingFields() {
  return legalFields.filter((field) => !isFilled(get(site, field.path)));
}

export function getItemsToVerify() {
  return legalToVerify;
}

// Identité de l'éditeur : personne physique, entrepreneur individuel (EI).
// Vide tant que le nom légal n'est pas renseigné : aucune donnée n'est inventée.
export function getPublisherLabel() {
  const name = String(site.legal.publisherName || '').trim();
  if (!name) return '';
  return `${name} — entrepreneur individuel (EI)`;
}
