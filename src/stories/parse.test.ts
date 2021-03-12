import test from 'ava';

import parse, { StoryTree } from './parse';

test('parse - returns an object', (t) => {
  t.is(parse('').toString(), '[object Object]');
});

test('parse - single block returns a tree with no workflows', (t) => {
  const text =
    '---!story#opener\n' +
    '\n' +
    'Out of the {$.monster.emerge_from}, {monster.name} emerged. A {$.monster.adjective} {monster.type}, {monster.pronouns.subject} {$.monster.evil_act}. {monster.pronouns.possessive} {$.monster.evil_descriptor} was great, and it broke the souls of the newly formed gods. But {monster.pronouns.possessive} reign was not to last.\n' +
    '\n';

  t.deepEqual(parse(text), {
    chapters: {
      opener:
        'Out of the {$.monster.emerge_from}, {monster.name} emerged. A {$.monster.adjective} {monster.type}, {monster.pronouns.subject} {$.monster.evil_act}. {monster.pronouns.possessive} {$.monster.evil_descriptor} was great, and it broke the souls of the newly formed gods. But {monster.pronouns.possessive} reign was not to last.',
    },
  });
});

test('parse - single block + workflows returns a tree', (t) => {
  const text =
    '---!story#opener\n' +
    '\n' +
    'Out of the {$.monster.emerge_from}, {monster.name} emerged. A {$.monster.adjective} {monster.type}, {monster.pronouns.subject} {$.monster.evil_act}. {monster.pronouns.possessive} {$.monster.evil_descriptor} was great, and it broke the souls of the newly formed gods. But {monster.pronouns.possessive} reign was not to last.' +
    '\n' +
    '---!workflow\n' +
    'story:\n' +
    '    - opener:\n' +
    '        dictionary_scope: chaos\n' +
    '        add_pronouns:\n' +
    '            - monster\n';
  t.deepEqual(parse(text), {
    chapters: {
      opener:
        'Out of the {$.monster.emerge_from}, {monster.name} emerged. A {$.monster.adjective} {monster.type}, {monster.pronouns.subject} {$.monster.evil_act}. {monster.pronouns.possessive} {$.monster.evil_descriptor} was great, and it broke the souls of the newly formed gods. But {monster.pronouns.possessive} reign was not to last.',
    },
    workflow: [{ id: 'opener', dictionary_scope: 'chaos', add_pronouns: ['monster'] }],
  });
});
