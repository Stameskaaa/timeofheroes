import classNames from 'classnames';
import { Text } from '../../typography/Text';
import { Separator } from '@/components/ui/separator';
import { Image } from '../../image/Image';

interface ImageRevealCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
  description: string;
}

export const ImageRevealCard: React.FC<ImageRevealCardProps> = ({
  src,
  name,
  description,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={classNames(
        'w-full flex-1 min-h-[320px] h-full select-none transition-all group hover:z-1 hover:scale-102 relative cursor-pointer duration-500 border-brand-400',
        className,
      )}>
      <Image src={src || ''} alt="Фотография карточки" className="!absolute inset-0" />
      <div
        className={classNames(
          'absolute inset-0 p-4 flex items-center justify-center bg-black/60 transition-opacity duration-400',
          'opacity-100 lg:opacity-0 lg:group-hover:opacity-100',
        )}>
        <div className="border-brand-100 text-center border-1 w-full h-full flex flex-col items-center justify-center">
          <Text className="text-[24px]" color="brand-100">
            {name || ''}
          </Text>
          <Separator edgeEffect="gradient" edgeColor="black" className="!w-[40%] !h-[1px]" />
          <Text size="md" className="text-center" color="text-description">
            {description || ''}
          </Text>
        </div>
      </div>
    </div>
  );
};
