import { useForm } from 'react-hook-form';
import {
  useCreateLocationMutation,
  useDeleteLocationMutation,
  useGetLocationListQuery,
  useUpdateLocationMutation,
} from '@/features/locations/api';
import { Location } from '@/features/locations/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { useGetCountriesQuery } from '@/features/country/api';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';
import { useGetHostileCreaturesListQuery } from '@/features/hostileCreatures/api';

const EditLocation = () => {
  const methods = useForm<Location>({
    defaultValues: {
      src: '',
      name: '',
      shortDescription: '',
      mdDescription: '',
      worldIds: [],
      countryIds: [],
      hostileCreatureIds: [],
    },
  });
  const { control } = methods;
  const { data: worlds, isLoading: worldsLoading } = useGetSimpleWorldListQuery();
  const { data: countries, isLoading: countriesLoading } = useGetCountriesQuery({ limit: 200 });
  const { data: hostile, isLoading: hostileLoading } = useGetHostileCreaturesListQuery({
    limit: 200,
  });

  return (
    <EditList
      contentName="Локации"
      methods={methods}
      queryHook={useGetLocationListQuery}
      createHook={useCreateLocationMutation}
      updateHook={useUpdateLocationMutation}
      removeHook={useDeleteLocationMutation}
      mapData={(data: Location[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <Input
        required
        placeholder="Деревня лунных орхидей"
        message="Название локации"
        name="name"
        control={control}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Долина Гурван-Гол"
          message="Выберите мир"
          required
          label="Миры"
          multiple
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
        placeholder="Страна Сенкриф"
        message="Выберите страну"
        multiple
        label="Страны"
        control={control}
        name="countryIds"
        disabled={countriesLoading || countries?.data.length === 0}
        options={countries?.data.map(({ id, name }) => ({ id, value: name }))}
      />

      <Selector
        className="w-full"
        placeholder="Монстр 1, монстр 2"
        message="Выберите список существ"
        multiple
        label="Существа"
        control={control}
        name="hostileCreatureIds"
        disabled={hostileLoading || hostile?.data.length === 0}
        options={hostile?.data.map(({ id, name }) => ({ id, value: name }))}
      />

      <Input
        required
        placeholder="Дивный уголок теократии Сенкриф"
        message="Короткое описание (1-2 предложения)"
        name="shortDescription"
        control={control}
      />

      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
    </EditList>
  );
};

export default EditLocation;
