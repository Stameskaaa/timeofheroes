import { AnimatePresence, motion } from 'framer-motion';
import { ROUTES } from '@/routes/routes';
import { MenuItem } from './MenuItem';
import { useGetNavigationPaths } from '@/routes/hooks';

const variants = {
  open: {
    transition: { staggerChildren: 0.03, delayChildren: 0.03 },
  },
  closed: {
    transition: { staggerChildren: 0.02, staggerDirection: -1 },
  },
};

export const Navigation = ({ toggle, open }: { toggle: () => any; open: boolean }) => {
  const { getTopNavigationRoutes } = useGetNavigationPaths();
  const filteredRoutes = getTopNavigationRoutes(ROUTES);

  return (
    <AnimatePresence mode="wait">
      {open && (
        <motion.ul
          style={{ overscrollBehavior: 'contain' }}
          className="p-[25px] absolute w-full top-[50px] h-[calc(100%-50px)] overflow-auto pb-18"
          initial="closed"
          animate="open"
          exit="closed"
          variants={variants}>
          {filteredRoutes?.map((data, i) => (
            <MenuItem toggle={toggle} data={data} i={i} key={i} />
          ))}
        </motion.ul>
      )}
    </AnimatePresence>
  );
};
