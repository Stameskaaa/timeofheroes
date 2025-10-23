import { motion } from 'framer-motion';

type Props = {
  text?: string;
  size?: string;
  strokeColor?: string;
  fillColor?: string;
  duration?: number;
};

export const FilledText: React.FC<Props> = ({
  text = 'Loading',
  size = 'text-4xl',
  strokeColor = '#000',
  fillColor = '#000',
  duration = 1.3,
}) => {
  return (
    <div className={`relative ${size} font-bold uppercase font-sans`}>
      <span
        className="absolute top-0 left-0 text-transparent"
        style={{
          WebkitTextStroke: `1px ${strokeColor}`,
        }}>
        {text}
      </span>

      <motion.span
        className="relative text-transparent bg-clip-text"
        style={{
          backgroundColor: fillColor,
          WebkitTextStroke: `1px ${strokeColor}`,
        }}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={{ clipPath: 'inset(0 0 0 0)' }}
        transition={{ duration, ease: 'linear' }}>
        {text}
      </motion.span>
    </div>
  );
};
