// PLACES and the `items` of ThousandsOfOptions, from Combobox.stories.tsx.
export const PLACES = [
  { name: 'Leikanger', value: 'leikanger', description: 'Vestland' },
  { name: 'Oslo', value: 'oslo', description: 'Oslo' },
  { name: 'Brønnøysund', value: 'bronnoysund', description: 'Nordland' },
  { name: 'Stavanger', value: 'stavanger', description: 'Rogaland' },
  { name: 'Trondheim', value: 'trondheim', description: 'Trøndelag' },
  { name: 'Tromsø', value: 'tromso', description: 'Troms og Finnmark' },
  { name: 'Bergen', value: 'bergen', description: 'Vestland' },
  { name: 'Mo i Rana', value: 'moirana', description: 'Nordland' },
];

export const items = Array.from({ length: 2000 }, (_, index) => ({ name: `Option ${index}`, value: `option-${index}` }));

// The stories' data, as vendored with them.
export { data } from '../../../upstream/packages/react/src/components/Combobox/data/data';
