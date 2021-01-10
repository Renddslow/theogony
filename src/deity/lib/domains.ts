import mediator from '../../mediator';

export const DOMAINS = [
  'air',
  'animal',
  'artifice',
  'chaos',
  'charm',
  'community',
  'creation',
  'darkness',
  'death',
  'destruction',
  'divination',
  'earth',
  'evil',
  'fire',
  'freedom',
  'glory',
  'good',
  'healing',
  'knowledge',
  'law',
  'liberation',
  'luck',
  'madness',
  'magic',
  'nobility',
  'plant',
  'protection',
  'repose',
  'rune',
  'strength',
  'sun',
  'travel',
  'trickery',
  'tyranny',
  'void',
  'war',
  'water',
  'weather',
];

export const pickDomains = (): Array<string> => {
  const domainCount = mediator.call('range', 4, 7);
  return mediator.call('pick', DOMAINS, domainCount);
};
