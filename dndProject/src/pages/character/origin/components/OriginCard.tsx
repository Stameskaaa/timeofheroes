import type { Origin } from '@/features/origin/types';
import {
  cardTransition,
  cardVariants,
} from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';
import { Text } from '@/components/wrappers/typography/Text';
import { MotionHoverZoomCard } from '@/components/wrappers/cards/hoverZoomCard/HoverZoomCard';

export const OriginCard = ({
  originData,
  onClick,
}: {
  originData: Origin;
  onClick: () => void;
}) => {
  const Title = () => (
    <Text color="text-primary" size="lg">
      {originData.name}
    </Text>
  );

  const Description = () => {
    return (
      <ul className="list-disc pl-5 space-y-1 overflow-hidden text-brand-100 text-md">
        {originData?.worlds?.map(({ name }, i) => {
          if (!name) return null;
          return (
            <li className="m-0" key={i}>
              <Text size="sm" color="text-secondary">
                {name}
              </Text>
            </li>
          );
        })}
      </ul>
    );
  };

  return (
    <MotionHoverZoomCard
      className="max-w-[400px]"
      title={<Title />}
      src={originData?.src || ''}
      description={<Description />}
      variants={cardVariants}
      transition={cardTransition}
      onClick={onClick}
    />
  );
};
