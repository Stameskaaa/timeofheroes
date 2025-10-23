import { useEffect, useState } from 'react';
import { useNavigation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useScrollLock } from '@/features/scroll/hooks';
import { SHOW_TRANSITION } from '@/features/pageTransition/constants';
import { useAppSelector } from '@/hooks/reduxHooks';
import { PageLoaderIndex } from '@/constants/zIndex';
import { FilledText } from '../../typography/FilledText';
import { DragonIcon } from '@/assets/icons/main/DragonIcon';

export const PageLoader = () => {
  const navigation = useNavigation();
  const { sectionLoading } = useAppSelector((state) => state.pageTransition);
  const [firstMount, setFirstMount] = useState(true);
  const showPageTransition = navigation.state === 'loading' || sectionLoading || firstMount;
  useScrollLock('SectionLoader', showPageTransition);

  useEffect(() => {
    setTimeout(() => {
      setFirstMount(false);
    }, SHOW_TRANSITION * 1000);
  }, []);

  return (
    <AnimatePresence>
      {showPageTransition && (
        <>
          <motion.div
            style={{ zIndex: PageLoaderIndex }}
            initial={{ y: firstMount ? 0 : '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: SHOW_TRANSITION, ease: 'anticipate' }}
            className="flex items-center justify-center flex-col fixed bottom-0 left-0 w-screen h-[calc(100vh+60px)] bg-brand-400 px-6 py-4">
            <DragonIcon className="W-[60px] h-[60px] !text-text-primary" />
            <FilledText
              fillColor="var(--color-text-primary)"
              strokeColor="transparent"
              text="Time of Heroes"
              duration={0.8}
            />
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
