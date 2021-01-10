import mediator from '../../mediator';

export const WEAPONS = [];

export const pickWeapon = (): string => mediator.call('pick', WEAPONS);
