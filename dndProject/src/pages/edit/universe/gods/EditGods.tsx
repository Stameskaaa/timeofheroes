import { useForm } from 'react-hook-form';
import {
  useCreateGodMutation,
  useDeleteGodMutation,
  useGetGodListQuery,
  useUpdateGodMutation,
} from '@/features/gods/api';
import type { God } from '@/features/gods/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditGods = () => {
  const methods = useForm<God>({
    defaultValues: {
      name: '',
      src: '',
      mdContent: '',
      worldIds: [],
    },
  });
  const { control } = methods;
  const { data, isLoading } = useGetSimpleWorldListQuery();

  return (
    <EditList
      contentName="Боги"
      methods={methods}
      queryHook={useGetGodListQuery}
      createHook={useCreateGodMutation}
      updateHook={useUpdateGodMutation}
      removeHook={useDeleteGodMutation}
      mapData={(data: God[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name }) => ({
          id,
          title: name,
        }));
      }}>
      <Input required placeholder="Кайдор" message="Имя бога" name="name" control={control} />
      <div className="flex gap-2 flex-wrap items-end">
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Долина Гурван-Гол"
          message="Выберите миры"
          required
          multiple
          label="Миры"
          control={control}
          name="worldIds"
          disabled={isLoading || data?.data.length === 0}
          options={data?.data.map(({ id, name }) => ({ id, value: name }))}
        />
        <Input
          required
          className="w-auto flex-1 min-w-[260px]"
          message="Прикрепите фотографию"
          placeholder="https://image.png"
          name="src"
          control={control}
        />
      </div>

      <TextareaMD hasMd required control={control} message="Описание" name="mdContent" />
    </EditList>
  );
};

export default EditGods;
