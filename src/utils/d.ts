import mediator from '../mediator';

const d = (d: 2 | 3 | 4 | 6 | 8 | 10 | 12 | 20 | 100, count: number = 1): number =>
  Array(count)
    .fill(null)
    .reduce((acc) => {
      return acc + Math.floor(mediator.call('random') * d);
    }, 0);

export default d;
