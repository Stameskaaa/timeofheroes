import classNames from 'classnames';
import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/routes/routes';
import { useGetNavigationPaths } from '@/routes/hooks';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';
import { BackButton } from '@/components/wrappers/buttons/backButton/BackButton';
import { SubNavigation } from '@/components/wrappers/navigation/subNavigation/SubNavigation';
import { useGetCharacteristicListQuery } from '@/features/characteristic/api';

const MotionSection = motion.create(Section);

export const CharacterPage = () => {
  const { getChildrenById } = useGetNavigationPaths();
  const { isLoading } = useGetCharacteristicListQuery();
  const routes = getChildrenById(ROUTES, 'character');
  const location = useLocation();
  const isIdPage = /\/\d+$/.test(location.pathname);

  return (
    <AsyncWrapper isLoading={isLoading}>
      <MotionSection
        initial={{ opacity: 0 }}
        transition={{ duration: 1.2 }}
        animate={{ opacity: 1 }}
        paddingY="medium"
        fixedWidth
        className={'flex flex-col gap-4 min-h-[80vh]'}>
        {isIdPage ? <BackButton /> : <SubNavigation data={routes} />}
        <AnimatePresence mode="wait">
          <motion.div
            className={classNames(isIdPage ? 'bg-brand-500' : '', 'flex-1 flex flex-col gap-4')}
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ opacity: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, filter: 'blur(10px)' }}
            transition={{ duration: 0.4 }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </MotionSection>
    </AsyncWrapper>
  );
};
