import test from 'ava';
import seedrandom from 'seedrandom';

import { pickFavoredAnimals } from './animals';
import mediator from '../../mediator';
import range from '../../utils/range';
import pick from '../../utils/pick';

test('pickFavoredAnimals - returns empty array based on range', (t) => {
  mediator.provide('random', seedrandom('boo'));
  mediator.provide('range', range);
  mediator.provide('pick', pick);
  t.deepEqual(pickFavoredAnimals(['cow', 'horse', 'hen', 'pig', 'dog', 'moose']), []);
});

test('pickFavoredAnimals - returns multiple animals based on range', (t) => {
  t.deepEqual(pickFavoredAnimals(['cow', 'horse', 'hen', 'pig', 'dog', 'moose']), ['moose', 'pig']);
});
