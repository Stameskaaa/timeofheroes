import { useMemo } from 'react';
import { World } from '@/features/worlds/types';
import { useGetLocationListQuery } from '@/features/locations/api';
import { WorldsSectionTitle } from '../WorldPage';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Spinner } from '@/components/wrappers/loaders/spinner/Spinner';
import { Carousel } from '@/components/wrappers/media/carousel/Carousel';
import { ImageRevealCard } from '@/components/wrappers/cards/ImageRevealCard/ImageRevealCard';

export const CreaturesSection = ({ data }: { data?: World | null }) => {
  const { navigatePath } = useNavigatePath();
  const { data: locations, isLoading } = useGetLocationListQuery({ ids: data?.locationIds });

  const creatureLists = useMemo(() => {
    if (!locations?.data?.length) return { monsters: [], raidBosses: [] };

    const allCreatures =
      locations?.data?.flatMap((loc) => loc?.hostileCreatures ?? [])?.filter(Boolean) ?? [];

    const uniqueCreatures = allCreatures.filter(
      (c, i, arr) => c?.id && arr.findIndex((x) => x?.id === c?.id) === i,
    );

    return {
      monsters: uniqueCreatures.filter((c) => c?.type === 'monster') ?? [],
      raidBosses: uniqueCreatures.filter((c) => c?.type === 'raidBoss') ?? [],
    };
  }, [locations]);

  if (!data) return null;

  if (isLoading) {
    return <Spinner className="m-auto" />;
  }

  return (
    <>
      {creatureLists?.monsters?.length > 0 && (
        <div className="flex flex-col gap-6">
          <WorldsSectionTitle type="gradient" title="Бестии" />
          <Carousel
            slides={creatureLists?.monsters.map(({ id, shortDescription, src, name }) => (
              <ImageRevealCard
                key={id}
                onClick={() => navigatePath(`/universe/bestiary/${id}`)}
                name={name}
                description={shortDescription}
                src={src}
              />
            ))}
          />
        </div>
      )}
      {data?.npcs && data?.npcs?.length > 0 && (
        <div className="flex flex-col gap-6">
          <WorldsSectionTitle type="gradient" title="Личности" />
          <Carousel
            slides={data?.npcs?.map((data) => (
              <ImageRevealCard
                key={data?.id}
                onClick={() => navigatePath(`/universe/npc/${data?.id}`)}
                name={data?.name}
                description={data?.shortDescription}
                src={data?.src}
              />
            ))}
          />
        </div>
      )}

      {creatureLists?.raidBosses?.length > 0 && (
        <div className="flex flex-col gap-6">
          <WorldsSectionTitle type="gradient" title="Рейдбоссы" />
          <Carousel
            slides={creatureLists?.raidBosses.map(({ id, name, src, shortDescription }) => (
              <ImageRevealCard
                onClick={() => navigatePath(`/universe/raidbosses/${id}`)}
                name={name}
                description={shortDescription}
                src={src}
              />
            ))}
          />
        </div>
      )}
    </>
  );
};
