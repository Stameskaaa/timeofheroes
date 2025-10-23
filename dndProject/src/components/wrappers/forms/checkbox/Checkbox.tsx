import classNames from 'classnames';
import styled from './Checkbox.module.css';

type CheckboxProps = React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox: React.FC<CheckboxProps> = ({ ...props }) => {
  return (
    <div className={styled.container}>
      <label className={styled.container}>
        <input {...props} type="checkbox" />
        <svg viewBox="0 0 64 64" height="16px" width="16px">
          <path
            d="M 0 16 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 16 L 32 48 L 64 16 V 8 A 8 8 90 0 0 56 0 H 8 A 8 8 90 0 0 0 8 V 56 A 8 8 90 0 0 8 64 H 56 A 8 8 90 0 0 64 56 V 16"
            pathLength="575.0541381835938"
            className={classNames(styled.path, 'stroke-brand-100')}
          />
        </svg>
      </label>
    </div>
  );
};
