import classNames from 'classnames';
import { AnimatePresence } from 'framer-motion';
import useEmblaCarousel from 'embla-carousel-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import React, { useCallback, useEffect, useRef } from 'react';
import { EmblaCarouselType, EmblaEventType, EmblaOptionsType } from 'embla-carousel';
import { Image } from '../../image/Image';
import { Button } from '@/components/ui/button';
import styles from './parallaxCarousel.module.css';
import { MotionText } from '../../typography/Text';
import { useDotButton } from '../carousel/DotButton';
import { Separator } from '@/components/ui/separator';
import { NextButton, PrevButton, usePrevNextButtons } from './ArrowButton';

const TWEEN_FACTOR_BASE = 0.2;

interface SlideProp {
  id: number;
  src: string;
  name: string;
  shortDescription?: string;
}

type PropType = {
  slides: SlideProp[];
  onSlideClick?: (data: SlideProp) => void;
  options?: EmblaOptionsType;
  withPagination?: boolean;
  paginationType?: 'bordered' | 'default';
};

export const ParallaxCarousel: React.FC<PropType> = ({
  slides,
  options,
  onSlideClick,
  paginationType = 'default',
  withPagination = true,
}) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ ...options, loop: true });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex } = useDotButton(emblaApi);

  const { prevBtnDisabled, nextBtnDisabled, onPrevButtonClick, onNextButtonClick } =
    usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(`.${styles.embla__parallax__layer}`) as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback((emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
    const engine = emblaApi.internalEngine();
    const scrollProgress = emblaApi.scrollProgress();
    const slidesInView = emblaApi.slidesInView();
    const isScrollEvent = eventName === 'scroll';

    emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
      let diffToTarget = scrollSnap - scrollProgress;
      const slidesInSnap = engine.slideRegistry[snapIndex];

      slidesInSnap.forEach((slideIndex) => {
        if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

        if (engine.options.loop) {
          engine.slideLooper.loopPoints.forEach((loopItem) => {
            const target = loopItem.target();

            if (slideIndex === loopItem.index && target !== 0) {
              const sign = Math.sign(target);

              if (sign === -1) {
                diffToTarget = scrollSnap - (1 + scrollProgress);
              }
              if (sign === 1) {
                diffToTarget = scrollSnap + (1 - scrollProgress);
              }
            }
          });
        }

        const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
        const tweenNode = tweenNodes.current[slideIndex];
        tweenNode.style.transform = `translateX(${translate}%)`;
      });
    });
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on('reInit', setTweenNodes)
      .on('reInit', setTweenFactor)
      .on('reInit', tweenParallax)
      .on('scroll', tweenParallax)
      .on('slideFocus', tweenParallax);
  }, [emblaApi, tweenParallax]);

  const currentSlide = slides?.[selectedIndex];
  const pagingBordered = withPagination && paginationType === 'bordered';
  const pagingDefault = withPagination && paginationType === 'default';

  return (
    <div className={`${styles.embla} ${pagingBordered ? '!mb-[80px]' : ''}`}>
      <div className={styles.embla__viewport} ref={emblaRef}>
        <div className={styles.embla__container}>
          {slides.map(({ name, src, id, shortDescription }) => (
            <div
              onClick={() => onSlideClick?.({ name, src, id, shortDescription })}
              className={classNames(
                onSlideClick ? 'cursor-pointer' : '',
                'select-none',
                styles.embla__slide,
              )}
              key={id}>
              <div className={styles.embla__parallax}>
                <div className={`${styles.embla__parallax__layer} relative`}>
                  <Image
                    alt="Фотография"
                    src={src}
                    className={`${styles.embla__slide__img} ${styles.embla__parallax__img}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {pagingBordered && (
        <div className={styles.embla__buttons}>
          <div className="w-[98%] h-[40%] border-1 border-brand-100 border-b-0 absolute left-1/2 top-4 -translate-x-1/2" />
          <div className="w-[96%] h-[40%] border-1 border-brand-100 border-b-0 absolute left-1/2 top-2 -translate-x-1/2" />

          <div className="w-[96%] h-[40%] border-1 border-brand-100 border-t-0 absolute left-1/2 bottom-2 -translate-x-1/2" />
          <div className="w-[98%] h-[40%] border-1 border-brand-100 border-t-0 absolute left-1/2 bottom-4 -translate-x-1/2" />

          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          <div className="absolute z-50 pointer-events-auto min-h-[100px] flex flex-col justify-around items-center bottom-0 border-brand-200 bg-brand-400 border-1 left-1/2 -translate-x-1/2 w-[80%] max-w-[700px] translate-y-1/2">
            <AnimatePresence mode="wait">
              <MotionText
                key={`title-${selectedIndex}`}
                transition={{ duration: 0.3 }}
                initial={{ y: -5, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -5, opacity: 0 }}
                className="my-auto text-center px-2 text-lg md:text-2xl"
                color="brand-100">
                {currentSlide.name}
              </MotionText>
            </AnimatePresence>

            <Separator
              spacing="empty"
              edgeEffect="gradient"
              edgeColor="brand-400"
              className="!h-[1px] !w-[90%]"
            />

            <AnimatePresence mode="wait">
              <MotionText
                key={`desc-${selectedIndex}`}
                transition={{ duration: 0.4 }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="my-auto text-center px-2 text-xs md:text-sm"
                color="text-secondary">
                {currentSlide.shortDescription}
              </MotionText>
            </AnimatePresence>
          </div>
        </div>
      )}
      {pagingDefault && (
        <div className={styles.embla__controls}>
          <div className="flex gap-2">
            <Button
              className="w-[36px] text-brand-100 h-[36px]"
              onClick={onPrevButtonClick}
              disabled={prevBtnDisabled}>
              <ChevronLeft size={20} />
            </Button>
            <Button
              className="w-[36px] text-brand-100 h-[36px]"
              onClick={onNextButtonClick}
              disabled={nextBtnDisabled}>
              <ChevronRight size={20} />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
