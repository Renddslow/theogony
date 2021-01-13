import mediator from '../../mediator';

export const COLORS = [
  'red',
  'scarlet',
  'burgundy',
  'crimson',
  'orange',
  'copper',
  'bronze',
  'brown',
  'caramel',
  'yellow',
  'gold',
  'heliotrope',
  'green',
  'emerald',
  'blue',
  'sapphire',
  'sky blue',
  'indigo',
  'navy',
  'purple',
  'pink',
];

export const pickColors = () => {
  const colorsCount = mediator.call('range', 1, 3);
  const colors = mediator.call('pick', COLORS, colorsCount);
  return Array.isArray(colors) ? colors : [colors];
};
