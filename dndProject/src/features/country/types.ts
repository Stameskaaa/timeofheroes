import type { Location } from '../locations/types';
import type { NPC } from '../npc/types';
import type { World } from '../worlds/types';

export interface Country {
  id: number;
  src: string;
  name: string;
  shortDescription: string;
  mdDescription: string;

  npcIds: number[];
  npcs: Pick<NPC, 'id' | 'name' | 'src' | 'shortDescription' | 'status' | 'fraction'>[];

  locationIds: number[];
  locations: Pick<Location, 'id' | 'name' | 'shortDescription' | 'src'>[];

  worldIds: number[];
  worlds: Pick<World, 'id' | 'src' | 'name' | 'shortDescription'>;
}
