import React from 'react';

type CheckboxIconProps = {
  checked?: boolean;
};

export const CheckboxIcon: React.FC<CheckboxIconProps> = ({ checked }) => {
  return (
    <svg viewBox="0 0 64 64" height={18} width={18}>
      <path
        d={checked ? 'M16 32 L28 44 L48 16' : 'M16 16 L48 48 M48 16 L16 48'}
        fill="none"
        className="stroke-brand-100"
        strokeWidth={6}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
