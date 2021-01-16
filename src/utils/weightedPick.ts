import mediator from '../mediator';

type Item = {
  weight: number;
} & Record<string, any>;

const weightedPick = (list: Array<Item>, valueKey: string) => {
  const values = list.map((d) => d[valueKey]);
  const weights = list.map((d) => d.weight);

  let sum = 0;
  const acc = [];

  for (const weight of weights) {
    sum += weight;
    acc.push(sum);
  }

  const rand = mediator.call('random') * sum;
  return values[acc.filter((el) => el <= rand).length];
};

export default weightedPick;
