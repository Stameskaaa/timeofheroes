import React from 'react';
import classNames from 'classnames';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Text } from '../../typography/Text';
import type { RouteNode } from '@/routes/routes';
import { Separator } from '@/components/ui/separator';
import { useActiveChecks } from '@/hooks/useActiveChecks';

const variants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
    },
  },
};

export const MenuItem = ({
  i,
  data,
  toggle,
}: {
  i: number;
  data?: RouteNode;
  toggle: () => any;
}) => {
  const { isSubPath } = useActiveChecks();
  const navigate = useNavigate();

  return (
    <React.Fragment key={i}>
      <motion.li className="mb-[16px]" variants={variants}>
        <Text weight="bold" color="text-secondary" size="xl">
          {data?.title}
        </Text>
        <Separator
          spacing="empty"
          edgeSide="right"
          edgeColor="brand-400"
          className="!h-[1px] mt-[10px] bg-brand-200"
          edgeEffect="gradient"
        />
      </motion.li>
      {data?.children?.map(({ title, fullPath, icon: Icon }, i) => {
        const isActive = isSubPath(fullPath);
        return (
          <motion.li
            key={i}
            onClick={() => {
              toggle();
              navigate(fullPath);
            }}
            className={classNames(
              'flex gap-2 items-center cursor-pointer',
              isActive ? 'text-brand-100' : 'text-text-secondary',
              i === (data?.children?.length || 1) - 1 ? 'mb-[48px]' : 'mb-[20px]',
            )}
            variants={variants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}>
            {Icon && <Icon size={16} />}
            <Text color={isActive ? 'brand-100' : 'text-secondary'} size="lg">
              {title}
            </Text>
          </motion.li>
        );
      })}
    </React.Fragment>
  );
};
