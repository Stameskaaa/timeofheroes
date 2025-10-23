import type { ReactNode } from 'react';

interface CharacterIconProps {
  children: ReactNode;
  shadow?: boolean;
}

export const CharacterIcon = ({ children, shadow = true }: CharacterIconProps) => {
  return (
    <div
      className={`bg-brand-300 w-[40px] h-[40px] text-brand-100 rounded-xl p-2 grid place-items-center ${
        shadow ? 'shadow-md shadow-black' : ''
      }`}>
      {children}
    </div>
  );
};
