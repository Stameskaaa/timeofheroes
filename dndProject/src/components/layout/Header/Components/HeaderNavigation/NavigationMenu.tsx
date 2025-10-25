import classNames from 'classnames';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';
import * as NavigationMenu from '@radix-ui/react-navigation-menu';
import { useGetNavigationPaths } from '@/routes/hooks';
import { useActiveChecks } from '@/hooks/useActiveChecks';
import styles from './NavigationMenu.module.css';
import { ROUTES } from '@/routes/routes';
import { Image } from '@/components/wrappers/image/Image';
import { Text } from '@/components/wrappers/typography/Text';
import { SmartLink } from '@/components/wrappers/navigation/link/SmartLink';
import { Separator } from '@/components/ui/separator';

export const HeaderNavigation = () => {
  const { getTopNavigationRoutes } = useGetNavigationPaths();
  const filteredRoutes = getTopNavigationRoutes(ROUTES);
  const { isRootPath, isSubPath } = useActiveChecks();
  const [activeIndex, setActiveIndex] = useState<string | undefined>(undefined);
  const [prevIndex, setPrevIndex] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (activeIndex === undefined) return;

    const handleClickOutside = (e: MouseEvent) => {
      const menu = document.querySelector('[data-nav-menu-root]');
      if (menu && !menu.contains(e.target as Node)) {
        setPrevIndex(activeIndex);
        setActiveIndex(undefined);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [activeIndex]);

  const handleClick = (indexValue: string) => {
    setPrevIndex(activeIndex);
    if (activeIndex === indexValue) {
      setActiveIndex(undefined);
    } else {
      setActiveIndex(indexValue);
    }
  };

  return (
    <NavigationMenu.Root
      data-nav-menu-root
      value={activeIndex}
      className={classNames(styles.Root, 'justify-end!')}>
      <NavigationMenu.List className={classNames(styles.MenuList, 'flex items-center gap-3.5')}>
        {filteredRoutes?.map(({ title, children, src, fullPath }, i) => {
          const indexValue = `${i}`;
          const isActive = activeIndex === indexValue;
          const wasActive = prevIndex === indexValue && activeIndex !== indexValue;

          return (
            <NavigationMenu.Item value={`${i}`} key={i}>
              <button
                onClick={() => handleClick(indexValue)}
                className={classNames(
                  styles.Trigger,
                  'hover:bg-brand-300 select-none rounded-md shadow-bottom-black py-1.5 px-4 h-auto cursor-pointer flex items-center gap-1',
                  isRootPath(fullPath) ? 'border border-brand-200' : '',
                  isActive ? 'bg-brand-400' : '',
                )}
                data-state={isActive ? 'open' : 'closed'}>
                <Text>{title}</Text>
                <ChevronDown
                  size={14}
                  className={classNames(
                    styles.CaretDown,
                    'text-text-primary transition-transform duration-200',
                  )}
                />
              </button>

              <NavigationMenu.Content
                className={classNames(
                  styles.Content,
                  'h-full w-full shadow-2xl/50 shadow-black border-none flex gap-2',
                )}
                data-state={isActive ? 'open' : wasActive ? 'closed' : undefined}>
                <div className="relative w-[250px] min-h-full border-none overflow-hidden">
                  <Image loaderType="light" alt="Фотография навигации" src={src} />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: 'linear-gradient(to left, #1c2224 0%, transparent 70%)',
                    }}
                  />
                </div>

                <div
                  style={{ overscrollBehavior: 'contain' }}
                  className="flex gap-2 flex-col w-full py-3 pr-3 overflow-auto">
                  {children?.map(({ title: cTitle, description, fullPath: cPath }, j) => (
                    <NavigationMenu.Link key={j} asChild>
                      <SmartLink
                        to={cPath}
                        onClick={() => {
                          handleClick('');
                        }}
                        className={classNames(
                          'py-2 px-3 border-brand-200 hover:bg-brand-300 rounded-md transition-color duration-200 cursor-pointer',
                          isSubPath(cPath) ? 'border border-brand-100 bg-brand-400' : '',
                        )}>
                        <Text weight="bold" color="brand-100">
                          {cTitle}
                        </Text>
                        <Text size="sm" color="text-description">
                          {description || ''}
                        </Text>
                      </SmartLink>
                    </NavigationMenu.Link>
                  ))}
                </div>
              </NavigationMenu.Content>
            </NavigationMenu.Item>
          );
        })}
        <NavigationMenu.Indicator
          className={styles.Indicator}
          data-state={activeIndex ? 'visible' : 'hidden'}>
          <div className={classNames(styles.Arrow, 'bg-brand-400')} />
        </NavigationMenu.Indicator>
      </NavigationMenu.List>

      <div className={styles.ViewportPosition}>
        <NavigationMenu.Viewport
          className={classNames(
            styles.Viewport,
            'bg-brand-400 rounded-md min-w-[500px]! min-h-[380px] shadow-2xl/50 shadow-black border-none mt-2.5! flex gap-2 z-10',
          )}
          style={
            {
              '--radix-navigation-menu-viewport-width': '500px',
              '--radix-navigation-menu-viewport-height': '380px',
            } as React.CSSProperties
          }
        />
      </div>
    </NavigationMenu.Root>
  );
};
