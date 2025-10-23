import classNames from 'classnames';
import { motion } from 'framer-motion';
import React, { useState } from 'react';

interface ImageProps {
  src?: string;
  alt: string;
  className?: string;
  imageClassName?: string;
  loaderType?: 'light' | 'dark';
}

export const Image: React.FC<ImageProps> = ({
  src,
  alt,
  className,
  imageClassName,
  loaderType = 'dark',
}) => {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  const showLoader = !loaded || error || false;

  return (
    <div className={classNames('relative w-full h-full overflow-hidden bg-brand-500', className)}>
      {showLoader && (
        <motion.div
          className={classNames(
            'absolute inset-0 w-full h-full',
            loaderType === 'dark' ? 'bg-brand-400' : 'bg-brand-300',
          )}
          initial={{ opacity: 0.7 }}
          animate={{ opacity: 0 }}
          transition={{
            duration: 1.6,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />
      )}

      <img
        src={src || undefined}
        alt={alt}
        onError={() => setError(true)}
        onLoad={() => setLoaded(true)}
        className={classNames(
          'absolute inset-0 w-full select-none h-full object-cover object-center transition-opacity duration-500',
          imageClassName,
          !showLoader ? 'opacity-100' : 'opacity-0',
        )}
        loading="lazy"
      />
    </div>
  );
};
