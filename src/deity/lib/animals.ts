import mediator from '../../mediator';

export const ANIMALS = [];

export const pickFavoredAnimals = (animals: Array<string>): string | Array<string> => {
  const animalCount = mediator.call('range', 0, 5);
  return mediator.call('pick', animals, animalCount);
};
