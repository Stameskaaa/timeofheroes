import { LucideArrowRight } from 'lucide-react';
import { motion, type Variants } from 'framer-motion';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { Image } from '@/components/wrappers/image/Image';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { AsyncWrapper } from '@/components/wrappers/asyncWrapper/AsyncWrapper';

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const WorldsPage = () => {
  const { navigatePath } = useNavigatePath();
  const { data, isLoading, isError } = useGetSimpleWorldListQuery();

  return (
    <AsyncWrapper isLoading={isLoading} isError={isError}>
      <Section paddingY="medium" fixedWidth screen className="items-center flex flex-col">
        <Text className="mx-auto mb-6" size="4xl">
          Миры
        </Text>
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`flex flex-col gap-6 w-full max-w-[1300px]`}>
          {data?.data.map((world, i) => (
            <motion.div
              key={world.id}
              custom={i}
              variants={cardVariants}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigatePath(`/universe/worlds/${world.id}`)}
              tabIndex={0}
              className="relative h-[430px] rounded-md bg-brand-500 flex items-center cursor-pointer group overflow-hidden border border-brand-200 lg:p-6 hover:border-brand-100 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-200">
              {world.src && (
                <Image
                  src={world?.src}
                  alt="Картинка мира"
                  className="inset-0 z-0 rounded-md lg:w-[60%] filter"
                />
              )}

              <div
                className="z-10 pointer-events-none 
      absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
      flex flex-col items-center justify-center 
      w-[90%] max-w-[90%] mx-auto 
      max-h-max
      rounded-md
      bg-black/72 lg:bg-transparent 
      border-brand-300 
      text-left
      p-6 lg:px-10 xl:px-20 gap-4 
      lg:static lg:inset-auto lg:w-[40%] lg:translate-x-0 lg:translate-y-0">
                <Text className="lg:text-3xl mr-auto" color="brand-100" size="2xl">
                  {world?.name}
                </Text>
                <Text color="text-description" size="lg">
                  {world?.shortDescription || ''}
                </Text>
              </div>

              <motion.div className="absolute right-0 bottom-0 p-4 flex items-center gap-2 opacity-0 group-hover:opacity-100">
                <Text
                  as="span"
                  color="text-secondary"
                  className="flex items-center gap-2"
                  size="lg">
                  Подробнее
                  <motion.div
                    animate={{ x: [0, 4, -4, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 1,
                      ease: 'linear',
                    }}>
                    <LucideArrowRight size={16} />
                  </motion.div>
                </Text>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </Section>
    </AsyncWrapper>
  );
};
