import test from 'ava';

import { pickAlignment } from './alignment';
import mediator from '../../mediator';

test('pickAlignment - returns "N" when Neutral is picked in col and row', (t) => {
  mediator.provide('random', () => {});
  const remove = mediator.provide('pick', () => 'N');
  t.is(pickAlignment(), 'N');
  remove();
});

test('pickAlignment - returns random alignment', (t) => {
  mediator.provide('pick', (set) => (set.includes('L') ? 'C' : 'G'));
  t.is(pickAlignment(), 'CG');
});
