import { site } from '../config/site.js';
import { legalFields } from '../data/legalFields.js';

export const isFilled = (value) => Boolean(String(value || '').trim());

const get = (object, dotted) =>
  dotted.split('.').reduce((acc, key) => (acc ? acc[key] : undefined), object);

export function getMissingFields() {
  return legalFields.filter((field) => !isFilled(get(site, field.path)));
}
