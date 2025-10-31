import { useForm } from 'react-hook-form';
import {
  useCreateRaceMutation,
  useDeleteRaceMutation,
  useGetRaceListQuery,
  useUpdateRaceMutation,
} from '@/features/races/api';
import type { Race } from '@/features/races/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { EditList } from '../../ui/EditItem';
import { creatureSizes, creatureTypes } from '@/mock/mock';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditRace = () => {
  const methods = useForm<Race>({
    defaultValues: {
      name: '',
      mdDescription: '',
      mdHistory: '',
      src: '',
      worldIds: [],
      features: {
        type: '3',
        size: '4',
        speed: '',
        mdContent: '',
      },
    },
  });
  const { control } = methods;
  const { data: worlds, isLoading: worldLoading } = useGetSimpleWorldListQuery();

  return (
    <EditList<Race>
      contentName="Виды/Расы"
      methods={methods}
      queryHook={useGetRaceListQuery}
      createHook={useCreateRaceMutation}
      updateHook={useUpdateRaceMutation}
      removeHook={useDeleteRaceMutation}
      mapData={(data: Race[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name }) => ({ id, title: name }));
      }}>
      <Input
        required
        placeholder="Эльф"
        message="Название типа вида(расы)"
        name="name"
        control={control}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          message="Ссылка на фото"
          placeholder="https://example.com/image.png"
          name="src"
          control={control}
        />
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Долина Гурван-Гол"
          message="Выберите мир"
          required
          label="Миры"
          multiple
          control={control}
          name="worldIds"
          disabled={worldLoading || worlds?.data.length === 0}
          options={worlds?.data.map(({ id, name }) => ({ id, value: name }))}
        />
      </div>

      <TextareaMD hasMd required control={control} message="История" name="mdHistory" />
      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
      <div className="flex flex-col gap-2 p-3 border border-brand-200 rounded-md">
        <Text size="lg" className="border-b border-brand-200 pb-1">
          Особенности
        </Text>
        <div className="flex gap-2 flex-wrap items-end">
          <Selector
            className="w-auto flex-1 min-w-[260px]"
            required
            message="Тип существа"
            label="Типы"
            placeholder="Гуманоид"
            name="features.type"
            control={control}
            options={creatureTypes}
          />
          <Selector
            className="w-auto flex-1 min-w-[260px]"
            required
            message="Размер"
            label="Размеры"
            placeholder="Средний"
            name="features.size"
            control={control}
            options={creatureSizes}
          />
          <Input
            className="w-auto flex-2 min-w-[260px]"
            required
            message="Скорость"
            placeholder="30 футов, лазая 20 футов"
            name="features.speed"
            control={control}
          />
        </div>

        <TextareaMD
          hasMd
          required
          control={control}
          placeholder="Чувство вибрации, с учетом подвидов"
          message="Осбенные умения"
          name="features.mdContent"
        />
      </div>
    </EditList>
  );
};

export default EditRace;
