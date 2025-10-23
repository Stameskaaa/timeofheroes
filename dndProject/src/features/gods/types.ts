import { World } from '../worlds/types';

export interface God {
  id: number;
  name: string;
  src: string;
  mdContent: string;

  world: World[];
  worldIds: number[];
}
