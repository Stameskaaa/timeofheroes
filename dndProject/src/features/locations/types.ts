import { Country } from '../country/types';
import { HostileCreatures } from '../hostileCreatures/types';
import { World } from '../worlds/types';

export interface Location {
  id: number;
  src: string;
  name: string;
  shortDescription: string;
  mdDescription: string;

  worlds: World[] | null;
  worldIds: number[];

  countries: Country[] | null;
  countryIds: number[];

  hostileCreatures: HostileCreatures[] | null;
  hostileCreatureIds: number[];
}
