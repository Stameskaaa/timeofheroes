import { Country } from '../country/types';
import { World } from '../worlds/types';

export interface NPC {
  id: number;
  name: string;
  src: string;
  status: string;
  fraction: string;
  shortDescription: string;
  mdDescription: string;
  mdHistory: string;
  mdFunFacts: string;

  worldIds: number[] | null;
  worlds: World[] | null;

  countryIds: number[] | null;
  country: Country[] | null;
}
