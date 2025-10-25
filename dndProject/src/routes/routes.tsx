import { MainPage } from '../pages/main/MainPage';
import { createBrowserRouter, Outlet, type RouteObject } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { delayLoader } from './helpers';
import { SHOW_TRANSITION } from '@/features/pageTransition/constants';
import { lazy, Suspense, type ReactNode } from 'react';
import { ClassesPage } from '@/pages/character/classes/ClassesPage';
import { RacesPage } from '@/pages/character/races/RacesPage';
import { OriginPage } from '@/pages/character/origin/OriginPage';
import { TraitsPage } from '@/pages/character/traits/TraitsPage';
import { SpellsPage } from '@/pages/character/spells/SpellsPage';
import { WorldsPage } from '@/pages/universe/worlds/WorldsPage';
import { ClubRulesPage } from '@/pages/rules/clubRules/ClubRulesPage';
import { HomeRulesPage } from '@/pages/rules/homeRules/HomeRules';
import { DnDRules } from '@/pages/rules/dndRules/DnDRules';
import { CharacterPage } from '@/pages/character/CharacterPage';
import { ClassContent } from '@/pages/character/classes/ClassContent';
import { LocationsPage } from '@/pages/universe/locations/LocationsPage';
import { LocationPage } from '@/pages/universe/locations/locationPage/LocationPage';
import { CreaturePage } from '@/pages/universe/creatures/CreaturePage';
import { RaidBossListPage } from '@/pages/universe/creatures/RaidBossListPage';
import { BeastListPage } from '@/pages/universe/creatures/BeastListPage';
import { NPCListPage } from '@/pages/universe/creatures/NPCListPage';
import { WorldPage } from '@/pages/universe/worlds/WorldPage/WorldPage';
import ErrorBoundary from '@/components/wrappers/errorBoundary/ErrorBoundary';
import { NewbiesPage } from '@/pages/newbies/NewbiesPage';
import { NewsPage } from '@/pages/news/NewsPage';
import { NewsItem } from '@/pages/news/NewsItem';
import { OriginContent } from '@/pages/character/origin/components/OriginContent';
import { TraitsContent } from '@/pages/character/traits/components/TraitsContent';
import { SpellContent } from '@/pages/character/spells/components/spellContent/SpellContent';
import { FallbackLoader } from '@/components/wrappers/loaders/fallbackLoader/FallbackLoader';
import {
  Book,
  BookOpen,
  Crown,
  Database,
  Edit,
  Eye,
  Globe,
  Home,
  LucideIcon,
  MapPin,
  Newspaper,
  Package,
  ShieldOff,
  Sparkle,
  Star,
  StarIcon,
  User,
  UserPlus,
  Users,
  WandSparkles,
} from 'lucide-react';
import { NotFound } from '@/pages/notFound/NotFound';
import { AuthWrapper } from './AuthWrapper';
import { RaceContent } from '@/pages/character/races/components/RaceContent';
import { PrivateWrapper } from './PrivateWrapper';
import { FavoritesPage } from '@/pages/favorites/FavoritesPage';

const EditPage = lazy(() => import('@/pages/edit/EditPage'));
const EditRules = lazy(() => import('@/pages/edit/general/rule/EditRules'));
const EditNews = lazy(() => import('@/pages/edit/general/news/EditNews'));
const EditOrigin = lazy(() => import('@/pages/edit/character/origin/EditOrigin'));
const EditTrait = lazy(() => import('@/pages/edit/character/trait/EditTrait'));
const EditRace = lazy(() => import('@/pages/edit/character/race/EditRace'));
const EditSpell = lazy(() => import('@/pages/edit/character/spell/EditSpell'));
const EditClass = lazy(() => import('@/pages/edit/character/class/EditClass'));
const EditLocation = lazy(() => import('@/pages/edit/universe/location/EditLocation'));
const EditCountry = lazy(() => import('@/pages/edit/universe/country/EditCountry'));
const EditGods = lazy(() => import('@/pages/edit/universe/gods/EditGods'));
const EditNPC = lazy(() => import('@/pages/edit/universe/npc/EditNPC'));
const EditCharacteristic = lazy(() => import('@/pages/edit/other/EditCharacteristic'));
const EditWorld = lazy(() => import('@/pages/edit/universe/world/EditWorld'));
const EditHostileCreatures = lazy(
  () => import('@/pages/edit/universe/hostileCreatures/EditHostileCreatures'),
);

const RegistrationPage = lazy(() => import('@/pages/auth/registration/RegistrationPage'));
const LoginPage = lazy(() => import('@/pages/auth/login/LoginPage'));
const ProfilePage = lazy(() => import('@/pages/profile/ProfilePage'));

export const routesWrapper = (routes: RouteNode[]): RouteObject[] => {
  return routes.map((node) => {
    const children = node.children ? routesWrapper(node.children) : undefined;

    return {
      path: node.path,
      element: node.element,
      errorElement: node.errorElement,
      loader: node.loader ? delayLoader(SHOW_TRANSITION * 1000) : undefined,
      children,
    };
  });
};

export type RouteNode = {
  id?: string;
  title?: string;
  description?: string;
  path?: string;
  fullPath: string;
  element?: ReactNode;
  errorElement?: ReactNode;
  icon?: LucideIcon;
  children?: RouteNode[];
  loader?: boolean;
  src?: string;
  ignoreInActive?: boolean;
  withRules?: boolean;
  unAuthIgnore?: boolean;
  navigationIgnore?: boolean;
};

const LAYOUT: RouteNode = {
  title: 'Главная',
  path: '',
  fullPath: '',
  element: <Layout key="layout" />,
  errorElement: <ErrorBoundary />,
};

export const ROUTES: RouteNode[] = [
  {
    ...LAYOUT,
    children: [
      {
        title: 'Главная',
        path: '',
        fullPath: '/',
        element: <Outlet />,
        loader: true,
        src: 'https://sun9-44.userapi.com/s/v1/ig2/Cmd1CC138WveJUjSujFu0BOd3M8Y6U4BL8X5DoW4PLKEe0cirjt7Y3clUV05VdrHyVeXcl9rYay5FF7YIKbFumLz.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,960x960&from=bu&cs=960x0',
        children: [
          {
            title: 'Главная',
            description: 'Познакомьтесь с нашим клубом',
            path: '/',
            fullPath: '/',
            element: <MainPage key="mainpage" />,
            icon: Home,
          },
          {
            title: 'Новости',
            icon: Newspaper,
            description: 'Последние события клуба',
            path: 'news',
            fullPath: '/news',
            element: <NewsPage />,
          },
          {
            path: 'news/:id',
            fullPath: '/news/:id',
            element: <NewsItem />,
            navigationIgnore: true,
          },
          {
            title: 'Новым игрокам',
            path: 'newbies',
            fullPath: '/newbies',
            description: 'Как отправиться в первое приключение',
            element: <NewbiesPage />,
            icon: UserPlus,
          },
          {
            title: 'Избранное',
            description: 'Ваши заметки для игры',
            path: 'favorites',
            fullPath: '/favorites',
            element: <FavoritesPage />,
            icon: StarIcon,
          },

          {
            title: 'Управление данными',
            description: 'Редактура и добавление контента',
            path: 'edit',
            fullPath: '/edit',
            withRules: true,
            unAuthIgnore: true,
            element: (
              <Suspense fallback={<FallbackLoader />}>
                <PrivateWrapper>
                  <EditPage />
                </PrivateWrapper>
              </Suspense>
            ),
            icon: Database,
            children: [
              {
                title: 'Правила',
                path: 'rules',
                fullPath: '/edit/rules',
                element: <EditRules />,
              },
              {
                title: 'Новости',
                path: 'edit-news',
                fullPath: '/edit/edit-news',
                element: <EditNews />,
              },
              {
                title: 'Классы',
                path: 'class',
                fullPath: '/edit/class',
                element: <EditClass />,
              },
              {
                title: 'Происхождения',
                path: 'origin',
                fullPath: '/edit/origin',
                element: <EditOrigin />,
              },
              {
                title: 'Черты',
                path: 'trait',
                fullPath: '/edit/trait',
                element: <EditTrait />,
              },
              {
                title: 'Расы',
                path: 'race',
                fullPath: '/edit/race',
                element: <EditRace />,
              },
              {
                title: 'Заклинания',
                path: 'spell',
                fullPath: '/edit/spell',
                element: <EditSpell />,
              },
              {
                title: 'Локации',
                path: 'location',
                fullPath: '/edit/location',
                element: <EditLocation />,
              },
              {
                title: 'Страны',
                path: 'country',
                fullPath: '/edit/country',
                element: <EditCountry />,
              },
              {
                title: 'Миры',
                path: 'world',
                fullPath: '/edit/world',
                element: <EditWorld />,
              },
              {
                title: 'Боги',
                path: 'god',
                fullPath: '/edit/god',
                element: <EditGods />,
              },
              {
                title: 'Личности',
                path: 'npc',
                fullPath: '/edit/npc',
                element: <EditNPC />,
              },
              {
                title: 'Враждебные существа',
                path: 'hostile-creatures',
                fullPath: '/edit/hostile-creatures',
                element: <EditHostileCreatures />,
              },
              {
                title: 'Характеристики',
                path: 'stats',
                fullPath: '/edit/stats',
                element: <EditCharacteristic />,
              },
            ],
          },
          {
            title: 'Профиль',
            description: 'Данные аккаунта',
            path: 'profile',
            fullPath: 'profile',
            element: (
              <PrivateWrapper>
                <ProfilePage />
              </PrivateWrapper>
            ),
            unAuthIgnore: true,
          },
        ],
      },
      {
        title: 'Вселенная',
        path: 'universe',
        fullPath: '/universe',
        element: <Outlet />,
        loader: true,
        src: 'https://sun9-29.userapi.com/s/v1/ig2/W5VMwVk-5lnf0EG7H-4fMcV2VIWqF-G6Dctu1ADv24pTaWLnSg6UcFCITu-bZQpYcM0aWGbIOWTcbQoIeNxUslVH.jpg?quality=95&as=32x38,48x57,72x86,108x129,160x191,240x287,360x430,480x574,540x645,640x765,720x860,1080x1290,1170x1398&from=bu&cs=1170x0',
        children: [
          {
            title: 'Миры',
            description: 'Где начнётся ваша дорога приключений',
            path: 'worlds',
            fullPath: '/universe/worlds',
            element: <WorldsPage />,
            icon: Globe,
          },
          {
            path: 'worlds/:id',
            fullPath: '/universe/worlds/:id',
            element: <WorldPage />,
            navigationIgnore: true,
          },
          {
            title: 'Локации',
            description: 'Уголки мира которые стоит посетить',
            path: 'locations',
            fullPath: '/universe/locations',
            element: <LocationsPage />,
            icon: MapPin,
          },
          {
            path: 'locations/:id',
            fullPath: '/universe/locations/:id',
            element: <LocationPage />,
            navigationIgnore: true,
          },
          {
            title: 'Личности',
            description: 'Кто может встретиться в вашем пути',
            path: 'npc',
            fullPath: '/universe/npc',
            element: <NPCListPage />,
            icon: Users,
          },
          {
            path: 'npc/:id',
            fullPath: '/universe/npc/:id',
            element: <CreaturePage type="npc" />,
            navigationIgnore: true,
          },
          {
            title: 'Бестиарий',
            description: 'Враг, добыча или питомец выбор ваш',
            path: 'bestiary',
            fullPath: '/universe/bestiary',
            element: <BeastListPage />,
            icon: ShieldOff,
          },
          {
            path: 'bestiary/:id',
            fullPath: '/universe/bestiary/:id',
            element: <CreaturePage type="hostile" />,
            navigationIgnore: true,
          },
          {
            title: 'Рейдбоссы',
            description: 'Скованные - враги всего мира и его жертвы',
            path: 'raidbosses',
            fullPath: '/universe/raidbosses',
            element: <RaidBossListPage />,
            icon: Crown,
          },
          {
            path: 'raidbosses/:id',
            fullPath: '/universe/raidbosses/:id',
            element: <CreaturePage type="hostile" />,
            navigationIgnore: true,
          },
        ],
      },
      {
        title: 'Персонаж',
        path: 'character',
        id: 'character',
        fullPath: '/character',
        src: 'https://sun9-44.userapi.com/s/v1/ig2/Cmd1CC138WveJUjSujFu0BOd3M8Y6U4BL8X5DoW4PLKEe0cirjt7Y3clUV05VdrHyVeXcl9rYay5FF7YIKbFumLz.jpg?quality=95&as=32x32,48x48,72x72,108x108,160x160,240x240,360x360,480x480,540x540,640x640,720x720,960x960&from=bu&cs=960x0',
        element: <CharacterPage />,
        loader: true,
        children: [
          {
            title: 'Классы',
            description: 'Определите роль своего героя',
            path: 'classes',
            fullPath: '/character/classes',
            element: <ClassesPage />,
            icon: User,
            src: 'https://cdnb.artstation.com/p/assets/images/images/047/200/669/large/anato-finnstark-web-petit.jpg?1647002974',
          },
          {
            path: '/character/classes/:id',
            fullPath: '/character/classes/:id',
            element: <ClassContent />,
            navigationIgnore: true,
          },
          {
            title: 'Виды',
            description: 'Кем вы родились в этом мире',
            path: 'races',
            fullPath: '/character/races',
            icon: Eye,
            src: 'https://cdnb.artstation.com/p/assets/images/images/041/500/289/large/anato-finnstark-web-peit.jpg?1631867384',
            element: <RacesPage />,
          },
          {
            path: '/character/races/:id',
            fullPath: '/character/races/:id',
            navigationIgnore: true,
            element: <RaceContent />,
          },
          {
            title: 'Происхождения',
            description: 'Выберите чему вас научило прошлое',
            path: 'origins',
            fullPath: '/character/origins',
            element: <OriginPage />,
            icon: Package,
            src: 'https://cdna.artstation.com/p/assets/images/images/036/497/596/4k/pablo-del-molino-thegate02.jpg?1617824920',
          },
          {
            path: '/character/origins/:id',
            fullPath: '/character/origins/:id',
            element: <OriginContent />,
            navigationIgnore: true,
          },
          {
            title: 'Черты',
            description: 'Уникальные способности персонажей',
            path: 'traits',
            icon: Sparkle,
            fullPath: '/character/traits',
            src: 'https://cdnb.artstation.com/p/assets/images/images/044/018/107/large/anato-finnstark-anato-finnstark-web-petit.jpg?1638889244',
            element: <TraitsPage />,
          },
          {
            path: '/character/traits/:id',
            fullPath: '/character/traits/:id',
            element: <TraitsContent />,
            navigationIgnore: true,
          },
          {
            title: 'Заклинания',
            description: 'Какая магия может быть подвластна вам',
            path: 'spells',
            fullPath: '/character/spells',
            src: 'https://cdnb.artstation.com/p/assets/images/images/034/041/739/4k/anato-finnstark-web-petit.jpg?1611241472',
            element: <SpellsPage />,
            icon: WandSparkles,
          },
          {
            path: '/character/spells/:id',
            fullPath: '/character/spells/:id',
            element: <SpellContent />,
            navigationIgnore: true,
          },
        ],
      },
      {
        title: 'Все для игры',
        path: 'resources',
        fullPath: '/resources',
        element: <Outlet />,
        loader: true,
        src: 'https://sun9-70.userapi.com/s/v1/ig2/HWXLgbx1js068DVYzg-7aba0KgTDV_MUiQ33hBuCxtYQARbusnBqv2VII2f-VwV5gk_imTS4f8ZtZsoKQpx85gPC.jpg?quality=95&as=32x46,48x69,72x103,108x155,160x229,240x343,360x515,480x687,540x773,640x916,720x1030,1062x1520&from=bu&cs=1062x0',
        children: [
          {
            title: 'Правила клуба',
            description: 'Пользовательское соглашение и т.д.',
            path: 'rules',
            fullPath: '/resources/rules',
            element: <ClubRulesPage />,
            icon: Book,
            children: [{ path: ':id', fullPath: '/resources/rules/:id' }],
          },
          {
            title: 'Правила D&D',
            description: 'Глоссарий официальных правил',
            path: 'dnd-rules',
            fullPath: '/resources/dnd-rules',
            element: <DnDRules />,
            icon: BookOpen,
          },
          {
            title: 'Домашние правила',
            description: 'Клубные дополнения к правилам D&D',
            path: 'home-rules',
            fullPath: '/resources/home-rules',
            children: [{ path: ':id', fullPath: '/resources/home-rules/:id' }],
            element: <HomeRulesPage />,
            icon: Edit,
          },
        ],
      },
      {
        fullPath: '/registration',
        path: '/registration',
        navigationIgnore: true,
        element: (
          <AuthWrapper>
            <RegistrationPage />
          </AuthWrapper>
        ),
      },
      {
        fullPath: '/login',
        path: '/login',
        navigationIgnore: true,
        element: (
          <AuthWrapper>
            <LoginPage />
          </AuthWrapper>
        ),
      },
      {
        id: 'not-found',
        fullPath: '*',
        path: '*',
        navigationIgnore: true,
        element: <NotFound />,
      },
    ],
  },
];

export const router = createBrowserRouter(routesWrapper(ROUTES));
