import test from 'ava';

import chooseMythos from './chooseMythos';
import mediator from './mediator';

test('chooseMythos - returns a random mythos', (t) => {
  mediator.provide('random', () => 0.1);
  const mythos = chooseMythos();
  t.is(mythos, 'chaos');
});
