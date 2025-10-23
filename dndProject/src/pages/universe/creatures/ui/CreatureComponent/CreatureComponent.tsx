import React from 'react';
import { motion } from 'framer-motion';
import type { NPC } from '@/features/npc/types';
import type { God } from '@/features/gods/types';
import type { HostileCreatures } from '@/features/hostileCreatures/types';
import { StatBlock } from './components/StatBlock';
import { hasField } from '@/helpers/objectHelpers';
import { Description } from './components/Description';
import { Image } from '@/components/wrappers/image/Image';
import { Text } from '@/components/wrappers/typography/Text';
import { CreatureContent } from './components/CreatureContent';
import { BackButton } from '@/components/wrappers/buttons/backButton/BackButton';

interface CreatureTabsProps {
  creatureData?: HostileCreatures | God | NPC;
}

export const CreatureComponent: React.FC<CreatureTabsProps> = ({ creatureData }) => {
  if (!creatureData) return null;

  return (
    <>
      <BackButton />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="rounded-md flex xl:flex-row gap-2 flex-col bg-brand-500 p-2 lg:p-4 border-[1px] border-brand-200">
        <div className="flex flex-1 gap-4 flex-col">
          <div className="relative">
            <div className="float-left p-2 bg-brand-400 rounded-md relative mr-4 max-[600px]:float-none max-[600px]:w-full inline-block w-[300px]">
              <Image
                src={creatureData.src}
                alt={creatureData.name}
                className="!h-[450px] rounded-md"
              />
              <Text
                color="brand-100"
                className="text-center absolute text-wrap top-0 px-3 py-2 box-border left-0 bg-brand-400 rounded-md text-lg w-full">
                {creatureData.name}
              </Text>
            </div>

            <div className="space-y-2">
              <CreatureContent creatureData={creatureData} />

              {hasField(creatureData, 'fraction') && (
                <Description title="Фракция" desc={(creatureData as NPC).fraction} />
              )}

              {hasField(creatureData, 'status') && (
                <Description title="Последние записи" desc={(creatureData as NPC).status} />
              )}

              {hasField(creatureData, 'locations') && (
                <Description
                  title="Локации"
                  desc={(creatureData as HostileCreatures).locations
                    .map(({ name }) => name)
                    .join(', ')}
                />
              )}

              {hasField(creatureData, 'mdHistory') && (
                <Description
                  title="История"
                  variant="block"
                  desc={(creatureData as HostileCreatures).mdHistory}
                />
              )}

              {hasField(creatureData, 'mdFunFacts') && (
                <Description
                  title="Интересные факты"
                  variant="block"
                  desc={(creatureData as HostileCreatures).mdFunFacts}
                />
              )}
            </div>
          </div>
          <StatBlock creatureData={creatureData} />
        </div>
      </motion.div>
    </>
  );
};
