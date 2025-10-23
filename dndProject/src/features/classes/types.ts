import { Spell } from '../spells/types';
import { World } from '../worlds/types';

export interface Class {
  id: number;
  name: string;
  src: string | null;
  diceHit: string | null;
  skills: string | null;
  weaponSkills: string | null;
  toolSkills: string | null;
  armorId: string[] | null;
  startEquipment: string[];

  // spells: Spell[] | null;
  spellIds: number[] | null;

  worlds: World[] | null;
  worldIds?: string[] | null;

  mdDescription: string | null;
  mdTableData: string | null;

  subclassSkills: SubClassSkills[] | null;

  savingThrowsIds: number[] | null;
  characteristicIds: number[] | null;
}

export interface SubClassSkills {
  title: string;
  mdDescription: string;
}
