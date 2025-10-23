import type { Location } from '../locations/types';

export type HostileType = 'monster' | 'raidBoss';

export interface HostileCreatures {
  id: number;
  name: string;
  src: string;
  type: HostileType;

  shortDescription: string;
  mdDescription: string;

  status?: string;
  mdHistory?: string;
  mdFunFacts?: string;
  mdStatblock?: string;

  locationIds: number[];
  locations: Pick<Location, 'id' | 'name' | 'shortDescription' | 'src'>[];

  sizeId: string;
  typeId: string;
  hp: string;
  // string для очистки в форме
  armorClass: number | string;
  speed: string;

  characteristics: { id: number; value: string }[];
  savingThrows: string;

  skills: string;

  damageImmunities: number[];
  conditionImmunities: number[];

  damageResistance: number[];
  conditionResistance: number[];

  senses: string;
  language: string;

  challenge: string;
  // string для очистки в форме
  proficiencyBonus: number | string;
}
