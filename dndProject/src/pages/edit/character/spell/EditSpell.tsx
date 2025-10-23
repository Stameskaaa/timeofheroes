import { useForm } from 'react-hook-form';
import {
  useCreateSpellMutation,
  useDeleteSpellMutation,
  useGetSpellsListQuery,
  useUpdateSpellMutation,
} from '@/features/spells/api';
import type { Spell } from '@/features/spells/types';
import { useGetClassListQuery } from '@/features/classes/api';
import { schoolList } from '@/mock/mock';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditSpell = () => {
  const methods = useForm<Spell>({
    defaultValues: {
      id: 0,
      name: '',
      level: undefined,
      schoolId: undefined,
      castingTime: '',
      duration: '',
      distance: '',
      shortDescription: '',
      mdDescription: '',
      componentsList: '',
      characterClassIds: [],
    },
  });
  const { control } = methods;
  const { data: classes, isLoading: classesLoading } = useGetClassListQuery();

  return (
    <EditList<Spell>
      contentName="Заклинания"
      methods={methods}
      queryHook={useGetSpellsListQuery}
      createHook={useCreateSpellMutation}
      updateHook={useUpdateSpellMutation}
      removeHook={useDeleteSpellMutation}
      mapData={(data: Spell[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <Input
        required
        placeholder="Огненный шар"
        message="Название заклинания"
        name="name"
        control={control}
      />

      <div className="flex gap-2 flex-wrap items-end">
        <Selector
          className="w-auto flex-2 min-w-[260px]"
          placeholder="Волшебник, жрец, следопыт"
          message="Выберите классы"
          required
          multiple
          label="Классы"
          control={control}
          name="characterClassIds"
          disabled={classesLoading || classes?.data.length === 0}
          options={classes?.data.map(({ id, name }) => ({ id, value: name }))}
        />
        <Selector
          className="w-auto flex-2 min-w-[260px]"
          placeholder="1"
          message="Выберите уровень"
          required
          label="Уровни"
          control={control}
          name="level"
          options={Array.from({ length: 10 }).map((_, i) => ({
            id: i,
            value: `${i === 0 ? 'Заговор' : i}`,
          }))}
        />
        <Selector
          className="w-auto flex-2 min-w-[260px]"
          placeholder="Воплощение"
          message="Выберите школу"
          required
          label="Школы"
          control={control}
          name="schoolId"
          options={schoolList.map(({ id, title }) => ({ id, value: title }))}
        />
      </div>

      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          placeholder="Действие"
          message="Время каста"
          name="castingTime"
          control={control}
        />
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          placeholder="Мгновенное"
          message="Длительность"
          name="duration"
          control={control}
        />
      </div>

      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          placeholder="120 футов"
          message="Дистанция"
          name="distance"
          control={control}
        />
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          placeholder="В,C,М (Перо василиска)"
          message="Список компонентов"
          name="componentsList"
          control={control}
        />
      </div>

      <Input
        required
        placeholder="Вы создаете маленький шарик огня и метаете его на выбранную точку. При попадании он взрывается сферой радиусом 5 футов."
        message="Короткое описание(на превью карточки, 1-2 предложения)"
        name="shortDescription"
        control={control}
      />

      <TextareaMD hasMd required control={control} message="Описание" name="mdDescription" />
    </EditList>
  );
};

export default EditSpell;
