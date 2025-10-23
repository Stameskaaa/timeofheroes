import { Text } from '@/components/wrappers/typography/Text';
import type { God } from '@/features/gods/types';
import type { HostileCreatures } from '@/features/hostileCreatures/types';
import type { NPC } from '@/features/npc/types';
import { Description } from './Description';
import { Separator } from '@/components/ui/separator';
import { CreatureStatsTable } from './CreatureStatsTable';
import { creatureSizes, creatureTypes } from '@/mock/mock';

export function StatBlock({ creatureData }: { creatureData?: HostileCreatures | God | NPC }) {
  if (!creatureData || !('mdStatblock' in creatureData)) {
    return null;
  }

  const safeArray = (value: any): string[] =>
    Array.isArray(value) ? value.filter(Boolean).map(String) : value ? [String(value)] : [];

  const size = creatureSizes.find((s) => s.id === creatureData?.sizeId)?.value;
  const type = creatureTypes.find((t) => t.id === creatureData?.typeId)?.value;

  const desc = [size, type].filter(Boolean).join(', ');

  return (
    <div className="flex flex-col gap-1">
      <Separator edgeEffect="gradient" className="!h-[1px] mb-2" spacing="empty" />
      <Text size="2xl" color="brand-100">
        Статблок
      </Text>
      {desc && <Description title="" desc={desc} />}

      <CreatureStatsTable creatureData={creatureData} />

      <Separator
        edgeEffect="gradient"
        edgeSide="right"
        className="!h-[1px] !w-[30%]"
        spacing="empty"
      />

      {creatureData?.armorClass && (
        <Description title="Класс доспеха" desc={creatureData.armorClass} />
      )}
      {creatureData?.speed && <Description title="Скорость" desc={creatureData.speed} />}
      {creatureData?.savingThrows && (
        <Description title="Спасброски" desc={creatureData.savingThrows} />
      )}
      <Separator
        edgeEffect="gradient"
        edgeSide="right"
        className="!h-[1px] !w-[30%]"
        spacing="empty"
      />

      {creatureData?.skills && <Description title="Навыки" desc={creatureData.skills} />}

      {safeArray(creatureData?.damageImmunities).length > 0 && (
        <Description
          title="Иммунитет к урону"
          desc={safeArray(creatureData?.damageImmunities).join(', ')}
        />
      )}

      {safeArray(creatureData?.conditionImmunities).length > 0 && (
        <Description
          title="Иммунитет к состоянию"
          desc={safeArray(creatureData?.conditionImmunities).join(', ')}
        />
      )}

      {safeArray(creatureData?.damageResistance).length > 0 && (
        <Description
          title="Сопротивление к урону"
          desc={safeArray(creatureData?.damageResistance).join(', ')}
        />
      )}

      {safeArray(creatureData?.conditionResistance).length > 0 && (
        <Description
          title="Сопротивление к состоянию"
          desc={safeArray(creatureData?.conditionResistance).join(', ')}
        />
      )}

      {creatureData?.senses && <Description title="Чувства" desc={creatureData.senses} />}
      {creatureData?.language && <Description title="Языки" desc={creatureData.language} />}
      {creatureData?.challenge && <Description title="Опасность" desc={creatureData.challenge} />}
      {creatureData?.proficiencyBonus && (
        <Description title="Бонус мастерства" desc={creatureData.proficiencyBonus} />
      )}
      {creatureData?.mdStatblock && (
        <>
          <Separator
            edgeEffect="gradient"
            edgeSide="right"
            className="!h-[1px] !w-[30%]"
            spacing="empty"
          />{' '}
          <Description desc={creatureData.mdStatblock} variant="block" />
        </>
      )}
    </div>
  );
}
