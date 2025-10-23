import type { ReactNode } from 'react';
import { motion, type Variants } from 'framer-motion';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';
import { Accordion } from '@/components/wrappers/navigation/accordion/Accordion';

interface FAQData {
  title: string;
  children: ReactNode;
}

const FAQData = [
  {
    id: 1,
    title: 'Что нужно знать перед игрой?',
    content: [
      {
        id: '1',
        title: 'Что нужно принести с собой на игру?',
        content:
          'Главное – хорошее настроение! Мы предоставляем базовые принадлежности: кубики (дайсы), книги правил, карты, миниатюры. Вы можете принести свои любимые дайсы, блокнот для записей и карандаш. Перекус и напитки – по желанию.',
      },
      {
        id: '2',
        title: 'Как присоединиться к Регулярным играм или Ваншоту?',
        content:
          'Проще простого! Следите за нашим расписанием в [Укажите место: группа VK/Telegram/сайт/доска в клубе]. Там публикуются анонсы всех сессий с указанием времени, Мастера и свободных мест. Запись обычно открывается за несколько дней. Увидели свободный слот – пишите нам или Мастеру!',
      },
      {
        id: '3',
        title: 'Сколько стоят игры?',
        content:
          'У нас есть множества разнообразных форматов для наших клиентов подробнее о всех предложениях вы можете ознакомиться в разделе -Мероприятия- и написать в нашу группу в ВК если вас заинтересовало одно из предложений',
      },
      {
        id: '4',
        title: 'Нужно ли знать все правила наизусть?',
        content:
          'Нет! Главное – желание играть и взаимодействовать. Мастер знает правила и поможет в любой ситуации. Вы быстро освоите основы в процессе игры. Мы ценим историю и ролевую игру больше, чем зубрежку правил.',
      },
    ],
  },
  {
    id: 2,
    title: 'О том как проходят игры',
    content: [
      {
        id: '5',
        title: 'Как часто проходят игры?',
        content:
          'Регулярные игры: Каждые выходные (суббота/воскресенье) по фиксированному расписанию. Ваншоты: Проводятся в будни вечером и по выходным, смотрите анонсы.',
      },
      {
        id: '6',
        title: 'Городские/Выездные кампании',
        content:
          'Расписание согласуется и публикуется во вкладке -предстоящие события-Ивенты: Крупные события проходят несколько раз в год, анонсируются заранее.Аренда: Доступна ежедневно по предварительной брони.',
      },
      {
        id: '7',
        title: 'Есть ли возрастные ограничения?',
        content:
          'Рекомендуемый возраст – 12+. Мы создаем атмосферную игру, которая может включать сложные сюжеты и боевые сцены. Игроки младше 12 могут быть допущены по согласованию родителей.',
      },
      {
        id: '8',
        title: 'Можно ли прийти просто посмотреть?',
        content:
          'Да, как зритель! Если есть свободное место и Мастер/игроки не против, вы можете понаблюдать за игрой. Пожалуйста, предварительно уточните возможность у администратора или Мастера.',
      },
    ],
  },
];

export function FAQ() {
  const variants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2 },
    }),
  };

  return (
    <Section
      screen
      className="flex my-20 flex-col items-center justify-center mx-auto"
      paddingX="empty">
      <Section className="bg-brand-500 border-t-2 border-b-2 border-brand-200 flex flex-col gap-4 py-16 items-center">
        <Text className="mb-14" size="3xl">
          Часто задаваемые вопросы
        </Text>
        <Section
          fixedWidth
          className="flex flex-col min-h-[500px] max-w-[1600px] xl:flex-row gap-8 w-full p-5">
          {FAQData.map(({ title, content }, i) => (
            <motion.div
              initial="hidden"
              variants={variants}
              whileInView="visible"
              viewport={{ amount: 0.3, once: true }}
              custom={i}
              className="flex-1"
              key={i}>
              <Text as="h1" color="brand-100" size="2xl" className="text-center py-4">
                {title}
              </Text>
              <Accordion
                containerClass="border-brand-200"
                contentClass="py-4 text-lg"
                triggerClass="text-text-description text-xl data-[state=open]:bg-brand-300/50"
                data={content}
              />
            </motion.div>
          ))}
        </Section>
      </Section>
    </Section>
  );
}
