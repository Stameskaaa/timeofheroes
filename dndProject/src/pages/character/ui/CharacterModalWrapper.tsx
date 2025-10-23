import { toast } from 'sonner';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
import { useState, type ReactNode } from 'react';
import { Copy, Expand, Minimize, X } from 'lucide-react';
import { FavoriteTypes } from '@/features/favorite/favoriteSlice';
import { useWindowWidth } from '@/hooks/useWindowWidth';
import { copyToClipboard } from '@/helpers/clipboardHelpers';
import { Button } from '@/components/ui/button';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';
import { AddFavorite } from '@/components/wrappers/buttons/addFavorite/AddFavorite';

export const CharacterModalWrapper = ({
  open,
  type,
  children,
  currentId,
  closeAction,
}: {
  open: boolean;
  children: ReactNode;
  type: FavoriteTypes;
  closeAction: () => void;
  currentId?: number | null;
}) => {
  const location = useLocation();
  const width = useWindowWidth();
  const [expanded, setExpanded] = useState(false);

  return (
    <ModalWindow
      topButtons={
        <>
          {typeof currentId === 'number' && <AddFavorite type={type} id={currentId} />}
          {width > 950 && (
            <Button variant="ghost" onClick={() => setExpanded(!expanded)} size="icon">
              {expanded ? <Minimize /> : <Expand />}
            </Button>
          )}
          <Button
            variant="ghost"
            onClick={async () => {
              if (!currentId) {
                toast.error('При копировании произошла ошибка');
                return;
              }

              const result = await copyToClipboard(
                `${window.location.origin}${location.pathname}/${currentId}`,
              );
              if (result) {
                toast.success('Ссылка успешно скопирована');
              } else {
                toast.error('При копировании произошла ошибка');
              }
            }}
            size="icon">
            <Copy />
          </Button>
        </>
      }
      contentStyle={{ transition: 'max-width 0.3s' }}
      contentClassname={classNames(
        'w-[calc(100%-40px)] h-[min(70vh,1000px)] max-h-[900px]',
        expanded ? '!max-w-[1400px] ' : '!max-w-[700px]',
      )}
      open={open}
      setOpen={closeAction}>
      <div className="h-[full] w-full px-1 flex-1 bg flex flex-col overflow-y-auto">{children}</div>
    </ModalWindow>
  );
};
