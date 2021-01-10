import mediator from '../../mediator';

export const ANIMALS = [
  'alligator',
  'anglership',
  'ape',
  'bat',
  'bear',
  'birds',
  'boar',
  'bull',
  'cat',
  'cow',
  'dinosaur',
  'dire',
  'dog',
  'dolphin',
  'donkey',
  'fish',
  'giant owl',
  'goat',
  'hawk',
  'horse',
  'hyena',
  'jackal',
  'lion',
  'lizard',
  'owl',
  'pig',
  'platypus',
  'pterosaur',
  'raccoon',
  'raven',
  'shark',
  'sheep',
  'snake',
  'snark',
  'whale',
];

export const pickFavoredAnimals = (animals: Array<string>): string | Array<string> => {
  const animalCount = mediator.call('range', 0, 5);
  return mediator.call('pick', animals, animalCount);
};