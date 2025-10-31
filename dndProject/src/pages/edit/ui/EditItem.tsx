import { useState, type ReactNode } from 'react';
import { LucideCheckCheck, LucideX, Pencil, X } from 'lucide-react';
import type { FieldValues } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Spinner } from '@/components/wrappers/loaders/spinner/Spinner';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';
import { useEditableForm, type UseEditableItemProps } from '../hooks/useEditableItem';
import { Pagination } from '@/components/wrappers/navigation/pagination/Pagination';

interface EditableItem {
  id: number;
  title?: string;
  description?: string;
}

interface EditListProps<T extends { id?: number | null } & FieldValues>
  extends UseEditableItemProps<T> {
  children: ReactNode;
  mapData: (data: T[] | undefined) => EditableItem[];
  contentName: string;
}

export const EditList = <T extends { id?: number | null }>({
  children,
  queryHook,
  createHook,
  updateHook,
  removeHook,
  mapData,
  methods,
  contentName,
  getTransformedData,
}: EditListProps<T>) => {
  const [showDeletedId, setShowDeletedId] = useState<number | null>(null);

  const {
    open,
    setOpen,
    actions,
    submitAction,
    pagintaionData,
    loadDeletedId,
    inputControl,
    editLoading,
    data,
    isLoading,
    isFetching,
  } = useEditableForm<T>({
    queryHook,
    createHook,
    updateHook,
    removeHook,
    getTransformedData,
    methods,
  });

  const editableData = mapData(data?.data);

  const fetching = isFetching && !isLoading;

  return (
    <div className="flex flex-col relative bg-brand-3 border rounded-md border-brand-300 bg-brand-500 flex-1 h-full p-4 gap-3 min-h-0">
      <div className="flex flex-col flex-1 h-full gap-3">
        <div className="flex gap-2 h-9">
          <Input
            placeholder="Поиск по названию..."
            className="flex-4"
            control={inputControl}
            name="inputValue"
          />
          <Button variant="secondary" className="min-w-40" onClick={() => setOpen(true)}>
            Создать
          </Button>
        </div>

        <div className="flex-1 min-h-0 h-full overflow-y-auto flex justify-center overscroll-contain">
          {isLoading ? (
            <Spinner className="m-auto" />
          ) : !Array.isArray(editableData) ? (
            <Text className="m-auto">Произошла ошибка</Text>
          ) : editableData.length === 0 ? (
            <Text className="m-auto">Данных нет</Text>
          ) : (
            <div className="flex flex-col w-full gap-3">
              {editableData.map((item) => (
                <EditItem
                  setShowDeletedId={setShowDeletedId}
                  isLoading={item.id === loadDeletedId}
                  key={item.id}
                  actions={actions}
                  {...item}
                />
              ))}
            </div>
          )}
        </div>

        {fetching && (
          <div className="absolute top-0 left-0">
            <Spinner className="text-brand-100!" />
          </div>
        )}
        <div className="mt-auto">
          {data?.meta && (
            <Pagination
              onPageChange={pagintaionData.onPageChange}
              className="mt-auto"
              total={data?.meta.total}
              limit={pagintaionData.limit}
              currentPage={pagintaionData.currentPage}
            />
          )}
        </div>
      </div>
      <ModalWindow
        contentClassname="w-[95%] h-[95%] !bg-brand-500 flex-1 flex flex-col bg-brand-400 border-1 rounded-md border-brand-300 max-h-[900px] block !max-w-[1600px]"
        setOpen={setOpen}
        open={open}>
        <div className="flex justify-between gap-4 items-center pb-2">
          <Text size="2xl" weight="bold" color="brand-100">
            {contentName}
            <Text as="span" size="lg" color="brand-100" className="ml-2">
              - Изменение / Создание
            </Text>
          </Text>
        </div>
        <Separator spacing="empty" />
        <div className="flex-1 overflow-y-auto p-2 flex flex-col gap-4 h-[calc(100%-110px)] pr-8 wide-scroll">
          {children}
        </div>
        <div className="flex gap-2 pt-2 justify-end">
          <Button isLoading={editLoading} onClick={submitAction} variant="success">
            Сохранить
          </Button>
        </div>
      </ModalWindow>
      <ModalWindow
        contentClassname="!w-full !max-w-[300px] h-[150px] !bg-brand-500 flex-1 flex flex-col bg-brand-400 border-1 rounded-md border-brand-300 block"
        setOpen={() => setShowDeletedId(null)}
        open={!!showDeletedId}>
        <div className="flex flex-col gap-4">
          <Text>Точно хотите удалить?</Text>
          <div className="flex gap-4 justify-between">
            <Button
              className="flex-1"
              variant="destructive"
              isLoading={isLoading}
              onClick={() => {
                showDeletedId && actions('delete', showDeletedId);
                setShowDeletedId(null);
              }}>
              Точно
              <LucideX />
            </Button>
            <Button variant="success" onClick={() => setShowDeletedId(null)}>
              Уже передумал
              <LucideCheckCheck />
            </Button>
          </div>
        </div>
      </ModalWindow>
    </div>
  );
};

type ActionsType = (type: 'edit' | 'delete', id: number) => void;

export const EditItem = ({
  isLoading,
  title,
  description,
  actions,
  id,
  setShowDeletedId,
}: EditableItem & {
  actions: ActionsType;
  isLoading: boolean;
  setShowDeletedId: (data: number) => void;
}) => {
  return (
    <div className="flex justify-between gap-2 border items-start border-brand-200 p-3 rounded-md">
      <div>
        <Text size="xl">
          Название:{` `}
          {title}
        </Text>
        <Text>
          {' '}
          Описание:{` `}
          {description}
        </Text>
      </div>
      <div className="flex gap-2">
        <Button disabled={isLoading} onClick={() => actions('edit', id)}>
          <Pencil />
        </Button>
        <Button isLoading={isLoading} onClick={() => setShowDeletedId(id)}>
          <X />
        </Button>
      </div>
    </div>
  );
};
