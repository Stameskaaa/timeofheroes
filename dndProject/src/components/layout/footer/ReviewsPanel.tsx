import { Star, UserRound } from 'lucide-react';
import { FooterButton } from './WavesFooter';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { SidePanel } from '@/components/wrappers/modals/sidePanel/SidePanel';

export const ReviewsPanel = () => {
  const reviews = [
    {
      text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam perspiciatis, repellat tempore accusantium, aperiam, consequatur in laborum non nisi vero hic quisquam iusto natus quidem? Nemo dolorum nulla iusto nobis?',
      name: 'Олежка Олежикн',
      count: 5,
    },
  ];

  return (
    <SidePanel buttonTrigger={<FooterButton text="Отзывы клиентов" />}>
      <Text className="mt-4 px-4 pr-[55px]" size="3xl">
        Отзывы клиентов
      </Text>
      <Separator edgeEffect="gradient" className="h-px!" spacing="empty" edgeSide="right" />
      <div className="flex overflow-y-auto flex-wrap gap-6 px-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div
            key={i}
            className="p-6 flex-1 min-w-[250px] bg-brand-300/70 rounded-sm flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full shadow-md bg-brand-200 flex items-center justify-center">
                <UserRound size={30} className="text-text-secondary" />
              </div>

              <div className="flex flex-col">
                <Text className="font-semibold">{reviews[0].name}</Text>

                <div className="flex gap-1">
                  {Array(5)
                    .fill(0)
                    .map((_, idx) => {
                      const isFilled = reviews[0].count - idx >= 1;
                      return (
                        <Star
                          key={idx}
                          className="w-5 h-5"
                          strokeWidth={1.5}
                          stroke={isFilled ? 'none' : '#7f9a89'}
                          fill={isFilled ? '#7f9a89' : 'none'}
                        />
                      );
                    })}
                </div>
              </div>
            </div>

            <Text className="mt-2 text-sm">{reviews[0].text}</Text>
          </div>
        ))}
      </div>
    </SidePanel>
  );
};
