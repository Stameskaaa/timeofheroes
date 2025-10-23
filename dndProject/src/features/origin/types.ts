import { Trait } from '../traits/types';
import { World } from '../worlds/types';

export interface Origin {
  id: number;
  name: string;
  src: string | null;
  skills: string | null;
  toolSkills: string | null;
  startEquipment: (string | null)[];
  mdDescription: string | null;

  features: Trait[] | null;
  featureIds: number[] | null;

  characteristicIds: number[] | null;

  worlds?: World[];
  worldIds: number[] | null;
}
