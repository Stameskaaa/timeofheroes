import { CardNavigation } from './components/CardNavigation';
import { FAQ } from './components/FAQ';
import { MainCarousel } from './components/MainCarousel';
import { CatalogSection } from './components/CatalogSection';
import { MotionText, Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MainButton } from '../../components/wrappers/buttons/mainButton/MainButton';

export const MainPage = () => {
  return (
    <>
      <Section screen={true} className="flex justify-center flex-col items-center">
        <MainButton />
      </Section>
      <Section paddingX="empty" screen>
        <div className="h-[70vh] flex bg-brand-400/70">
          <div className="m-auto text-center flex flex-col gap-4">
            <MotionText
              className="!text-lg lg:!text-2xl"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.4 }}>
              НАШИ ПРИНЦИПЫ
            </MotionText>

            <MotionText
              className="!text-4xl lg:!text-6xl"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true, amount: 0.4 }}>
              МЫ ИГРАЕМ <br /> ВДОЛГУЮ
            </MotionText>

            <MotionText
              size="lg"
              className="max-w-[700px]"
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true, amount: 0.4 }}>
              Прекрасно, когда любовь к играм не угасает. Мы не забываем о своих игроках спустя пару
              недель, а поддерживаем их годами и десятилетиями.
            </MotionText>
          </div>
        </div>
        <MainCarousel />
        <CardNavigation />
        <CatalogSection />
        <FAQ />
      </Section>
    </>
  );
};
