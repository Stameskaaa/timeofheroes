import classNames from 'classnames';
import { useId, useState, type ReactNode } from 'react';
import { useScrollLock } from '@/features/scroll/hooks';
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from '@/components/ui/sheet';

interface SidePanel {
  buttonTrigger?: ReactNode;
  contentClassname?: string;
  children?: ReactNode;
  zIndex?: number;
}

export const SidePanel: React.FC<SidePanel> = ({
  buttonTrigger,
  contentClassname,
  children,
  zIndex,
}) => {
  const id = useId();
  const [open, setOpen] = useState(false);
  useScrollLock(id, open);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{buttonTrigger}</SheetTrigger>
      <SheetTitle className="sr-only">Боковая панель</SheetTitle>
      <SheetContent
        zIndex={zIndex}
        setOpen={setOpen}
        className={classNames(contentClassname, 'w-[1500px]')}>
        {children}
      </SheetContent>
    </Sheet>
  );
};
