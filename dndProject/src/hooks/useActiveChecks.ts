import { useLocation } from 'react-router-dom';

export const useActiveChecks = () => {
  const { pathname } = useLocation();

  const mainRoots = ['/favorites', '/news', '/newbies', '/edit'];
  const otherRoots = ['/universe', '/character', '/resources'];

  const stripParams = (p: string) => p.replace(/\/:\w+/g, '');

  const isRootPath = (fullPath: string): boolean => {
    const base = stripParams(fullPath);

    if (fullPath === '/') {
      if (pathname === '/') {
        return true;
      }

      return mainRoots.some((root) => pathname.startsWith(root));
    }

    if (otherRoots.includes(fullPath)) {
      return pathname.includes(base);
    }

    return false;
  };

  const isSubPath = (fullPath: string) => {
    if (fullPath === '/') {
      return fullPath === pathname;
    }
    return pathname.includes(stripParams(fullPath));
  };

  return { isRootPath, isSubPath };
};
