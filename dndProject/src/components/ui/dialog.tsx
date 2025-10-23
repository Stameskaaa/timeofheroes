import { cn } from '@/lib/utils';
import { useId, type ComponentProps } from 'react';
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { AnimatePresence, motion, type HTMLMotionProps } from 'framer-motion';
import { useScrollLock } from '@/features/scroll/hooks';
import { ModalIndex } from '@/constants/zIndex';
import { Blanket } from '../wrappers/background/blanket/Blanket';

export type DialogRootProps = ComponentProps<typeof DialogPrimitive.Root>;

function Dialog(props: DialogRootProps) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}
function DialogTrigger({ ...props }: ComponentProps<typeof DialogPrimitive.Trigger>) {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />;
}

function DialogPortal({ ...props }: ComponentProps<typeof DialogPrimitive.Portal>) {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />;
}

function DialogClose({ ...props }: ComponentProps<typeof DialogPrimitive.Close>) {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />;
}

type MotionDivProps = HTMLMotionProps<'div'> & {
  open: boolean;
  setOpen: (state: boolean) => void;
  zIndex?: number;
};

function DialogContent({ className, children, open, zIndex, ...props }: MotionDivProps) {
  const id = useId();
  useScrollLock(id, open);
  const { setOpen } = props;

  return (
    <AnimatePresence mode="wait">
      {open && (
        <DialogPortal forceMount key="modal" data-slot="dialog-portal">
          <Blanket
            duration={0.2}
            onClick={() => setOpen(false)}
            key="blanket"
            style={{ zIndex: zIndex ? zIndex - 1 : ModalIndex - 1 }}
          />
          <motion.div
            {...props}
            initial={{ scale: 0.95, filter: 'blur(12px)', opacity: 0 }}
            animate={{ scale: 1, filter: 'blur(0px)', opacity: 1 }}
            exit={{ scale: 0.95, filter: 'blur(12px)', opacity: 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            style={{ ...props.style, zIndex: zIndex ? zIndex : ModalIndex }}
            data-slot="dialog-content"
            className={cn(
              'bg-background fixed top-[50%] left-[50%] grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-2 shadow-lg lg:p-6 sm:max-w-lg',
              className,
            )}>
            {children}
          </motion.div>
        </DialogPortal>
      )}
    </AnimatePresence>
  );
}

function DialogHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  );
}

function DialogFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogPrimitive.Title>) {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={cn('text-lg leading-none font-semibold', className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};
