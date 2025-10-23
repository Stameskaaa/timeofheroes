import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { EmblaOptionsType } from 'embla-carousel';
import useEmblaCarousel from 'embla-carousel-react';
import styles from './carousel.module.css';
import { DotButton, useDotButton } from './DotButton';

type PropType = {
  slides: ReactNode[];
  options?: EmblaOptionsType;
};

export const Carousel: React.FC<PropType> = ({ slides, options }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const { selectedIndex, onDotButtonClick, scrollSnaps } = useDotButton(emblaApi);

  return (
    <div className={styles.embla}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map((element, index) => (
            <div className={`${styles.embla__slide}`} key={index}>
              {element}
            </div>
          ))}
        </div>
      </div>
      <div className={styles.embla__dots}>
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={classNames(
              index === selectedIndex ? '!border-brand-100' : '',
              'text-text-description text-xs',
            )}>
            {index + 1}
          </DotButton>
        ))}
      </div>
    </div>
  );
};
