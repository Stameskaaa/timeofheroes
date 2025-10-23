import { World } from '../worlds/types';

export interface Trait {
  id: number;
  name: string;
  featureTypeId: number | null;
  requirements: string | null;
  mdDescription: string | null;

  worlds: World[] | null;
  worldIds?: number[] | null;
}

export interface TraitType {
  id: number;
  name: string;
  description: string;
  icon: any;
}
