import { LucideCheckCheck } from 'lucide-react';
import { Toaster as Sonner, ToasterProps } from 'sonner';

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--color-brand-400)',
          '--normal-text': 'var(--color-text-primary)',
          '--normal-border': 'var(--color-brand-100)',
        } as React.CSSProperties
      }
      {...props}
    />
  );
};

export { Toaster };
