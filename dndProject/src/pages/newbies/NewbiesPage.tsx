import React from 'react';
import { ArrowDown } from 'lucide-react';
import { NewbieCard } from './ui/NewbieCard';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Section } from '@/components/wrappers/sections/section/Section';

export const cardHeight = 410;

const dataLeft = [
  {
    title: 'Выберите мир',
    description:
      'Посетите страницы доступных миров и решите, в каком из сеттингов, созданных нашими мастерами, вам будет интереснее играть. Обратите внимание, что эти миры являются частью одной вселенной и иногда могут даже сталкиваться друг с другом, но возможности, предоставляемые игрокам в каждом из них, остаются по-своему уникальными и продуманными.',
    links: [{ text: 'Миры', url: '/universe/worlds' }],
  },
  {
    title: 'Отправляйтесь на своё первое приключение',
    description:
      'Напишите в наше сообщество во ВКонтакте, чтобы узнать дату ближайшей игры для новичков, или закажите игру для себя и своих друзей. Клуб старается проводить стартовую игру «Выход из Тумана» по выходным дням раз в две недели. Если у вас возникли вопросы, напишите в сообщество — вам подскажут и помогут сориентироваться.',
    links: [{ text: 'Записаться на игру', url: 'https://vk.com/timeofheroesdnd?from=groups' }],
  },
  {
    title: 'Последний шаг — приобретите абонемент!',
    description:
      'В нашем клубе работает система абонементов, где каждая регулярная игра стоит одну квоту. С актуальными ценами вы можете ознакомиться в нашем сообществе во ВКонтакте, где также можно приобрести абонемент. Правила списания квот описаны в разделе с правилами клуба.',
    links: [{ text: 'Купить абонемент', url: 'https://vk.com/timeofheroesdnd?from=groups' }],
  },
];

const dataRight = [
  {
    title: 'Оцените свои возможности',
    description:
      'Посмотрите, какие предложения и форматы игры предоставляет наш клуб, и найдите то, что подойдет именно вам. D&D — это игра, которая открывает возможности для любого формата приключений, и клуб старается предложить максимум: как для компании друзей, которая желает приятно провести время, так и для тех, кто хочет найти единомышленников, разделяющих это хобби.',
    links: [{ text: 'Перейти к услугам', url: 'https://vk.com/market-202247698?screen=group' }],
  },
  {
    title: 'Узнайте игровые возможности',
    description:
      'Ознакомьтесь с основными составляющими любого персонажа и выберите близкие вам по духу. Познакомьтесь с уникальными особенностями и ключевыми характеристиками героя: класс, вид(раса), происхождение. Это — первые шаги в создании персонажа, и именно они определяют, какими возможностями он будет обладать. Обратите внимание, что некоторые из них являются уникальными для конкретного мира, о котором рассказывается ниже.',
    links: [
      { text: 'Классы', url: '/character/classes' },
      { text: 'Виды', url: '/character/races' },
      { text: 'Происхождения', url: '/character/origins' },
    ],
  },
  {
    title: 'Оцените впечатления от первой игры',
    description:
      ' После первого приключения у вас есть возможность внести изменения в своего персонажа до достижения 3-го уровня. Если вы почувствовали, что для полного погружения вашему герою чего-то не хватает, — изучите доступные опции или обратитесь за советом к нашим мастерам. Мы поможем вам понять, каким вы хотите видеть своего героя, и воплотить эту идею в игре.',
    links: [{ text: 'Дополнить персонажа', url: 'https://vk.com/timeofheroesdnd?from=groups' }],
  },
];

export const NewbiesPage = () => {
  const gap = cardHeight;
  const cardsCount = dataRight.length;
  const fullCards = [...dataLeft, ...dataRight];

  return (
    <Section paddingY="large" className="flex flex-col" fixedWidth screen>
      <Text color="brand-100" className="text-2xl! md:text-[50px] mx-auto mb-10">
        Новым игрокам
      </Text>

      <Text className="w-full text-center mx-auto max-w-[965px]">
        Этот раздел описывает ключевые шаги для плавного погружения в ваше путешествие по миру D&D
        вместе с нами. Помните: главное в этой игре — свобода и возможности, открытые перед
        игроками. Поэтому вы всегда можете перейти к четвёртому шагу и моментально отправиться на
        первое приключение!
      </Text>
      <Separator
        edgeEffect="gradient"
        edgeColor="brand-500"
        className="mb-10 mx-auto max-w-[965px]"
      />
      <div
        style={{ paddingTop: cardHeight / 2 }}
        className="gap-18 mx-auto hidden lg:flex justify-center">
        <div style={{ marginTop: gap, gap }} className={`flex flex-col`}>
          {dataLeft.map(({ title, description, links }, i) => (
            <NewbieCard title={title} description={description} links={links} key={i} />
          ))}
        </div>
        <div
          style={{
            marginTop: `${-(cardHeight / 2)}px`,
            height: `${cardsCount * 2 * cardHeight}px`,
          }}
          className="w-px relative h-full bg-brand-200">
          {Array.from({ length: cardsCount * 2 + 1 }).map((_, i) => (
            <div
              key={i}
              style={{
                top: i * cardHeight,
                left: '50%',
                transform: 'translate(-50%, -50%)',
              }}
              className="w-9 flex justify-center items-center h-9 rounded-full border border-brand-200 bg-brand-400 absolute">
              <Text color="brand-100" as="span" size="md">
                {i === 0 ? <ArrowDown size={18} /> : `0${i}`}
              </Text>
            </div>
          ))}
        </div>

        <div style={{ gap }} className="flex flex-col">
          {dataRight.map(({ title, description, links }, i) => (
            <NewbieCard title={title} links={links} description={description} key={i} />
          ))}
        </div>
      </div>

      <div className="flex flex-col lg:hidden gap-2 items-center">
        {fullCards.map(({ title, description, links }, i) => (
          <React.Fragment key={i}>
            <NewbieCard title={title} description={description} links={links} />
            {i !== fullCards.length - 1 && <div className="w-px relative bg-brand-200 h-[100px]" />}
          </React.Fragment>
        ))}
      </div>
    </Section>
  );
};
