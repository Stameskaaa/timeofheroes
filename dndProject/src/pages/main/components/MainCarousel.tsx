import classNames from 'classnames';
import useEmblaCarousel from 'embla-carousel-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState, useCallback } from 'react';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const slides = [
  {
    title: 'Игроки важнее всего',
    content: Array.from({ length: 5 }).map((_, i) => ({
      title: `В чем идея ${i + 1}?`,
      desc: 'Представьте: ваше сегодняшнее сражение с рейдовым боссом, спасенная деревня или даже разрушенный замок...',
    })),
  },
  {
    title: 'Команда важнее всего',
    content: Array.from({ length: 5 }).map((_, i) => ({
      title: `Идея команды ${i + 1}`,
      desc: 'Здесь рассказываем про командные задачи и стратегию взаимодействия игроков.',
    })),
  },
  {
    title: 'Развитие персонажей',
    content: Array.from({ length: 5 }).map((_, i) => ({
      title: `Навык ${i + 1}`,
      desc: 'Описание навыка или возможности персонажа в игре.',
    })),
  },
  {
    title: 'Мир игры',
    content: Array.from({ length: 5 }).map((_, i) => ({
      title: `Локация ${i + 1}`,
      desc: 'Краткое описание локации и событий в ней.',
    })),
  },
  {
    title: 'События',
    content: Array.from({ length: 5 }).map((_, i) => ({
      title: `Событие ${i + 1}`,
      desc: 'Описание текущих игровых событий и их влияние на мир.',
    })),
  },
];

const autoplayDelay = 6000;

export const MainCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [autoplayEnabled, setAutoplayEnabled] = useState(true);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, skipSnaps: false });

  const autoplayTimerRef = useRef<number | null>(null);
  const currentIndexRef = useRef(0);

  const stopAutoplay = useCallback(() => {
    if (autoplayTimerRef.current) {
      clearTimeout(autoplayTimerRef.current);
      autoplayTimerRef.current = null;
    }
  }, []);

  const startAutoplay = useCallback(() => {
    if (!emblaApi || !autoplayEnabled || autoplayTimerRef.current) return;

    const loop = () => {
      if (!emblaApi || !autoplayEnabled) return;

      const current = currentIndexRef.current;
      const next = (current + 1) % slides.length;

      currentIndexRef.current = next;
      setActiveIndex(next);
      emblaApi.scrollTo(next);

      autoplayTimerRef.current = window.setTimeout(loop, autoplayDelay);
    };

    autoplayTimerRef.current = window.setTimeout(loop, autoplayDelay);
  }, [emblaApi, autoplayEnabled]);

  useEffect(() => {
    if (!emblaApi) return;

    const onSelect = () => {
      const idx = emblaApi.selectedScrollSnap();
      currentIndexRef.current = idx;
      setActiveIndex(idx);
    };

    const onPointerDown = () => {
      setAutoplayEnabled(false);
      stopAutoplay();
    };

    emblaApi.on('select', onSelect);
    emblaApi.on('pointerDown', onPointerDown);

    if (autoplayEnabled) startAutoplay();

    return () => {
      emblaApi.off('select', onSelect);
      emblaApi.off('pointerDown', onPointerDown);
      stopAutoplay();
    };
  }, [emblaApi, startAutoplay, stopAutoplay, autoplayEnabled]);

  const handleTopClick = (idx: number) => {
    if (emblaApi) emblaApi.scrollTo(idx);
    currentIndexRef.current = idx;
    setActiveIndex(idx);
    setAutoplayEnabled(false);
    stopAutoplay();
  };

  return (
    <Section paddingX="empty" className="flex-1">
      <div className="bg-brand-300/70 flex relative">
        <div ref={emblaRef} className="w-full overflow-hidden">
          <div className="flex max-w-[1500px] mx-auto">
            {slides.map(({ title }, idx) => (
              <div
                key={idx}
                className="relative flex-shrink-0 min-w-[220px] max-w-[400px] cursor-pointer"
                onClick={() => handleTopClick(idx)}>
                <Text
                  color={activeIndex === idx ? 'text-primary' : 'text-description'}
                  size="2xl"
                  className={classNames(
                    'p-6 transition-colors flex justify-center truncate duration-400 border-b-2 border-transparent',
                    activeIndex === idx && !autoplayEnabled ? '!border-brand-100' : '',
                  )}>
                  <Text
                    as="span"
                    color={activeIndex === idx ? 'text-primary' : 'text-description'}
                    className="mr-2 mt-1">
                    0{idx + 1}.
                  </Text>
                  {title}
                </Text>
                {idx === activeIndex && autoplayEnabled && (
                  <div className="h-[2px] rounded bg-brand-200">
                    <motion.div
                      className="bg-brand-100 h-[2px]"
                      initial={{ width: 0 }}
                      animate={{ width: autoplayEnabled ? '100%' : 0 }}
                      transition={{ ease: 'linear', duration: autoplayDelay / 1000 }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          className="w-full max-w-[1600px] m-auto"
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}>
          <Carousel opts={{ dragFree: true, containScroll: 'trimSnaps' }} className="w-full px-2">
            <CarouselContent className="flex gap-4">
              {slides[activeIndex]?.content.map(({ title, desc }, i) => (
                <CarouselItem
                  key={`${activeIndex}-${i}`}
                  className="flex-shrink-0 max-w-[400px] min-w-[220px] min-h-[280px]">
                  <div className="p-6 bg-brand-500 rounded-lg flex flex-col">
                    <Text weight="bold" size="2xl" className="mb-2">
                      {title}
                    </Text>
                    <Text color="text-secondary" size="md">
                      {desc}
                    </Text>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </motion.div>
      </AnimatePresence>
    </Section>
  );
};
