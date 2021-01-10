import mediator from '../mediator';

const pick = (set: Array<any>, count = 1): string | Array<string> => {
  if (count === 0) return [];

  if (count > 1) {
    return Array(count)
      .fill(null)
      .reduce((acc) => {
        const remaining = set.filter((d) => !acc.includes(d));
        return [...acc, remaining[Math.floor(mediator.call('random') * remaining.length)]];
      }, []);
  }
  return set[Math.floor(mediator.call('random') * set.length)];
};

export default pick;
