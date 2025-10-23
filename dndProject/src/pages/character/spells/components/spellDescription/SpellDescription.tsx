import { Hourglass, MoveHorizontal, Sprout, Timer } from 'lucide-react';
import { DescriptionList } from '@/components/wrappers/typography/DescriptionList';
import type { Spell } from '@/features/spells/types';

export const SpellDescription = ({
  data,
  type = 'short',
}: {
  data?: Spell | null;
  type?: 'full' | 'short';
}) => {
  const descriptionData = [
    { title: 'Время сотворения', icon: Hourglass, value: data?.castingTime },
    { title: 'Длительность', icon: Timer, value: data?.duration },
    { title: 'Дистанция', icon: MoveHorizontal, value: data?.distance },
    { title: 'Компоненты', icon: Sprout, value: data?.componentsList },
  ];

  return <DescriptionList options={{ background: type !== 'short' }} data={descriptionData} />;
};
