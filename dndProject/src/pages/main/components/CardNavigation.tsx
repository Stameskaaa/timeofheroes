import { motion } from 'framer-motion';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Image } from '@/components/wrappers/image/Image';
import { MotionText, Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';

const IMAGES = [
  {
    src: 'https://cdna.artstation.com/p/assets/images/images/081/638/144/large/anato-finnstark-libera.jpg?1730820426',
    path: '/news',
    text: 'Новости',
    description:
      'Следите за жизнью клуба: анонсы грядущих событий, планы развития клуба, новости игровых миров и истории о прошедших приключениях.',
  },
  {
    src: 'https://cdna.artstation.com/p/assets/images/images/085/023/762/large/anato-finnstark-img-20230809-152145w34.jpg?1739801345',
    path: '/newbies',
    text: 'Как начать игру',
    description:
      'Здесь собрано всё, что нужно, чтобы легко и комфортно погрузиться в мир Dungeons & Dragons. Ваше путешествие в клубе «Time of Heroes» начинается именно здесь.',
  },
  {
    src: 'https://cdna.artstation.com/p/assets/images/images/083/778/198/large/anato-finnstark-eb.jpg?1736781617',
    path: '/universe/worlds',
    text: 'Вселенная',
    description:
      'Познакомьтесь с вселенной, в которой предстоит сражаться и странствовать вашим героям. Узнайте о её знаковых локациях, интересных личностях и опасных чудовищах.',
  },
  {
    src: 'https://cdnb.artstation.com/p/assets/images/images/066/387/197/large/anato-finnstark-f.jpg?1692782563',
    path: '/resources/rules',
    text: 'Правила',
    description:
      'Полный свод правил, регулирующих работу клуба и проведение игр. Ознакомьтесь с внутренним распорядком, правами и обязанностями игроков и персонала клуба.',
  },
];

export const CardNavigation = () => {
  const { navigatePath } = useNavigatePath();
  return (
    <Section fixedWidth screen className="mx-auto flex items-center justify-center flex-col ">
      <MotionText
        className="mb-14 text-center"
        size="3xl"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}>
        Актуальные события и планы
      </MotionText>

      <motion.div
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.4 }}
        className="w-full flex justify-center">
        <Carousel
          opts={{
            dragFree: true,
            containScroll: 'trimSnaps',
            align: 'center',
          }}
          className="w-full">
          <CarouselContent style={{ margin: 0 }} className="flex items-center gap-6 justify-start">
            {IMAGES.map(({ src, text, path, description }, i) => (
              <CarouselItem
                onClick={() => navigatePath(path)}
                key={i}
                style={{ padding: 0 }}
                className="shrink-0 cursor-pointer group max-w-[440px] h-[440px] min-w-[400px] min-h-[400px] flex first:ml-0 ml-[-95px]">
                <article className="flex flex-col w-full h-full overflow-hidden gap-2">
                  <div
                    className="w-full h-[calc(100%-64px)] relative overflow-hidden group"
                    style={{
                      WebkitClipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
                      clipPath: 'polygon(0 0, 80% 0, 100% 100%, 20% 100%)',
                    }}>
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 opacity-0 transition-opacity duration-400 group-hover:opacity-100">
                      <Text size="lg" className="ml-18 mr-14" color="brand-100">
                        {description}
                      </Text>
                    </div>
                    <Image
                      src={src}
                      alt="Фотография навигации"
                      className="block! pointer-events-none -z-1"
                    />
                  </div>

                  <div className="pl-[20%] h-16 flex flex-col justify-center">
                    <Text className="leading-6" size="xl">
                      {text}
                    </Text>
                    <Text color="brand-100" className="underline" size="md">
                      Узнать больше
                    </Text>
                  </div>
                </article>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </motion.div>
    </Section>
  );
};
