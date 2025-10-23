import { useState } from 'react';
import classNames from 'classnames';
import { Expand, Minimize } from 'lucide-react';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { RuleCardProps } from './RuleCard';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';

interface RuleModalProps {
  close: () => void;
  openedCard?: Omit<RuleCardProps, 'onClick'> | null;
}

export const RuleModal: React.FC<RuleModalProps> = ({ openedCard, close }) => {
  const width = useWindowWidth();
  const [expanded, setExpanded] = useState(false);

  return (
    <ModalWindow
      setOpen={close}
      open={!!openedCard?.title}
      contentStyle={{ transition: 'max-width 0.3s' }}
      topButtons={
        width > 950 && (
          <Button variant="ghost" onClick={() => setExpanded(!expanded)} size="icon">
            {expanded ? <Minimize /> : <Expand />}
          </Button>
        )
      }
      contentClassname={classNames(
        'w-[calc(100%-40px)] h-[70%] max-h-[800px]',
        expanded ? '!max-w-[1400px] ' : '!max-w-[700px]',
      )}>
      <div className="flex flex-col h-full overflow-y-auto">
        <Text size="xl" className="mx-auto" as="span">
          {openedCard?.title}
        </Text>
        <Separator edgeEffect="gradient" edgeColor="brand-400" spacing="equalSmall" />
        <MarkDownText>{openedCard?.mdContent}</MarkDownText>
      </div>
    </ModalWindow>
  );
};
