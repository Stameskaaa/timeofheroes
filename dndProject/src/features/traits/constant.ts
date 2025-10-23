import { HandFist, HandHeart, Sparkles, Swords } from 'lucide-react';
import { TraitType } from './types';

export const traitTypes: TraitType[] = [
  {
    id: 1,
    name: 'Происхождение',
    description: 'Чертa, связанная с историей и корнями персонажа, его культурой и прошлым.',
    icon: HandHeart,
  },
  {
    id: 2,
    name: 'Боевые',
    description:
      'Навыки и особенности, усиливающие персонажа в сражениях: владение оружием, приёмы, выносливость.',
    icon: Swords,
  },
  {
    id: 3,
    name: 'Эпические',
    description: 'Редкие и уникальные способности, делающие персонажа особенным и выделяющимся.',
    icon: Sparkles,
  },
  {
    id: 4,
    name: 'Общие',
    description:
      'Базовые черты, доступные большинству героев, вне зависимости от их происхождения и класса.',
    icon: HandFist,
  },
];
