import classNames from 'classnames';
import { motion } from 'framer-motion';
import type { Spell } from '@/features/spells/types';
import { schoolList } from '@/mock/mock';
import styles from './SpellCard.module.css';
import {
  cardTransition,
  cardVariants,
} from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';
import { CharacterIcon } from '@/pages/character/ui/CharacterIcon';
import { Badge } from '../../../../../components/wrappers/badge/Badge';
import { Text } from '../../../../../components/wrappers/typography/Text';
import { SpellDescription } from '@/pages/character/spells/components/spellDescription/SpellDescription';

export const SpellCard = ({ data, onClick }: { data?: Spell; onClick?: () => void }) => {
  const school = schoolList.find(({ id }) => data?.schoolId == id);
  const Icon = school?.icon;

  return (
    <motion.div
      variants={cardVariants}
      transition={cardTransition}
      onClick={onClick}
      style={{
        border: '1px solid rgba(255,255,255,0.06)',
      }}
      className={classNames(
        'flex flex-col w-full rounded-2xl max-w-[600px] bg-brand-400 p-3 gap-2 cursor-pointer',
        styles.card,
        styles?.[data?.schoolId || ''],
      )}>
      <header className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <Text as="span" className="leading-5" color="brand-100" size="xl" weight="bold">
            {data?.name}
          </Text>
          <Text size="sm" color="text-secondary" className="leading-5">
            {data?.level === 0
              ? 'Кантрип'
              : data?.level
              ? `Уровень ${data.level} · ${school?.title}`
              : school?.title}
          </Text>
        </div>
        {Icon ? (
          <CharacterIcon shadow={false}>
            <Icon />
          </CharacterIcon>
        ) : null}
      </header>
      <hr className="border-brand-100" />

      <SpellDescription data={data} />

      <hr className="border-brand-100" />

      <Text color="text-secondary" size="sm" className="leading-5">
        {data?.shortDescription}
      </Text>

      <div className="mt-auto flex justify-end flex-row gap-1">
        {data?.characterClasses?.map(({ name, id }) => (
          <Badge key={id}>{name}</Badge>
        ))}
      </div>
    </motion.div>
  );
};
