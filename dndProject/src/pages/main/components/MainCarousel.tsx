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
    content: [
      {
        title: 'Мы прислушиваемся к ключевой аудитории',
        desc: 'Мы уделяем пристальное внимание самым преданным игрокам, ведь они заражают своим энтузиазмом всех остальных. Потребности аудитории меняются – мы постоянно следим за этим и вносим соответствующие изменения в игру, чтобы превзойти ожидания игроков.',
      },
      {
        title: 'Мы участвуем в жизни сообщества',
        desc: 'Мы общаемся с игроками там, где им удобно, и сопереживаем им. Любое взаимодействие с сообществом – это шанс укрепить наши взаимоотношения и дать пользователям понять, что судьба любимой игры находится в их руках.',
      },
      {
        title: 'Мы поддерживаем комфортную среду',
        desc: 'Наши игры должны быть справедливой, безопасной и гостеприимной средой для всех. Мы стараемся создавать продукты, в которых каждому пользователю будет комфортно.',
      },
      {
        title: 'Мы стремимся делать нечто стоящее',
        desc: 'Наша работа должна приносить явный результат. Мы уважаем время, деньги, личную и общественную жизнь нашего сообщества, и поэтому мы создаём игры, оправдывающие их время и усилия.',
      },
    ],
  },
  {
    title: 'D&D – свобода творчества',
    content: [
      {
        title: 'Мы любим творчество',
        desc: 'Нам важно видеть все возможности, поэтому без творческого подхода не обойтись. Мы остаёмся любознательными и пробуем новое, чтобы приводить игроков в восторг самыми неожиданными способами.',
      },
      {
        title: 'Мы держим высокую планку',
        desc: 'Мастера нашего клуба обладают огромным опытом ведения игр для самой разной аудитории и умеют найти подход к любой ситуации. Они творят историю на ваших глазах, чтобы вы стали в ней главными героями.',
      },
      {
        title: 'Мы рискуем',
        desc: 'Мы не боимся реализовывать смелые задумки, быстро адаптируемся и пробуем неизведанное. Иногда лучше рискнуть, чем остаться при своем.',
      },
      {
        title: 'Мы постоянно учимся',
        desc: 'Мы накапливаем опыт, перенимая его у игроков, коллег и из индустрии в целом. Каждая ошибка – это урок, а для развития одинаково важны как успехи, так и неудачи.',
      },
    ],
  },
  {
    title: 'Наш подход к D&D',
    content: [
      {
        title: 'Единый мир',
        desc: 'Каждое приключение в нашем клубе – это часть общего мира. Все игроки могут не только совершать подвиги ради общего блага, но и вместе встречать последствия своих решений.',
      },
      {
        title: 'Проработанный сеттинг',
        desc: 'Мы создаём единое игровое пространство, которое остаётся постоянным независимо от мастера. Это возможно благодаря тщательной и детальной проработке мира. В нём нет второстепенных персонажей, которых можно забыть, – каждый из них является частью собственной истории, переплетающейся с общим замыслом.',
      },
      {
        title: 'Серьёзный подход',
        desc: 'Мы открыты к тому, что порой игроки могут желать большего, чем просто спасти дракона от принцессы. Если игрок захочет погрузиться во дворцовую политику, торговлю или любое другое занятие по душе, наши мастера обеспечат это, а мир не оставит таких деяний без внимания.',
      },
      {
        title: 'Мир возможностей',
        desc: 'Каждое препятствие на пути вашего героя – это ступень, которую можно преодолеть для достижения цели. Наши мастера следят за соблюдением правил игры и мира, однако именно уникальный подход и творчество игроков позволяют создавать по-настоящему уникальные истории.',
      },
    ],
  },
  {
    title: 'Наш подход к D&D',
    content: [
      {
        title: 'Единый мир',
        desc: 'Каждое приключение в нашем клубе – это часть общего мира. Все игроки могут не только совершать подвиги ради общего блага, но и вместе встречать последствия своих решений.',
      },
      {
        title: 'Проработанный сеттинг',
        desc: 'Мы создаём единое игровое пространство, которое остаётся постоянным независимо от мастера. Это возможно благодаря тщательной и детальной проработке мира. В нём нет второстепенных персонажей, которых можно забыть, – каждый из них является частью собственной истории, переплетающейся с общим замыслом.',
      },
      {
        title: 'Серьёзный подход',
        desc: 'Мы открыты к тому, что порой игроки могут желать большего, чем просто спасти дракона от принцессы. Если игрок захочет погрузиться во дворцовую политику, торговлю или любое другое занятие по душе, наши мастера обеспечат это, а мир не оставит таких деяний без внимания.',
      },
      {
        title: 'Мир возможностей',
        desc: 'Каждое препятствие на пути вашего героя – это ступень, которую можно преодолеть для достижения цели. Наши мастера следят за соблюдением правил игры и мира, однако именно уникальный подход и творчество игроков позволяют создавать по-настоящему уникальные истории.',
      },
    ],
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
                className="relative shrink-0 min-w-[220px] max-w-[400px] cursor-pointer"
                onClick={() => handleTopClick(idx)}>
                <Text
                  color={activeIndex === idx ? 'text-primary' : 'text-description'}
                  size="2xl"
                  className={classNames(
                    'p-6 transition-colors flex justify-center truncate duration-400 border-b-2 border-transparent',
                    activeIndex === idx && !autoplayEnabled ? 'border-brand-100!' : '',
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
                  <div className="h-0.5 rounded bg-brand-200">
                    <motion.div
                      className="bg-brand-100 h-0.5"
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
                  className="shrink-0 max-w-[400px] min-w-[220px] min-h-[280px]">
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
