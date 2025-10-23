import { NPC } from '../npc/types';
import { God } from '../gods/types';
import { Country } from '../country/types';
import { Location } from '../locations/types';

export interface World {
  id: number;
  src: string;
  name: string;
  shortDescription: string;
  mdDescription: string;
  mdHistory: string;

  countryIds: number[];
  countries?: Country[];

  locationIds: number[];
  locations?: Location[];

  npcIds: number[];
  npcs?: NPC[];

  godIds: number[];
  gods?: God[];

  raceIds: number[];
  characterClassIds: number[];
  originIds: number[];
  featureIds: number[];
}
