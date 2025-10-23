import { Text } from '@/components/wrappers/typography/Text';
import { useGetCharacteristicListQuery } from '@/features/characteristic/api';
import { God } from '@/features/gods/types';
import { HostileCreatures } from '@/features/hostileCreatures/types';
import { NPC } from '@/features/npc/types';
import { useAppSelector } from '@/hooks/reduxHooks';

export const CreatureStatsTable = ({
  creatureData,
}: {
  creatureData?: HostileCreatures | God | NPC;
}) => {
  if (!creatureData || !('mdStatblock' in creatureData)) {
    return null;
  }

  const stats = useAppSelector((state) => state.characteristic.characteristics);

  const { data: fetchedData, isLoading } = useGetCharacteristicListQuery(
    {},
    { skip: !!stats?.length },
  );

  const statsData = stats?.length ? stats : fetchedData?.data;

  const characteristics = statsData ?? [];
  const values = creatureData?.characteristics ?? [];

  const tableData = characteristics?.map((stat) => {
    const match = values.find((v) => v.id === stat.id);
    return {
      name: stat.name ?? '-',
      value: match?.value ?? '-',
    };
  });

  if (isLoading) {
    return null;
  }

  return (
    <table className="w-max overflow-x-auto border-collapse my-6">
      <thead className="bg-brand-200 text-left">
        <tr>
          {tableData.map((col, idx) => (
            <th key={idx} className="px-3 py-2 text-text-secondary">
              <Text>{col.name}</Text>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          {tableData.map((col, idx) => (
            <td key={idx} className="border border-brand-300 px-3 py-2 text-text-secondary">
              <Text color="text-secondary">{col.value}</Text>
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
};
