import { memo, type RefObject } from 'react';
import { useLocation } from 'react-router-dom';
import { DragonIcon } from '@/assets/icons/main/DragonIcon';
import { AnimatedHeaderTitleText, HeaderTitleText } from './HeaderTitleText';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';

const animatedHeaderPaths = ['/'];
const title = 'Time of heroes';

interface HeaderTitleProps {
  headerRef: RefObject<HTMLDivElement | null>;
  isScrolled: boolean | null;
}

export const HeaderTitle: React.FC<HeaderTitleProps> = memo(({ headerRef, isScrolled }) => {
  const location = useLocation();
  const shouldAnimate = animatedHeaderPaths.includes(location.pathname);

  return (
    <div ref={headerRef} className="grid mr-auto items-center w-[230px] h-[40px]">
      {isScrolled !== null &&
        headerRef.current &&
        (shouldAnimate ? (
          <AnimatedHeaderTitleText parentRef={headerRef} isScrolled={!!isScrolled} title={title} />
        ) : (
          <>
            <SmartLink to="/">
              <HeaderTitleText className="cursor-pointer text-nowrap">
                <DragonIcon className="w-[40px] hidden sm:block cursor-pointer h-[40px]" />
                {title}
              </HeaderTitleText>
            </SmartLink>
          </>
        ))}
    </div>
  );
});
