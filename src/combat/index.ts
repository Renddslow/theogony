import { get } from 'dot-prop';
import { performance } from 'perf_hooks';

import { Monster, Character, StateChange } from '../types';
import { Deity } from '../deity';
import { CombatState } from './types';
import rollInitiative from './initiative';
import mediator from '../mediator';
import attack from './attack';

type Combatant = {
  character: Deity | Character | Monster;
  enemies: string[];
};

const toMap = (arr: any[], keyPath: string) =>
  arr.reduce((acc, item) => {
    acc[get(item, keyPath, '')] = item;
    return acc;
  }, {});

const allCombatantsDead = (combatants: string[], hp: { [key: string]: number }) =>
  combatants.every((id) => hp[id] <= 0);

const combat = (combatants: Array<Combatant>): Record<string, any> => {
  const combatantMap = toMap(combatants, 'character.id');

  const combatState: CombatState = {
    initiativeOrder: rollInitiative(combatants.map(({ character }) => character.id)),
    active: true,
    remainingHP: combatants.reduce(
      (acc, { character }) => ({ ...acc, [character.id]: character.hp }),
      {},
    ),
  };

  const events = [];
  let rounds = 0;

  while (combatState.active) {
    rounds++;
    for (const id of combatState.initiativeOrder) {
      const attacker = combatantMap[id];

      const defenderId = mediator.call(
        'pick',
        attacker.combatants.filter((id) => combatState.remainingHP[id] > 0),
      );
      const defender = combatantMap[defenderId];

      if (!defenderId) {
        continue;
      }

      const atk = attack(
        {
          d: 6,
          count: 2,
          bonus: attacker.character.stats && attacker.character.stats.str,
        },
        defender.character.stats ? defender.character.stats.ac : 14,
      );

      const atkTimestamp = performance.now();

      if (combatState.remainingHP[defenderId] - atk.dmg <= 0) {
        combatState.initiativeOrder = combatState.initiativeOrder.filter((id) => id !== defenderId);
        events.push({
          timestamp: performance.now(),
          type: 'kill',
          attributes: {
            attacker: {
              id: attacker.character.id,
              name: attacker.character.name,
            },
            defender: {
              id: defender.character.id,
              name: defender.character.name,
              hp: combatState.remainingHP[defenderId],
            },
            critical: atk.critical,
            dmg: atk.dmg,
            weapon: attacker.character.favoredWeapon,
          },
        });
      }

      combatState.remainingHP[defenderId] -= atk.dmg;

      if (atk.dmg) {
        events.push({
          timestamp: atkTimestamp,
          type: 'damage',
          attributes: {
            attacker: {
              id: attacker.character.id,
              name: attacker.character.name,
            },
            defender: {
              id: defender.character.id,
              name: defender.character.name,
              hp: combatState.remainingHP[defenderId],
            },
            critical: atk.critical,
            dmg: atk.dmg,
            weapon: attacker.character.favoredWeapon,
          },
        });
      }

      if (allCombatantsDead(attacker.combatants, combatState.remainingHP)) {
        combatState.active = false;
      }
    }
  }

  return {
    events: events.sort((a, b) => a.timestamp - b.timestamp),
    rounds,
    dead: Object.keys(combatState.remainingHP).reduce((acc, id) => {
      if (combatState.remainingHP[id] <= 0) {
        acc.push(id);
      }
      return acc;
    }, []),
  };
};

export default combat;
