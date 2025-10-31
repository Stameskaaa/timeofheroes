import { useForm } from 'react-hook-form';
import {
  useCreateNPCMutation,
  useDeleteNPCMutation,
  useGetNPCListQuery,
  useUpdateNPCMutation,
} from '@/features/npc/api';
import { NPC } from '@/features/npc/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { useGetCountriesQuery } from '@/features/country/api';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditNPC = () => {
  const methods = useForm<NPC>({
    defaultValues: {
      name: '',
      src: '',
      status: '',
      fraction: '',
      shortDescription: '',
      mdDescription: '',
      mdHistory: '',
      mdFunFacts: '',
      worldIds: [],
      countryIds: [],
    },
  });
  const { control } = methods;
  const { data: worlds, isLoading: worldsLoading } = useGetSimpleWorldListQuery();
  const { data: countries, isLoading: countriesLoading } = useGetCountriesQuery({ limit: 200 });

  return (
    <EditList
      contentName="Личности"
      methods={methods}
      queryHook={useGetNPCListQuery}
      createHook={useCreateNPCMutation}
      updateHook={useUpdateNPCMutation}
      removeHook={useDeleteNPCMutation}
      mapData={(data: NPC[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <Input
        required
        placeholder="Галакхад Вишар"
        message="Имя личности"
        name="name"
        control={control}
      />
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
          disabled={worldsLoading || worlds?.data.length === 0}
          options={worlds?.data.map(({ id, name }) => ({ id, value: name }))}
        />
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Страна Сенкриф"
          message="Выберите страну"
          multiple
          label="Страны"
          control={control}
          name="countryIds"
          disabled={countriesLoading || countries?.data.length === 0}
          options={countries?.data.map(({ id, name }) => ({ id, value: name }))}
        />
      </div>
      <Input
        required
        className="flex-1"
        message="Прикрепите фотографию"
        placeholder="https://image.png"
        name="src"
        control={control}
      />

      <Input
        className="flex-1"
        message="Статус"
        placeholder="Главный юстициар"
        name="status"
        control={control}
      />
      <Input
        className="flex-1"
        message="Фракция"
        placeholder="Судебная дихтонгия"
        name="fraction"
        control={control}
      />
      <Input
        required
        placeholder="Глава судебной власти, дипломат"
        message="Короткое описание (1-2 предложения)"
        name="shortDescription"
        control={control}
      />

      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
      <TextareaMD hasMd required control={control} message="История" name="mdHistory" />
      <TextareaMD hasMd required control={control} message="Фан факты" name="mdFunFacts" />
    </EditList>
  );
};

export default EditNPC;
