import classNames from 'classnames';
import { Text } from '../../typography/Text';
import { Image } from '../../image/Image';

interface PreviewCardProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string;
  name: string;
}

export const PreviewCard: React.FC<PreviewCardProps> = ({ src, name, className, ...props }) => {
  return (
    <div
      {...props}
      className={classNames(
        'w-full flex-1 h-[320px] group hover:scale-102 hover:z-1 transition-all hover:border-brand-100 relative cursor-pointer duration-500 border-1 border-brand-400',
        className,
      )}>
      <Image alt="Фотография карточки" src={src} className="!absolute inset-0" />
      <div className="w-full absolute bottom-0 bg-brand-500/95  border-t-1 border-brand-100">
        <Text
          className="h-[65px] w-full text-center flex items-center justify-center"
          color="brand-100"
          size="md">
          {name}
        </Text>
        <Text
          className="w-full h-0 overflow-hidden flex items-center justify-center group-hover:h-[60px] group-hover:border-brand-100 transition-all duration-400 border-t-1 border-transparent"
          color="brand-100"
          size="sm">
          ПОДРОБНЕЕ
        </Text>
      </div>
    </div>
  );
};
