import { useForm } from 'react-hook-form';
import {
  useCreateWorldMutation,
  useDeleteWorldMutation,
  useGetWorldListQuery,
  useUpdateWorldMutation,
} from '@/features/worlds/api';
import type { World } from '@/features/worlds/types';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditWorld = () => {
  const methods = useForm<World>({
    defaultValues: {
      src: '',
      name: '',
      shortDescription: '',
      mdDescription: '',
      mdHistory: '',

      countryIds: [],
      locationIds: [],
      npcIds: [],
      godIds: [],
      raceIds: [],
      characterClassIds: [],
      originIds: [],
      featureIds: [],
    },
  });
  const { control } = methods;

  return (
    <EditList
      contentName="Миры"
      methods={methods}
      queryHook={useGetWorldListQuery}
      createHook={useCreateWorldMutation}
      updateHook={useUpdateWorldMutation}
      removeHook={useDeleteWorldMutation}
      mapData={(data: World[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          placeholder="Гурван Гол"
          message="Название мира"
          name="name"
          control={control}
        />
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          message="Прикрепите фотографию"
          placeholder="https://image.png"
          name="src"
          control={control}
        />
      </div>

      <Input
        required
        placeholder="Глава судебной власти, дипломат"
        message="Короткое описание (1-2 предложения)"
        name="shortDescription"
        control={control}
      />
      <TextareaMD hasMd required control={control} message="История" name="mdHistory" />
      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
    </EditList>
  );
};

export default EditWorld;
