import { useLocation, useNavigation, useParams } from 'react-router-dom';
import { useGetLocationByIdQuery } from '@/features/locations/api';
import { Location } from '@/features/locations/types';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/wrappers/image/Image';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { BackButton } from '@/components/wrappers/buttons/backButton/BackButton';

export const LocationPage = () => {
  const location = useLocation();
  const locationState = location.state as Location | null;
  const { id } = useParams();
  const { data, isLoading, isError } = useGetLocationByIdQuery(
    { id: Number(id) },
    { skip: !id || !!locationState },
  );

  const locationData = locationState || data;

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <Section className="flex flex-col gap-2" paddingY="large" screen fixedWidth>
        {locationState ? <BackButton /> : null}
        <div className="w-full">
          <Image
            alt="фотография локаци"
            src={locationData?.src}
            className="float-left mr-10 mb-6 sm:w-full max-h-[600px] md:w-[400px] z-1 border-1 lg:w-[600px] 2xl:w-[800px] max-w-full !h-[300px] lg:!h-[500px] border-brand-200"
          />
          <div className="pt-20">
            <Text size="3xl">{locationData?.name}</Text>
            {locationData?.worlds?.length ? (
              <Text size="sm" className="flex gap-2" color="text-description">
                {locationData.worlds
                  .filter((w) => w?.name)
                  .map((w, i, arr) => (
                    <SmartLink key={w.id ?? i} to={`/universe/worlds/${w.id}`}>
                      <span className="underline cursor-pointer hover:text-brand-50">
                        {w.name}
                        {i < arr.length - 1 && ', '}
                      </span>
                    </SmartLink>
                  ))}
              </Text>
            ) : null}

            {locationData?.mdDescription && (
              <>
                <Separator
                  edgeEffect="gradient"
                  edgeSide="right"
                  className="my-10 !h-[1px] bg-brand-200 !w-auto"
                />
                <Text color="text-description" className="bg-brand-500">
                  {locationData?.mdDescription}
                </Text>
              </>
            )}
          </div>
        </div>
      </Section>
    </AsyncWrapper>
  );
};
