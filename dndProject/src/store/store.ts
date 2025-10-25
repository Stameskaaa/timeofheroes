import { configureStore } from '@reduxjs/toolkit';
import { npcApi } from '@/features/npc/api';
import { godApi } from '@/features/gods/api';
import auth from '@/features/auth/authSlice';
import { authApi } from '@/features/auth/api';
import { newsApi } from '@/features/news/api';
import { racesApi } from '@/features/races/api';
import { worldApi } from '@/features/worlds/api';
import { traitsApi } from '@/features/traits/api';
import { spellsApi } from '@/features/spells/api';
import { rulesApi } from './../features/rules/api';
import worlds from '@/features/worlds/worldsSlice';
import profile from '@/features/profile/profileSlice';
import { profileApi } from '@/features/profile/api';
import { countryApi } from '@/features/country/api';
import { classesApi } from '@/features/classes/api';
import classes from '@/features/classes/classesSlice';
import { originsApi } from './../features/origin/api';
import { locationApi } from '@/features/locations/api';
import favorites from '@/features/favorite/favoriteSlice';
import scrollLockReducer from '@/features/scroll/scrollSlice';
import { characteristicApi } from '@/features/characteristic/api';
import { hostileCreaturesApi } from '@/features/hostileCreatures/api';
import characteristic from '@/features/characteristic/characteristicSlice';
import pageTransitionReducer from '@/features/pageTransition/pageTransitionSlice';

export const store = configureStore({
  reducer: {
    [racesApi.reducerPath]: racesApi.reducer,
    [classesApi.reducerPath]: classesApi.reducer,
    [spellsApi.reducerPath]: spellsApi.reducer,
    [originsApi.reducerPath]: originsApi.reducer,
    [traitsApi.reducerPath]: traitsApi.reducer,
    [rulesApi.reducerPath]: rulesApi.reducer,
    [newsApi.reducerPath]: newsApi.reducer,
    [characteristicApi.reducerPath]: characteristicApi.reducer,
    [godApi.reducerPath]: godApi.reducer,
    [worldApi.reducerPath]: worldApi.reducer,
    [countryApi.reducerPath]: countryApi.reducer,
    [npcApi.reducerPath]: npcApi.reducer,
    [locationApi.reducerPath]: locationApi.reducer,
    [hostileCreaturesApi.reducerPath]: hostileCreaturesApi.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [profileApi.reducerPath]: profileApi.reducer,
    auth,
    worlds,
    profile,
    classes,
    favorites,
    characteristic,
    scrollLock: scrollLockReducer,
    pageTransition: pageTransitionReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(racesApi.middleware)
      .concat(classesApi.middleware)
      .concat(spellsApi.middleware)
      .concat(originsApi.middleware)
      .concat(traitsApi.middleware)
      .concat(rulesApi.middleware)
      .concat(newsApi.middleware)
      .concat(characteristicApi.middleware)
      .concat(godApi.middleware)
      .concat(worldApi.middleware)
      .concat(countryApi.middleware)
      .concat(npcApi.middleware)
      .concat(locationApi.middleware)
      .concat(hostileCreaturesApi.middleware)
      .concat(authApi.middleware)
      .concat(profileApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
