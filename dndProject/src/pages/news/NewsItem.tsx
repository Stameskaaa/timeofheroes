import { skipToken } from '@reduxjs/toolkit/query';
import { useLocation, useParams } from 'react-router-dom';
import { News } from '@/features/news/types';
import { useGetNewsByIdQuery } from '@/features/news/api';
import { Separator } from '@/components/ui/separator';
import { Image } from '@/components/wrappers/image/Image';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { BackButton } from '@/components/wrappers/buttons/backButton/BackButton';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { formatDateTimeDetailed } from '@/helpers/dateHelpers';

export const NewsItem = () => {
  const { id: paramsId } = useParams();
  const id = Number(paramsId);
  const location = useLocation();
  const locationData = location.state as { newsData: News };
  const { data, isLoading, isError } = useGetNewsByIdQuery(
    !locationData.newsData ? { id } : skipToken,
  );

  const resultData = locationData.newsData || data;

  return (
    <AsyncWrapper isError={isError} isLoading={isLoading}>
      <Section className="flex flex-col gap-2" paddingY="large" screen fixedWidth>
        {locationData ? <BackButton /> : null}
        <div className="w-full">
          <Image
            alt="фотография новости"
            src={resultData?.src}
            className="float-left mr-10 mb-6 sm:w-full max-h-[600px] md:w-[300px] z-1 border lg:w-[600px] 2xl:w-[800px] max-w-full h-[300px]! lg:!h-[500px] border-brand-200"
          />

          <div className="pt-20">
            <Text size="3xl">{resultData.name}</Text>
            <Text size="sm" color="text-description">
              {formatDateTimeDetailed(resultData.createdAt)}
            </Text>
            <Separator
              edgeEffect="gradient"
              edgeSide="right"
              className="my-10 bg-brand-200 h-px! w-auto!"
            />
            <MarkDownText className="bg-brand-500">{resultData.mdDescription}</MarkDownText>
          </div>
        </div>
      </Section>
    </AsyncWrapper>
  );
};
