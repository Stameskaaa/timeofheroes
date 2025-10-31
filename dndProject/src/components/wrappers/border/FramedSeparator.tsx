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
        className="h-px! max-w-[40%]"
      />
      {size === 'large' ? (
        <div className="border-b shrink-0 border-r border-brand-200 rotate-45 w-[60px] h-[60px] m-3" />
      ) : (
        <div className="border-b shrink-0 border-r border-brand-200 rotate-45 w-5 h-5 m-1" />
      )}
      <Separator
        spacing="empty"
        edgeEffect="gradient"
        edgeSide="right"
        className="h-px! max-w-[40%]"
      />
    </div>
  );
};
