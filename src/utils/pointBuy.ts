import mediator from '../mediator';

type StatPoints = {
  str: number;
  dex: number;
  int: number;
  wis: number;
  cha: number;
  con: number;
};

const pointBuy = (): StatPoints => ({
  str: mediator.call('range', 7, 18),
  dex: mediator.call('range', 7, 18),
  int: mediator.call('range', 7, 18),
  wis: mediator.call('range', 7, 18),
  cha: mediator.call('range', 7, 18),
  con: mediator.call('range', 7, 18),
});

export default pointBuy;
