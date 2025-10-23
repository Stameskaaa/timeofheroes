import React from 'react';
import { BookOpen, Heart, MapPin, ShieldHalf, Skull } from 'lucide-react';
import type { NPC } from '@/features/npc/types';
import type { HostileCreatures } from '@/features/hostileCreatures/types';
import { Button } from '@/components/ui/button';
import type { God } from '@/features/gods/types';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/wrappers/image/Image';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Text } from '@/components/wrappers/typography/Text';

interface CreatureCardProps {
  creatureData?: HostileCreatures | God | NPC;
}

export const CreatureCard: React.FC<CreatureCardProps> = ({ creatureData }) => {
  const { navigatePath } = useNavigatePath();

  if (!creatureData) return null;

  return (
    <div
      onClick={() =>
        navigatePath(`${location.pathname}/${'id' in creatureData ? creatureData.id : ''}`, {
          from: 'listPage',
          creatureData,
        })
      }
      className="bg-brand-400 border cursor-pointer border-brand-200 rounded-lg hover:border-brand-100 transition-colors duration-300 overflow-hidden shadow-lg">
      <div className="max-h-[400px] w-full relative overflow-hidden bg-brand-300">
        <Image src={creatureData.src} alt="картинка существа" className="!h-[400px]" />
        <div
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to top, #1c2224 0%, transparent 40%)' }}
        />
        {creatureData.name && (
          <Text
            color="brand-100"
            className="absolute top-0 left-1/2 -translate-x-1/2 text-center min-w-[280px] text-wrap bg-brand-400 rounded-b-lg px-2 py-[2px]"
            size="lg">
            {creatureData.name}
          </Text>
        )}
      </div>

      <div className="p-3">
        <CreatureTopContent creatureData={creatureData} />
        <CreatureBottomContent creatureData={creatureData} />
      </div>
    </div>
  );
};

export const CreatureTopContent: React.FC<CreatureCardProps> = ({ creatureData }) => {
  if (!creatureData) return null;

  const hp = 'hp' in creatureData ? creatureData.hp : undefined;
  const armorClass = 'armorClass' in creatureData ? creatureData.armorClass : undefined;
  const hasShortDescription = 'shortDescription' in creatureData;

  return (
    <div className="flex items-start justify-between gap-2 flex-1">
      {hasShortDescription && (
        <Text color="text-description" className="leading-5" size="lg">
          {creatureData?.shortDescription}
        </Text>
      )}
      <div className="flex-col flex gap-1 border-brand-300 pl-2">
        {hp && (
          <div className="flex items-center gap-2">
            <Heart className="w-4 h-4 text-rose-400" />
            <Text size="sm" color="text-description">
              {hp}
            </Text>
          </div>
        )}

        {armorClass && (
          <div className="flex items-center gap-2">
            <ShieldHalf className="w-4 h-4 text-blue-400" />
            <Text size="sm" color="text-description">
              {armorClass}
            </Text>
          </div>
        )}
      </div>
    </div>
  );
};

export const CreatureBottomContent: React.FC<CreatureCardProps> = ({ creatureData }) => {
  if (!creatureData) return null;

  const hasShortDescription = 'shortDescription' in creatureData;

  const status = 'status' in creatureData ? creatureData.status : undefined;
  const challenge = 'challenge' in creatureData ? creatureData.challenge : undefined;
  const locations = 'locations' in creatureData ? creatureData.locations : undefined;

  const hasAnyInfo = Boolean(status || (locations && locations.length));
  if (!hasAnyInfo) return null;

  return (
    <div className="flex flex-col gap-3 mt-4">
      {hasShortDescription && <Separator className="bg-brand-300" spacing="empty" />}

      <div className="flex flex-col gap-2">
        {challenge !== undefined && (
          <div className="flex items-center gap-2">
            <Skull className="w-4 h-4 text-brand-100" />
            <Text size="sm" color="text-description">
              {challenge}
            </Text>
          </div>
        )}

        {status && (
          <div className="flex items-center gap-2">
            <BookOpen size={4} className="w-4 h-4 text-brand-100" />
            <Text size="sm" color="text-description">
              Статус: {status}
            </Text>
          </div>
        )}

        {locations && locations.length > 0 && (
          <div className="flex flex-wrap items-center gap-2">
            <MapPin className="w-4 h-4 text-brand-100" />
            <Text size="sm" color="text-description" className="flex flex-wrap gap-1">
              {locations.map((loc) => loc.name).join(', ')}
            </Text>
          </div>
        )}
      </div>

      <div className="ml-auto">
        <Button size="sm" variant="ghost">
          Подробнее →
        </Button>
      </div>
    </div>
  );
};
