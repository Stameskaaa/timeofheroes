import { motion } from 'framer-motion';
import type { Trait } from '@/features/traits/types';
import { traitTypes } from '@/features/traits/constant';
import { CharacterIcon } from '../../ui/CharacterIcon';
import { Text } from '@/components/wrappers/typography/Text';
import {
  cardTransition,
  cardVariants,
} from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';

export const TraitCard = ({ traitData, onClick }: { traitData: Trait; onClick: () => void }) => {
  const Icon = traitTypes.find(({ id }) => id === traitData.featureTypeId)?.icon;

  return (
    <motion.div
      className={
        'cursor-pointer w-full border border-transparent max-w-[600px] active:bg-brand-300/60  transition-colors duration-300 bg-brand-400 hover:bg-brand-300 shadow-lg shadow-black rounded-lg'
      }
      variants={cardVariants}
      transition={cardTransition}
      onClick={onClick}>
      <div className="px-5 py-3 h-full flex justify-between gap-1">
        <div className="flex flex-col gap-2">
          <Text style={{ lineHeight: 1 }} color="brand-100" size="lg">
            {traitData.name}
          </Text>
          <ul className="list-disc pl-5 space-y-1  overflow-hidden text-brand-100 text-md">
            {traitData?.worlds?.map(({ id, name }, i) => {
              if (!name) return null;
              return (
                <li className="m-0" key={id}>
                  <Text size="sm" color="text-secondary">
                    {name}
                  </Text>
                </li>
              );
            })}
          </ul>
        </div>
        {Icon && (
          <CharacterIcon>
            <Icon />
          </CharacterIcon>
        )}
      </div>
    </motion.div>
  );
};
