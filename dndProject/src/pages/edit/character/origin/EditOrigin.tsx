import { useForm } from 'react-hook-form';
import {
  useCreateOriginMutation,
  useDeleteOriginMutation,
  useGetOriginListQuery,
  useUpdateOriginMutation,
} from '@/features/origin/api';
import type { Origin } from '@/features/origin/types';
import { useGetTraitListQuery } from '@/features/traits/api';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { useGetCharacteristicListQuery } from '@/features/characteristic/api';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditOrigin = () => {
  const methods = useForm<Origin>({
    defaultValues: {
      id: 0,
      name: '',
      src: '',
      skills: '',
      toolSkills: '',
      startEquipment: ['', ''],
      mdDescription: '',
      featureIds: [],
      characteristicIds: [],
      worldIds: [],
    },
  });
  const { control } = methods;
  const { data: traits, isLoading: traitsLoading } = useGetTraitListQuery();
  const { data: worlds, isLoading: worldsLoading } = useGetSimpleWorldListQuery();
  const { data: characteristic, isLoading: characteristicsLoading } =
    useGetCharacteristicListQuery();

  return (
    <EditList
      contentName="Происхождения"
      methods={methods}
      queryHook={useGetOriginListQuery}
      createHook={useCreateOriginMutation}
      updateHook={useUpdateOriginMutation}
      removeHook={useDeleteOriginMutation}
      mapData={(data: Origin[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name }) => ({
          id,
          title: name,
        }));
      }}>
      <Input
        className="w-auto flex-1 min-w-[260px]"
        required
        placeholder="Актер"
        message="Название происхождения"
        name="name"
        control={control}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="flex-1 min-w-[260px]"
          required
          message="Ссылка на фото"
          placeholder="https://example.com/image.png"
          name="src"
          control={control}
        />
        <Selector
          className="flex-1 min-w-[260px]"
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
      </div>
      <Selector
        placeholder="Ловкость"
        message="Выберите характеристики"
        required
        label="Характеристики"
        control={control}
        multiple
        name="characteristicIds"
        disabled={characteristicsLoading || worlds?.data.length === 0}
        options={characteristic?.data.map(({ id, name }) => ({ id, value: name }))}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="flex-1 min-w-[260px]"
          required
          placeholder="Акробатика, выступления"
          message="Впишите навыки, которыми владеет"
          name="skills"
          control={control}
        />
        <Input
          className="flex-1 min-w-[260px]"
          placeholder="Инструменты стеклодува, воровские инструменты"
          message="Владение инструментами"
          name="toolSkills"
          control={control}
        />
      </div>
      <Selector
        placeholder="Бдительный"
        required
        multiple
        message="Выберите черту"
        label="Черты"
        control={control}
        name="featureIds"
        disabled={traitsLoading || worlds?.data.length === 0}
        options={traits?.data.map(({ id, name }) => ({ id, value: name }))}
      />
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="flex-1 min-w-[260px]"
          required
          message="Снаряжение - А"
          placeholder="Кольчуга, кинжал"
          name="startEquipment.0"
          control={control}
        />
        <Input
          className="flex-1 min-w-[260px]"
          required
          message="Снаряжение - Б"
          placeholder="Проклепанный кожанный доспех, рапира"
          name="startEquipment.1"
          control={control}
        />
      </div>
      <TextareaMD
        hasMd
        required
        control={control}
        message="Корни происхождения, история и любые примечания"
        name="mdDescription"
      />
    </EditList>
  );
};

export default EditOrigin;
