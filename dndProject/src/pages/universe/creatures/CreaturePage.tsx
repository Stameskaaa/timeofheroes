import React from 'react';
import { useLocation, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/query/react';
import { NPC } from '@/features/npc/types';
import { useGetNpcByIdQuery } from '@/features/npc/api';
import { HostileCreatures } from '@/features/hostileCreatures/types';
import { useGetHostileCreatureByIdQuery } from '@/features/hostileCreatures/api';
import { Section } from '@/components/wrappers/sections/section/Section';
import { CreatureComponent } from './ui/CreatureComponent/CreatureComponent';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';

interface LocationState {
  creatureData?: NPC | HostileCreatures;
}

interface CreatureTabsProps {
  type: 'npc' | 'hostile';
}

export const CreaturePage: React.FC<CreatureTabsProps> = ({ type }) => {
  const { id: paramsId } = useParams<{ id: string }>();
  const id = Number(paramsId);

  const location = useLocation();
  const state = location.state as LocationState | null;

  const provided = state?.creatureData;
  const providedMatchesId = Boolean(
    provided && typeof provided.id === 'number' && provided.id === id,
  );

  const skipHostile = type === 'npc' || providedMatchesId;
  const skipNpc = type !== 'npc' || providedMatchesId;

  const {
    data: hostile,
    isLoading: hostileLoading,
    isError: hostileError,
  } = useGetHostileCreatureByIdQuery(skipHostile ? skipToken : { id }, { skip: !!skipHostile });

  const {
    data: npc,
    isLoading: npcLoading,
    isError: npcError,
  } = useGetNpcByIdQuery(skipNpc ? skipToken : { id }, { skip: !!skipNpc });

  const creatureData = providedMatchesId ? provided : type === 'npc' ? npc : hostile;

  const isLoading = providedMatchesId ? false : type === 'npc' ? npcLoading : hostileLoading;
  const isError = providedMatchesId ? false : type === 'npc' ? !!npcError : !!hostileError;

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <Section screen paddingY="medium" className="flex flex-col gap-4" fixedWidth>
        <CreatureComponent creatureData={creatureData} />
      </Section>
    </AsyncWrapper>
  );
};
