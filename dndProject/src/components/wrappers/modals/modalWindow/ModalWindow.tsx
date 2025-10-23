import { X } from 'lucide-react';
import classNames from 'classnames';
import { useState, type FC, type ReactNode, type CSSProperties, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';

interface ModalDialogProps {
  buttonTrigger?: ReactNode;
  zIndex?: number;
  contentClassname?: string;
  children?: ReactNode;
  open?: boolean;
  setOpen?: (state: boolean) => void;
  contentStyle?: CSSProperties;
  topButtons?: ReactNode;
}

export const ModalWindow: FC<ModalDialogProps> = ({
  buttonTrigger,
  children,
  contentClassname,
  zIndex,
  open: externalOpen,
  setOpen: externalSetOpen,
  contentStyle,
  topButtons,
}) => {
  const [internalOpen, setInternalOpen] = useState<boolean>(false);

  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  useEffect(() => {
    if (!open) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [open, setOpen]);

  return (
    <Dialog>
      {buttonTrigger && (
        <DialogTrigger onClick={() => setOpen(true)} asChild>
          {buttonTrigger}
        </DialogTrigger>
      )}
      <DialogContent
        zIndex={zIndex}
        open={open}
        setOpen={setOpen}
        style={contentStyle}
        className={classNames(
          'bg-brand-400 border-[1px] border-brand-200 flex flex-col gap-0 h-[60%] w-[400px] !max-w-none',
          contentClassname,
        )}>
        <div className="flex mt-[-4px] md:mt-[-12px] md:ml-[10px] max-h-[32px] gap-2 h-8 flex-1 justify-end">
          {topButtons}{' '}
          <Button size="icon" onClick={() => setOpen(false)} variant="ghost">
            <X />
          </Button>
        </div>
        {children}
      </DialogContent>
    </Dialog>
  );
};
