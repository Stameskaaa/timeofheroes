import { motion } from 'framer-motion';
import { EventsModal } from './EventsModal';
import { ReviewsPanel } from './ReviewsPanel';
import { AddressModal } from './AddressModal';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Waves } from '@/components/wrappers/visuals/waves/Waves';
import { SocialButtons } from '@/components/wrappers/buttons/socialButton/SocialButtons';

export const WavesFooter = () => {
  return (
    <footer className="w-full mt-auto pt-[80px]">
      <Waves />
      <div className="w-full min-h-[300px] justify-between flex flex-col gap-14 p-8 bg-brand-400">
        <div className="flex px-4 justify-between flex-col">
          <Text className="!text-3xl md:!text-4xl" color="brand-100">
            Time of heroes
          </Text>
          <Separator
            spacing="empty"
            edgeEffect="gradient"
            edgeColor="brand-400"
            className="!w-[90%] mt-2 mb-[30px]"
            edgeSide="right"
          />
          <div className="flex gap-x-4 gap-y-1 text-text-primary items-start flex-col lg:flex-row min-h-[30px]">
            <EventsModal />
            <AddressModal />
            <ReviewsPanel />
          </div>
        </div>
        <SocialButtons className="flex gap-3 mt-auto ml-auto" />
      </div>
    </footer>
  );
};

export const FooterButton = ({ text, ...props }: { text: string }) => {
  return (
    <motion.button
      {...props}
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05 }}
      className="cursor-pointer flex gap-4 transition-colors text-left text-xl bg-transparent text-text-secondary hover:text-brand-100">
      {text}
      <div className="w-[2px] h-[30px] bg-brand-200"></div>
    </motion.button>
  );
};
