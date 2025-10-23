import { World } from '../worlds/types';

export interface RaceFeature {
  type: string | null;
  size?: string | null;
  speed?: string | null;
  mdContent: string | null;
}

export interface Race {
  id: number;
  name: string;
  src: string | null;
  mdDescription: string | null;
  features: RaceFeature;
  mdHistory: string | null;

  worlds: World[] | null;
  worldIds?: number[] | null;
}
