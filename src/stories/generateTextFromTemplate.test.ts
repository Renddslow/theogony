import test from 'ava';
import mediator from '../mediator';

import generateTextFromTemplate from './generateTextFromTemplate';
import pick from '../utils/pick';

test('generateTextFromTemplate - returns a string', (t) => {
  t.is(typeof generateTextFromTemplate('', {}, {}), 'string');
});

test('generateTextFromTemplate - with simple variables and dictionary variables returns a string', (t) => {
  mediator.provide('random', () => 0.2);
  mediator.provide('pick', pick);
  const text =
    '{hero.name} wandered through the {$.wood.adjective} wood. His good friend {friend.name} came to meet him for drinks at the {$.bar.names}.';
  const dictionary = {
    wood: {
      adjective: ['tulgey', 'flowery', 'gloomy'],
    },
    bar: {
      names: ['Prancing Pony', 'Short Stumper', 'Crusty Crab'],
    },
  };
  const data = {
    hero: {
      name: 'Frodo',
    },
    friend: {
      name: 'Sam',
    },
  };

  const expected =
    'Frodo wandered through the tulgey wood. His good friend Sam came to meet him for drinks at the Prancing Pony.';
  t.is(generateTextFromTemplate(text, dictionary, data), expected);
});

test('generateTextFromTemplate - with conditional that matches', (t) => {
  const text =
    '[participants.length > 1]\n' +
    '"Hello, {hero.name}," they all said.\n' +
    '[else]\n' +
    '"Hello, {hero.name}," the sole patron said.\n' +
    '[end]';
  const data = {
    hero: {
      name: 'Frodo',
    },
    participants: ['Mike', 'Charles'],
  };
  const expected = '"Hello, Frodo," they all said.';

  t.is(generateTextFromTemplate(text, {}, data), expected);
});

test('generateTextFromTemplate - with conditional that does not match', (t) => {
  const text =
    '[participants.length > 1]\n' +
    '"Hello, {hero.name}," they all said.\n' +
    '[else]\n' +
    '"Hello, {hero.name}," the sole patron said.\n' +
    '[end]';
  const data = {
    hero: {
      name: 'Frodo',
    },
    participants: ['Mike'],
  };
  const expected = '"Hello, Frodo," the sole patron said.';

  t.is(generateTextFromTemplate(text, {}, data), expected);
});

test('generateTextFromTemplate - with matching conditional and surrounding text', (t) => {
  const text =
    `On that day it was {hero.name}'s birthday.\n` +
    '[participants.length > 1]\n' +
    '"Hello, {hero.name}," they all said.\n' +
    '[else]\n' +
    '"Hello, {hero.name}," the sole patron said.\n' +
    '[end]\n' +
    'He was quite pleased with the welcome.';
  const data = {
    hero: {
      name: 'Frodo',
    },
    participants: ['Mike'],
  };
  const expected =
    `On that day it was Frodo's birthday.\n` +
    '"Hello, Frodo," the sole patron said.\n' +
    'He was quite pleased with the welcome.';
  t.is(generateTextFromTemplate(text, {}, data), expected);
});

test('generateTextFromTemplate - with inner conditionals', (t) => {
  const text =
    '[participants.length > 1]\n' +
    'And all the people[!!cake], deciding to have cake,[end] sat down to sup.\n' +
    '[else]\n' +
    'And the lonely bar patron sat down to sup.' +
    '[end]';
  const data = {
    participants: ['Mike', 'Bob'],
    cake: 'chocolate',
  };
  const expected = 'And all the people, deciding to have cake, sat down to sup.';
  t.is(generateTextFromTemplate(text, {}, data), expected);
});

test('generateTextFromTemplate - ', (t) => {
  const text = `{@series participants "name"} went to the store.`;
  const data = {
    participants: [{ name: 'Greg' }, { name: 'Bobby' }, { name: 'Marsha' }, { name: 'Susie' }],
  };
  const expected = 'Greg, Bobby, Marsha, along with Susie went to the store.';
  t.is(generateTextFromTemplate(text, {}, data), expected);
});
