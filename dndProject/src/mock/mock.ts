import type { SpellSchool } from '@/features/spells/types';
import { AbjurationIcon } from '@/assets/icons/schools/AbjurationIcon';
import { ConjurationIcon } from '@/assets/icons/schools/ConjurationIcon';
import { DivinationIcon } from '@/assets/icons/schools/DivinationIcon';
import { EnchantmentIcon } from '@/assets/icons/schools/EnchantmentIcon';
import { EvocationIcon } from '@/assets/icons/schools/EvocationIcon';
import { IllusionIcon } from '@/assets/icons/schools/IllusionIcon';
import { NecromancyIcon } from '@/assets/icons/schools/NecromancyIcon';
import { TransmutationIcon } from '@/assets/icons/schools/TransmutationIcon';

export const characteristic = [
  {
    id: 'str',
    name: 'Сила',
    description:
      'Определяет физическую мощь, способность поднимать тяжести, наносить удары и совершать силовые проверки.',
  },
  {
    id: 'dex',
    name: 'Ловкость',
    description:
      'Отвечает за скорость, координацию и реакцию. Влияет на броню, инициативу и проверки акробатики.',
  },
  {
    id: 'con',
    name: 'Телосложение',
    description:
      'Характеризует выносливость и здоровье. Определяет очки здоровья и устойчивость к ядам и болезням.',
  },
  {
    id: 'int',
    name: 'Интеллект',
    description:
      'Способность к логике, памяти и анализу. Влияет на знания, расследование и использование некоторых заклинаний.',
  },
  {
    id: 'wis',
    name: 'Мудрость',
    description:
      'Отражает восприятие и интуицию. Важна для внимательности, выживания и магии жрецов и друидов.',
  },
  {
    id: 'cha',
    name: 'Харизма',
    description:
      'Личное обаяние, сила воли и влияние на других. Используется в убеждении, запугивании и магии бардов и колдунов.',
  },
];

export const armors = [
  {
    id: 'heavy',
    name: 'Тяжелые доспехи',
  },
  {
    id: 'light',
    name: 'Легкие доспехи',
  },
  {
    id: 'middle',
    name: 'Средние доспехи',
  },
  {
    id: 'without',
    name: 'Защита без доспехов',
  },
];

export const schoolList: SpellSchool[] = [
  {
    id: 1,
    title: 'Воплощение',
    color: 'linear-gradient(to right, #4dd0e1 0%, #26c6da 100%)',
    icon: EvocationIcon,
  },
  {
    id: 2,
    title: 'Иллюзия',
    color: 'linear-gradient(to right, #7e57c2 0%, #9575cd 100%)',
    icon: IllusionIcon,
  },
  {
    id: 3,
    title: 'Некромантия',
    color: 'linear-gradient(to right, #e57373 0%, #ef9a9a 100%)',
    icon: NecromancyIcon,
  },
  {
    id: 4,
    title: 'Ограждение',
    color: 'linear-gradient(to right, #4fc3f7 0%, #29b6f6 100%)',
    icon: AbjurationIcon,
  },
  {
    id: 5,
    title: 'Вызов',
    color: 'linear-gradient(to right, #ba68c8 0%, #ab47bc 100%)',
    icon: ConjurationIcon,
  },
  {
    id: 6,
    title: 'Прорицание',
    color: 'linear-gradient(to right, #fff176 0%, #ffee58 100%)',
    icon: DivinationIcon,
  },
  {
    id: 7,
    title: 'Очарование',
    color: 'linear-gradient(to right, #f06292 0%, #f48fb1 100%)',
    icon: EnchantmentIcon,
  },
  {
    id: 8,
    title: 'Преобразование',
    color: 'linear-gradient(to right, #81c784 0%, #66bb6a 100%)',
    icon: TransmutationIcon,
  },
];

export const creatureSizes = [
  { id: '1', value: 'Громадный' },
  { id: '2', value: 'Огромный' },
  { id: '3', value: 'Большой' },
  { id: '4', value: 'Средний' },
  { id: '5', value: 'Маленький' },
  { id: '6', value: 'крошечный' },
];

export const creatureTypes = [
  { id: '1', value: 'Аберрация' },
  { id: '2', value: 'Великан' },
  { id: '3', value: 'Гуманоид' },
  { id: '4', value: 'Дракон' },
  { id: '5', value: 'Зверь' },
  { id: '6', value: 'Исчадие' },
  { id: '7', value: 'Конструкт' },
  { id: '8', value: 'Чудовище' },
  { id: '9', value: 'Небожитель' },
  { id: '10', value: 'Нежить' },
  { id: '11', value: 'Растение' },
  { id: '12', value: 'Слизь' },
  { id: '13', value: 'Фея' },
  { id: '14', value: 'Элементаль' },
];

export const diceHits = [
  { id: '1', value: 'к6' },
  { id: '2', value: 'к8' },
  { id: '3', value: 'к10' },
  { id: '4', value: 'к12' },
];

export const damageStates = [
  { id: 1, value: 'Колющий не магический' },
  { id: 2, value: 'Рубящий не магический' },
  { id: 3, value: 'Дробящий не магический' },
  { id: 4, value: 'Колющий магический' },
  { id: 5, value: 'Рубящий магический' },
  { id: 6, value: 'Дробящий магический' },
  { id: 7, value: 'Излучение' },
  { id: 8, value: 'Некротическая энергия' },
  { id: 9, value: 'Кислота' },
  { id: 10, value: 'Звук' },
  { id: 11, value: 'Холод' },
  { id: 12, value: 'Огонь' },
  { id: 13, value: 'Электричество' },
  { id: 14, value: 'Психическая энергия' },
  { id: 15, value: 'Силовое поле' },
  { id: 16, value: 'Яд' },
];
export const conditionStates = [
  { id: 1, value: 'Бессознательный' },
  { id: 2, value: 'Испуганный' },
  { id: 3, value: 'Истощение' },
  { id: 4, value: 'Невидимый' },
  { id: 5, value: 'Недееспособный' },
  { id: 6, value: 'Оглохший' },
  { id: 7, value: 'Окаменевший' },
  { id: 8, value: 'Лежащий ничком' },
  { id: 9, value: 'Опутанный' },
  { id: 10, value: 'Ослеплённый' },
  { id: 11, value: 'Отравленный' },
  { id: 12, value: 'Очарованный' },
  { id: 13, value: 'Ошеломлённый' },
  { id: 14, value: 'Схваченный' },
  { id: 15, value: 'Парализованный' },
];
