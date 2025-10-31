import classNames from 'classnames';
import { FramedSeparator } from './FramedSeparator';

export const OrnamentalDivider = ({ className }: { className?: string }) => {
  return (
    <div className={classNames('relative flex  h-20 flex-col items-start w-full', className)}>
      <FramedSeparator className="mx-auto -m-3 w-[90%]" />
      <div className="w-[80%] -my-8 mx-auto">
        <FramedSeparator size="small" />
      </div>
    </div>
  );
};
