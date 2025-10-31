import { LucidePlus, X } from 'lucide-react';
import { useFieldArray, useForm } from 'react-hook-form';
import {
  useCreateClassMutation,
  useDeleteClassMutation,
  useGetClassListQuery,
  useUpdateClassMutation,
} from '@/features/classes/api';
import { Class } from '@/features/classes/types';
import { useGetSimpleWorldListQuery } from '@/features/worlds/api';
import { useGetCharacteristicListQuery } from '@/features/characteristic/api';
import { EditList } from '../../ui/EditItem';
import { armors, diceHits } from '@/mock/mock';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditClass = () => {
  const methods = useForm<Class>({
    defaultValues: {
      src: '',
      name: '',
      diceHit: '',
      skills: '',
      weaponSkills: '',
      toolSkills: '',
      armorId: [],
      startEquipment: [],
      spellIds: [],
      worldIds: [],
      mdDescription: '',
      mdTableData: '',
      subclassSkills: [],
      savingThrowsIds: [],
      characteristicIds: [],
    },
  });
  const { control } = methods;
  const { data: worlds, isLoading: worldsLoading } = useGetSimpleWorldListQuery();
  const { data: characteristics, isLoading: characteristicsLoading } =
    useGetCharacteristicListQuery();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'subclassSkills',
  });

  return (
    <EditList
      contentName="Классы"
      methods={methods}
      queryHook={useGetClassListQuery}
      createHook={useCreateClassMutation}
      updateHook={useUpdateClassMutation}
      removeHook={useDeleteClassMutation}
      mapData={(data: Class[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name }) => ({
          id,
          title: name,
        }));
      }}>
      <Input required message="Название класса" placeholder="Воин" name="name" control={control} />

      <div className="flex gap-2 items-start">
        <Selector
          className="flex-1"
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
          className="flex-1"
          message="Прикрепите фотографию"
          placeholder="https://image.png"
          name="src"
          control={control}
        />
      </div>
      <Selector
        className="flex-1"
        placeholder="к10"
        message="Кость хитов"
        required
        label="Варианты костей хитов"
        control={control}
        name="diceHit"
        options={diceHits}
      />
      <div className="flex gap-2 items-start">
        <Selector
          message="Выберите основные характеристики класса"
          required
          placeholder="Сила, ловкость"
          label="Характеристики"
          control={control}
          multiple
          name={'characteristicIds'}
          disabled={characteristicsLoading || characteristics?.data.length === 0}
          options={characteristics?.data.map(({ id, name }) => ({ id, value: name }))}
        />
        <Selector
          message="Выберите какими спасбросками владеет"
          required
          placeholder="Интеллекст, харизма"
          label="Характеристики"
          control={control}
          multiple
          name={'savingThrowsIds'}
          disabled={characteristicsLoading || characteristics?.data.length === 0}
          options={characteristics?.data.map(({ id, name }) => ({ id, value: name }))}
        />
      </div>
      <Input
        required
        message="Укажи выбор навыков"
        placeholder="Выберите из следующего списка: Атлетика, акробатика"
        name="skills"
        control={control}
      />
      <div className="flex gap-2 items-start">
        <Selector
          message="Выберите типы доспехов"
          placeholder="Тяжелые"
          label="Доспехи"
          control={control}
          multiple
          name={'armorId'}
          options={armors.map(({ id, name }) => ({ id, value: name }))}
        />
        <Input
          required
          message="Опишите каким оружием владеет"
          placeholder="Простое оружие, воинское оружие, клинки тиссаж"
          name="weaponSkills"
          control={control}
        />
      </div>

      <Input
        className="flex-1"
        placeholder="Инструменты стеклодува, воровские инструменты"
        message="Владение инструментами"
        name="toolSkills"
        control={control}
      />

      <div className="flex gap-2">
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          message="Снаряжение - А"
          placeholder="Кольчуга, кинжал"
          name="startEquipment.0"
          control={control}
        />
        <Input
          className="w-auto flex-1 min-w-[260px]"
          required
          message="Снаряжение - Б"
          placeholder="Проклепанный кожанный доспех, рапира"
          name="startEquipment.1"
          control={control}
        />
      </div>
      <TextareaMD required message="Таблица персонажа" control={control} name="mdTableData" />
      <TextareaMD
        required
        message="Полное описание умений класса"
        name="mdDescription"
        control={control}
      />

      <div className="flex flex-col border border-brand-200 rounded-sm p-4 gap-3">
        <Text className="mb-4">Подклассы</Text>
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col items-center gap-2">
            <div className="flex gap-2 flex-1 w-full">
              <Input
                required
                control={control}
                name={`subclassSkills.${index}.title`}
                placeholder="Название подкласса"
              />
              <Button variant="destructive" type="button" onClick={() => remove(index)}>
                <X />
              </Button>
            </div>
            <TextareaMD
              required
              control={control}
              name={`subclassSkills.${index}.mdDescription`}
              placeholder="Укажите все умения при выборе подкласса"
            />
            <Separator spacing="equalLarge" />
          </div>
        ))}

        <Button
          variant="secondary"
          type="button"
          onClick={() => append({ title: '', mdDescription: '' })}>
          <LucidePlus /> Добавить умение
        </Button>
      </div>
    </EditList>
  );
};

export default EditClass;
