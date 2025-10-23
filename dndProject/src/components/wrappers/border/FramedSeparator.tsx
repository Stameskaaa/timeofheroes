import classNames from 'classnames';
import { Separator } from '@/components/ui/separator';

export const FramedSeparator = ({
  className,
  size = 'large',
}: {
  className?: string;
  size?: 'large' | 'small';
}) => {
  return (
    <div className={classNames('flex w-full items-center justify-center', className)}>
      <Separator
        edgeEffect="gradient"
        edgeSide="left"
        spacing="empty"
        className="!h-[1px] max-w-[40%]"
      />
      {size === 'large' ? (
        <div className="border-b-[1px] flex-shrink-0 border-r-[1px] border-brand-200 rotate-45 w-[60px] h-[60px] m-3" />
      ) : (
        <div className="border-b-[1px] flex-shrink-0 border-r-[1px] border-brand-200 rotate-45 w-[20px] h-[20px] m-1" />
      )}
      <Separator
        spacing="empty"
        edgeEffect="gradient"
        edgeSide="right"
        className="!h-[1px] max-w-[40%]"
      />
    </div>
  );
};
