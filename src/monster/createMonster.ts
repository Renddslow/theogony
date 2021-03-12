import { Monster } from '../types';
import createName from '../naming/createName';
import { monsterNames } from '../data';
import mediator from '../mediator';
import getSizeMod from '../getSizeMod';
import getAbilityMod from '../getAbilityMod';
import { pickGender } from '../deity/lib/gender';

const createMonster = (type: string): Monster => {
  const skillPoints = mediator.call('point-buy');
  const hpDie = mediator.call('pick', [6, 8, 10, 12]);
  const hpDieCount = mediator.call('range', 1, 13);

  const size = mediator.call('pick', ['large', 'huge', 'gargantuan', 'colossal']);
  const ac = 10 + getSizeMod(size) + getAbilityMod(skillPoints.dex);

  const monster: Partial<Monster> = {
    id: mediator.call('cuid'),
    type,
    size,
    characterType: 'monster',
    hp: mediator.call('d', hpDie, hpDieCount) + hpDieCount * skillPoints.con,
    hpDescription: `${hpDieCount}d${hpDie} + ${hpDieCount * skillPoints.con}`,
    gender: pickGender(),
    // TODO: rework stats more strategically long-term
    stats: {
      ...skillPoints,
      speed: mediator.call('pick', [20, 30, 40, 50, 60]),
      fort: getAbilityMod(skillPoints.con),
      ref: getAbilityMod(skillPoints.dex),
      will: getAbilityMod(skillPoints.wis),
      ac,
    },
    description: '',
  };

  if (type === 'chaos') {
    monster.name = createName(monsterNames.chaos);
    monster.type = mediator.call('pick', ['giant', 'serpent', 'dragon', 'elemental']);
  } else if (mediator.call('d', 100) > 95) {
    // 5% of the time allow a named monster
    monster.name = createName(monsterNames.chaos); // TODO: change to monster name dataset
  }

  return monster as Monster;
};

export default createMonster;
