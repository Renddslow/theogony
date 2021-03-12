import mediator from '../mediator';

type Dmg = {
  d: 2 | 3 | 4 | 6 | 8 | 10 | 12 | 20 | 100;
  count?: number;
  bonus?: number;
};

type AttackEvent = {
  critical: boolean;
  roll: number;
  hit: boolean;
  dmg: number;
};

const attack = (dmg: Dmg, targetAc: number, criticalMin: number = 20): AttackEvent => {
  const atk: Partial<AttackEvent> = {
    roll: mediator.call('d', 20),
    hit: false,
    dmg: 0,
    critical: false,
  };

  if (atk.roll >= targetAc) {
    atk.hit = true;
    atk.dmg = mediator.call('d', dmg.d, dmg.count || 1) + (dmg.bonus || 0);
    atk.critical = atk.roll >= criticalMin;
  }

  return atk as AttackEvent;
};

export default attack;
