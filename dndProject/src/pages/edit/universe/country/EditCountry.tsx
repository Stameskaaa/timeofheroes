import { useForm } from 'react-hook-form';
import {
  useCreateCountryMutation,
  useDeleteCountrysMutation,
  useGetCountriesQuery,
  useUpdateCountrysMutation,
} from '@/features/country/api';
import { Country } from '@/features/country/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';
import { useGetNPCListQuery } from '@/features/npc/api';
import { useGetLocationListQuery } from '@/features/locations/api';

const EditCountry = () => {
  const methods = useForm<Country>({
    defaultValues: {
      src: '',
      name: '',
      shortDescription: '',
      mdDescription: '',
      npcIds: [],
      locationIds: [],
      worldIds: [],
    },
  });
  const { control } = methods;
  const { data: worlds, isLoading: worldsLoading } = useGetSimpleWorldListQuery();
  const { data: npc, isLoading: npcLoading } = useGetNPCListQuery({ limit: 200 });
  const { data: locations, isLoading: locationsLoading } = useGetLocationListQuery({ limit: 200 });

  return (
    <EditList
      contentName="Страны"
      methods={methods}
      queryHook={useGetCountriesQuery}
      createHook={useCreateCountryMutation}
      updateHook={useUpdateCountrysMutation}
      removeHook={useDeleteCountrysMutation}
      mapData={(data: Country[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <Input
        required
        placeholder="Сенкриф"
        message="Название страны"
        name="name"
        control={control}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Долина Гурван-Гол"
          message="Выберите мир"
          required
          multiple
          label="Миры"
          control={control}
          name="worldIds"
          disabled={worldsLoading || worlds?.data.length === 0}
          options={worlds?.data.map(({ id, name }) => ({ id, value: name }))}
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

      <Selector
        className="w-full"
        message="Выберите Личностей"
        placeholder="Олег торговец"
        multiple
        label="Личности"
        control={control}
        name="npcIds"
        disabled={npcLoading || npc?.data.length === 0}
        options={npc?.data.map(({ id, name }) => ({ id, value: name }))}
      />

      <Selector
        className="w-full"
        placeholder="Долина лунных орхидей"
        message="Выберите локации"
        multiple
        label="Локации"
        control={control}
        name="locationIds"
        disabled={locationsLoading || locations?.data.length === 0}
        options={locations?.data.map(({ id, name }) => ({ id, value: name }))}
      />

      <Input
        required
        placeholder="Теократические государство во главе которого правит Великий Синод"
        message="Короткое описание (1-2 предложения)"
        name="shortDescription"
        control={control}
      />

      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
    </EditList>
  );
};

export default EditCountry;
