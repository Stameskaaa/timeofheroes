import type { God } from '@/features/gods/types';
import type { HostileCreatures } from '@/features/hostileCreatures/types';
import type { NPC } from '@/features/npc/types';
import { Description } from './Description';

export function CreatureContent({ creatureData }: { creatureData?: HostileCreatures | God | NPC }) {
  let md: string | undefined;
  if (!creatureData) return;

  if ('mdDescription' in creatureData && creatureData.mdDescription?.trim()) {
    md = creatureData.mdDescription;
  } else if ('mdContent' in creatureData && creatureData.mdContent?.trim()) {
    md = creatureData.mdContent;
  }

  if (!md) return null;

  return <Description variant="block" title="Описание" desc={md} />;
}
