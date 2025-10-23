import {
  BookUser,
  Coffee,
  Crown,
  Gem,
  HandCoins,
  Handshake,
  Landmark,
  Scale,
  UserRoundCheck,
} from 'lucide-react';
import type { RuleTags, RuleTypes } from './types';

export const homeRuleTags: RuleTags[] = [
  { id: 'extensions', value: 'Расширенные возможности', icon: Crown },
  { id: 'unique_innovations', value: 'Уникальные нововведения клуба', icon: Gem },
  { id: 'revisions', value: 'Переосмысления классических правил', icon: Coffee },
  { id: 'special_cases', value: 'Правила частных ситуаций', icon: Scale },
  { id: 'other', value: 'Прочее', icon: HandCoins },
];

export const clubRulesTags: RuleTags[] = [
  { id: 'event_reglament', value: 'Регламенты проведения мероприятий', icon: Landmark },
  { id: 'event_participation', value: 'Правила участия в мероприятиях', icon: BookUser },
  { id: 'club_behavior', value: 'Правила поведения в клубе', icon: Handshake },
  { id: 'user_agreement', value: 'Пользовательское соглашение', icon: UserRoundCheck },
  { id: 'other', value: 'Прочее', icon: HandCoins },
];

export const dndRuleTags: Omit<RuleTags, 'icon'>[] = [
  { id: 'core_terms', value: 'Основные термины' },
  { id: 'core_actions', value: 'Основные действия' },
  { id: 'combat', value: 'Сражение' },
  { id: 'magic', value: 'Магия' },
  { id: 'conditions', value: 'Состояния' },
  { id: 'areas', value: 'Области воздействия' },
  { id: 'exploration', value: 'Исследование мира' },
  { id: 'movement', value: 'Перемещение' },
  { id: 'statblock', value: 'Статблок' },
  { id: 'senses', value: 'Чувства' },
  { id: 'equipment', value: 'Снаряжение' },
  { id: 'other', value: 'Прочее' },
];

export const allTags: Record<RuleTypes, RuleTags[] | Omit<RuleTags, 'icon'>[]> = {
  dnd: dndRuleTags,
  home: homeRuleTags,
  club: clubRulesTags,
};

export const ruleOptions: { id: RuleTypes; value: string }[] = [
  { id: 'dnd', value: 'D&D' },
  { id: 'home', value: 'Домашние' },
  { id: 'club', value: 'Клуб' },
];
