import classNames from 'classnames';
import { motion } from 'framer-motion';
import { SmartLink } from '../link/SmartLink';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';

interface SubNavigationProps {
  data: { title: string; fullPath: string }[];
  className?: string;
}

export const SubNavigation: React.FC<SubNavigationProps> = ({ data, className }) => {
  return (
    <Section
      paddingX="empty"
      fixedWidth
      className={classNames(
        'flex gap-2 md:gap-4 items-center h-[50px] overflow-x-auto scrollbar-hide',
        className,
      )}>
      {data.map(({ title, fullPath }, i) => {
        const isSelected = location.pathname.includes(fullPath);
        return (
          <SmartLink key={`${i}`} className="h-full" to={fullPath}>
            <motion.div
              initial=""
              className={classNames(
                'cursor-pointer relative h-full flex flex-col justify-center px-2 md:px-4',
              )}>
              <Text
                className="transition-colors text-md md:text-lg"
                color={isSelected ? 'text-primary' : 'text-secondary'}>
                {title}
              </Text>
              {isSelected && <ActiveLine />}
            </motion.div>
          </SmartLink>
        );
      })}
    </Section>
  );
};

const ActiveLine = () => {
  return (
    <motion.div
      className="w-full absolute right-0 h-1 bg-brand-200 bottom-0"
      layoutId="activeHeaderLine"></motion.div>
  );
};
