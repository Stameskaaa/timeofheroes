import { ReactNode } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

interface SmartLinkProps {
  to: string | number;
  children: ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
}

export const SmartLink = ({ to, children, onClick, className }: SmartLinkProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();

    if (typeof to === 'number') {
      navigate(to);
    } else if (location.pathname !== to) {
      navigate(to);
    }

    if (onClick) onClick(e);
  };

  const href = typeof to === 'string' ? to : undefined;

  return (
    <Link to={href ?? ''} onClick={handleClick} className={className}>
      {children}
    </Link>
  );
};
