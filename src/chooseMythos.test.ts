import test from 'ava';

import chooseMythos from './chooseMythos';

test('chooseMythos - returns a random mythos', (t) => {
  const mythos = chooseMythos();
  t.is(mythos, 'from_chaos');
});
