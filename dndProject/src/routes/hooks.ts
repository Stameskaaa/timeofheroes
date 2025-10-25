import { useAppSelector } from '@/hooks/reduxHooks';
import { RouteNode } from './routes';

export function useGetNavigationPaths() {
  const token = useAppSelector((state) => state.auth.accessToken);
  const profile = useAppSelector((state) => state.profile);
  const haveRights = (profile?.role === 'editor' || profile?.role === 'admin') && token;

  function getChildrenById(routes: RouteNode[], id: string): { title: string; fullPath: string }[] {
    for (const route of routes) {
      if (route.id === id) {
        return (route.children || [])
          .filter(
            (child) =>
              !child.navigationIgnore &&
              (token ? true : !child.unAuthIgnore) &&
              (!child.withRules || haveRights),
          )
          .map((child) => ({
            title: child.title || '',
            fullPath: child.fullPath || '',
          }));
      }
      if (route.children) {
        const found = getChildrenById(route.children, id);
        if (found.length) return found;
      }
    }
    return [];
  }

  function getTopNavigationRoutes(routes: RouteNode[]): RouteNode[] {
    if (!routes?.length) return [];

    const topRoutes = routes[0]?.children ?? [];

    function filterRoutes(nodes: RouteNode[]): RouteNode[] {
      return nodes
        .filter(
          (node) =>
            !node.navigationIgnore &&
            (token ? true : !node.unAuthIgnore) &&
            (!node.withRules || haveRights),
        )
        .map((node) => ({
          ...node,
          children: node.children ? filterRoutes(node.children) : undefined,
        }));
    }

    return filterRoutes(topRoutes);
  }

  return { getTopNavigationRoutes, getChildrenById };
}
