import { motion } from 'framer-motion';
import { SmartLink } from '../../navigation/link/SmartLink';

export const MainButton = () => {
  return (
    <div className="relative inline-block group overflow-visible mt-[300px]">
      <motion.div
        className="absolute inset-0 rounded-lg blur-md 
               bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 
               bg-[length:200%_200%] opacity-70 transition-opacity duration-300"
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{
          duration: 4,
          ease: 'linear',
          repeat: Infinity,
        }}
      />
      <SmartLink to="/newbies">
        <motion.button
          whileTap={{ scale: 0.98 }}
          whileHover={{ scale: 1.05, transition: { duration: 0.1 } }}
          animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
          transition={{
            backgroundPosition: { duration: 4, ease: 'linear', repeat: Infinity },
            scale: { duration: 0.1 },
          }}
          style={{ willChange: 'transform, background-position' }}
          className="
    relative px-8 py-3 rounded-lg font-semibold text-white
    shadow-xl cursor-pointer
    bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600
    bg-[length:200%_200%] bg-[position:0%_50%]
  ">
          Начать игру
        </motion.button>
      </SmartLink>
    </div>
  );
};
