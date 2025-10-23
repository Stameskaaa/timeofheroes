import { Location } from '@/features/locations/types';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Button } from '@/components/ui/button';
import { WorldsSectionTitle } from '../WorldPage';
import { hasArrayData } from '@/helpers/asyncHelpers';
import { ParallaxCarousel } from '@/components/wrappers/media/parallaxCarousel/ParallaxCarousel';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';

export const LocationsSection = ({ locations }: { locations?: Location[] }) => {
  const { navigatePath } = useNavigatePath();

  if (!hasArrayData(locations) || locations.length === 1) return null;

  return (
    <div className="flex flex-col gap-6">
      <WorldsSectionTitle title="Локации" />

      <ParallaxCarousel
        paginationType="bordered"
        onSlideClick={({ id }) => navigatePath(`/universe/locations/${id}`)}
        options={{ slidesToScroll: 1 }}
        slides={locations}
      />

      <div className="flex justify-center">
        <SmartLink to={`/universe/locations`}>
          <Button variant="outline">Подробнее</Button>
        </SmartLink>
      </div>
    </div>
  );
};
