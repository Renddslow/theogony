import test from 'ava';

import mediator from '../mediator';
import pick from './pick';

test('pick - when count is one, return a string', (t) => {
  const remove = mediator.provide('random', () => 0.24);
  t.is(pick(['axe', 'sword', 'pike', 'club'], 1), 'axe');
  remove();
});

test('pick - when count is not provided, return a string', (t) => {
  const remove = mediator.provide('random', () => 0.24);
  t.is(pick(['axe', 'sword', 'pike', 'club']), 'axe');
  remove();
});

test('pick - when count is greater than one, return an array of string', (t) => {
  const remove = mediator.provide('random', () => 0.1);
  t.deepEqual(pick(['axe', 'sword', 'pike', 'club'], 3), ['axe', 'sword', 'pike']);
  remove();
});

test('pick - when count is zero, return an empty array', (t) => {
  mediator.provide('random', () => {});
  t.deepEqual(pick(['axe', 'sword'], 0), []);
});
