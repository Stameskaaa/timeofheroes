import classNames from 'classnames';
import { useState, type ReactNode } from 'react';
import {
  AccordionRoot,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion';

interface AccordionItemData {
  id: string;
  title: ReactNode;
  content: ReactNode;
}

interface AccordionProps {
  data: AccordionItemData[];
  triggerClass?: string;
  contentClass?: string;
  containerClass?: string;
  defaultValue?: string;
  open?: string;
  setOpen?: (id: string | undefined) => void;
}

export const Accordion = ({
  data,
  open: externalOpen,
  setOpen: externalSetOpen,
  triggerClass,
  contentClass,
  containerClass,
  defaultValue,
}: AccordionProps) => {
  const [internalOpen, setInternalOpen] = useState<string | undefined>(undefined);

  const open = externalOpen ?? internalOpen;
  const setOpen = externalSetOpen ?? setInternalOpen;

  return (
    <AccordionRoot
      type="single"
      collapsible
      className="w-full"
      value={open}
      defaultValue={defaultValue}
      onValueChange={(val) => setOpen(val)}>
      {data.map(({ title, content, id }) => (
        <AccordionItem key={id} value={id} className={containerClass}>
          <AccordionTrigger
            className={classNames(
              'hover:bg-brand-400 px-3 cursor-pointer flex justify-between items-center',
              triggerClass,
            )}>
            {title}
          </AccordionTrigger>
          <AccordionContent
            className={classNames(
              'flex flex-col gap-4 text-balance text-text-secondary px-3',
              contentClass,
            )}>
            {content}
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionRoot>
  );
};
