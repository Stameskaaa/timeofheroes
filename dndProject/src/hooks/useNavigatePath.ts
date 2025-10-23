import { useLocation, useNavigate, To } from 'react-router-dom';

type NavigationState = any;

export const useNavigatePath = () => {
  const location = useLocation();
  const navigate = useNavigate();

  function navigatePath(path: string, state?: NavigationState): void;
  function navigatePath(path: number, state?: NavigationState): void;
  function navigatePath(path: string | number, state?: NavigationState) {
    if (typeof path === 'string' && path === location.pathname) return;

    navigate(path as To, { state });
  }

  return { navigatePath };
};
