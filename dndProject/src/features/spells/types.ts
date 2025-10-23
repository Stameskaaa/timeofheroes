import type { Class } from '../classes/types';

export interface Spell {
  id: number;
  name: string;
  level: number;
  schoolId: number;
  castingTime: string;
  duration: string;
  distance: string;
  shortDescription: string;
  mdDescription: string;
  componentsList: string;

  characterClassIds: number[] | null;
  characterClasses: Class[] | null;
}

export interface SpellSchool {
  id: number;
  title: string;
  color: string;
  icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}
