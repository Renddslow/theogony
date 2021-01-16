import test from 'ava';

import createAdjective from './createAdjective';
import mediator from '../mediator';
import pick from '../utils/pick';

test('createAdjective - adds an "n" to names ending in "a"', (t) => {
  t.is(createAdjective('Anatha'), 'Anathan');
});

test('createAdjective - adds an "n" to names ending in "ia"', (t) => {
  t.is(createAdjective('Anathia'), 'Anathian');
});

test('createAdjective - adds an "an" to names ending in "i"', (t) => {
  t.is(createAdjective('Anathi'), 'Anathian');
});

test('createAdjective - adds an "an" to names ending in "e"', (t) => {
  t.is(createAdjective('Anathe'), 'Anathean');
});

test('createAdjective - adds an "ian" to names ending in "on"', (t) => {
  t.is(createAdjective('Anathon'), 'Anathonian');
});

test('createAdjective - adds an "ian" to names ending in "st"', (t) => {
  t.is(createAdjective('Anathist'), 'Anathistian');
});

test('createAdjective - adds an "ian" to names ending in "y"', (t) => {
  t.is(createAdjective('Anathy'), 'Anathian');
});

test('createAdjective - adds an "an" to names ending in "o"', (t) => {
  t.is(createAdjective('Anatho'), 'Anathoan');
});

test('createAdjective - randomly adds an "ite" to names ending in a consonant', (t) => {
  const cancel = mediator.provide('random', () => 0.1);
  mediator.provide('pick', pick);
  t.is(createAdjective('Anathot'), 'Anathotite');
  cancel();
});

test('createAdjective - randomly adds an "er" to names ending in a consonant', (t) => {
  const cancel = mediator.provide('random', () => 0.9);
  t.is(createAdjective('Anathot'), 'Anathoter');
  cancel();
});

test('createAdjective - randomly adds an "ist" to names ending in a consonant', (t) => {
  const cancel = mediator.provide('random', () => 0.5);
  t.is(createAdjective('Anath'), 'Anathist');
  cancel();
});

test('createAdjective - adds an "tan" to names ending in a "polis"', (t) => {
  t.is(createAdjective('Anathopolis'), 'Anathopolitan');
});

test('createAdjective - adds an "ist" to names uncovered by other rules', (t) => {
  t.is(createAdjective('Anathu'), 'Anathuist');
});
