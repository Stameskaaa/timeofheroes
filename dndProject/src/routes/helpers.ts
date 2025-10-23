import type { RouteNode } from './routes';

export const delayLoader =
  (ms: number = 300) =>
  async () => {
    await new Promise((resolve) => setTimeout(resolve, ms));
    return null;
  };

export type ActiveRouteInfo = {
  parent: RouteNode | null;
  current: RouteNode | null;
  nestedLevel: 2 | 3;
} | null;

export const findRouteById = (routes: RouteNode[], id: string): RouteNode | null => {
  for (const route of routes) {
    if (route.id === id) return route;
    if (route.children) {
      const found = findRouteById(route.children, id);
      if (found) return found;
    }
  }
  return null;
};
