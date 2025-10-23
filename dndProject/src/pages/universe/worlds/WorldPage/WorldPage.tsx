import { useParams } from 'react-router-dom';
import { useGetWorldByIdQuery } from '@/features/worlds/api';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/wrappers/image/Image';
import { CountrySection } from './country/CountrySection';
import { DragonIcon } from '@/assets/icons/main/DragonIcon';
import { PantheonSection } from './pantheon/PantheonSection';
import { Text } from '@/components/wrappers/typography/Text';
import { LocationsSection } from './location/LocationsSection';
import { CreaturesSection } from './creatures/CreaturesSection';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { OrnamentalDivider } from '@/components/wrappers/border/OrnamentalDivider';

export const WorldPage = () => {
  const { id } = useParams();
  const { data, isLoading, isError } = useGetWorldByIdQuery({ id: Number(id!) }, { skip: !id });

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <div className="w-full max-h-[60vh] relative flex justify-center overflow-hidden">
        <Image
          alt="Фотография мира"
          src={data?.src}
          className="!h-[50vh] md:!h-[60vh] w-full min-w-[800px]"
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(to top, #141a1b 4%, transparent 100%)',
          }}
        />
        <div className="absolute  bottom-20 left-1/2 gap-2 -translate-x-1/2 flex flex-col w-full items-center">
          <div className="w-[100px] -m-10 h-[100px]">
            <DragonIcon className="text-brand-100" />
          </div>
          <Text
            gradient="brand-gradient"
            className="text-nowrap text-[30px] sm:text-[40px]  md:text-[65px] xl:text-[90px]">
            {data?.name}
          </Text>
          <OrnamentalDivider className="-m-10" />
        </div>
      </div>
      <Section fixedWidth screen className="flex flex-col gap-14 overflow-hidden">
        <MarkDownText className="!max-w-[800px] text-justify mx-auto">
          {data?.mdDescription}
        </MarkDownText>

        <CountrySection countries={data?.countries} />
        <LocationsSection locations={data?.locations} />
        {data?.mdHistory && (
          <div className="flex flex-col gap-6">
            <WorldsSectionTitle title="История" />
            <MarkDownText className="!max-w-[800px] text-justify mx-auto">
              {data.mdHistory}
            </MarkDownText>
          </div>
        )}

        <PantheonSection gods={data?.gods} />
        <CreaturesSection data={data} />
      </Section>
    </AsyncWrapper>
  );
};

export const WorldsSectionTitle = ({
  title,
  type = 'block',
}: {
  title: string;
  type?: 'block' | 'gradient';
}) => {
  if (type === 'block')
    return (
      <div className="flex gap-3 items-center">
        <Separator edgeColor="brand-200" edgeEffect="block" spacing="empty" className="flex-1" />
        <Text className="mx-6" color="brand-100" size="2xl">
          {title}
        </Text>
        <Separator edgeColor="brand-200" edgeEffect="block" spacing="empty" className="flex-1" />
      </div>
    );

  if (type === 'gradient')
    return (
      <div className="flex gap-3 items-center">
        <Text className="mx-6" color="brand-100" size="2xl">
          {title}
        </Text>
        <Separator
          edgeColor="brand-500"
          edgeEffect="gradient"
          spacing="empty"
          edgeSide="right"
          className="flex-1"
        />
      </div>
    );
};
