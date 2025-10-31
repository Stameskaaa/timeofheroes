import React from 'react';
import { motion } from 'framer-motion';
import { Control } from 'react-hook-form';
import { Meta } from '@/features/types';
import type { NPC } from '@/features/npc/types';
import type { God } from '@/features/gods/types';
import type { HostileCreatures } from '@/features/hostileCreatures/types';
import { CreatureCard } from './CreatureCard';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';

interface CreationCardListProps {
  isError: boolean;
  isLoading: boolean;
  currentPage: number;
  limit: number;
  creatureData?: (HostileCreatures | God | NPC)[];
  title?: string;
  control: Control<{ name: string }>;
  meta?: Meta;
  onPageChange: (page: number) => void;
}

export const CreationCardList: React.FC<CreationCardListProps> = ({
  creatureData,
  title,
  control,
  meta,
  onPageChange,
  isLoading,
  isError,
  currentPage,
  limit,
}) => {
  return (
    <Section paddingY="medium" fixedWidth className="flex flex-col min-h-[80vh] gap-6">
      {title && (
        <Text as="span" className="mx-auto" size="3xl">
          {title}
        </Text>
      )}
      <Input name="name" placeholder="Введите имя существа" control={control} />
      <Separator edgeEffect="block" className="mb-6" edgeColor="brand-200" spacing="empty" />
      <AsyncWrapper isLoading={isLoading} isError={isError}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6">
          {creatureData?.map((data, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4 }}>
              <CreatureCard creatureData={data} />
            </motion.div>
          ))}
        </div>
        {!!meta?.total && (
          <Pagination
            className="mt-auto"
            onPageChange={onPageChange}
            total={meta?.total}
            currentPage={currentPage}
            limit={limit}
          />
        )}
      </AsyncWrapper>
    </Section>
  );
};
