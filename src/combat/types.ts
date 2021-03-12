export type CombatState = {
  initiativeOrder: Array<string>;
  remainingHP: Record<string, number>;
  active: boolean;
};
