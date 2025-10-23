import type { Race } from '@/features/races/types';
import {
  cardTransition,
  cardVariants,
} from '@/components/wrappers/lists/AnimatedGridList/AnimatedGridList';
import { Text } from '@/components/wrappers/typography/Text';
import { MotionHoverZoomCard } from '@/components/wrappers/cards/hoverZoomCard/HoverZoomCard';

export const RaceCard = ({ raceData, onClick }: { raceData: Race; onClick: () => void }) => {
  const Title = () => (
    <Text color="text-primary" size="lg">
      {raceData?.name}
    </Text>
  );

  const Description = () => {
    return (
      <ul className="list-disc pl-5 text-brand-100 overflow-hidden text-md">
        {raceData?.worlds?.map(({ name, id }) => {
          if (!name) return null;
          return (
            <li className="m-0" key={id}>
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
      src={raceData?.src || ''}
      description={<Description />}
      variants={cardVariants}
      transition={cardTransition}
      onClick={onClick}
    />
  );
};
