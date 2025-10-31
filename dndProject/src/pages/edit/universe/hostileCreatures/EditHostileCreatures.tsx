import { useForm } from 'react-hook-form';
import {
  useCreateHostileCreaturesMutation,
  useDeleteHostileCreaturesMutation,
  useGetHostileCreaturesListQuery,
  useUpdateHostileCreaturesMutation,
} from '@/features/hostileCreatures/api';
import { useGetLocationListQuery } from '@/features/locations/api';
import { HostileCreatures } from '@/features/hostileCreatures/types';
import { conditionStates, creatureSizes, creatureTypes, damageStates } from '@/mock/mock';
import { EditList } from '../../ui/EditItem';
import { Text } from '@/components/wrappers/typography/Text';
import { Input } from '@/components/wrappers/forms/input/Input';
import { CharacteristicForm } from '../../ui/CharacteristicForm';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditHostileCreatures = () => {
  const methods = useForm<HostileCreatures>({
    defaultValues: {
      name: '',
      src: '',
      type: 'monster',
      shortDescription: '',
      mdDescription: '',
      mdFunFacts: '',
      mdHistory: '',
      mdStatblock: '',
      typeId: '',
      hp: '',
      status: '',
      characteristics: [],
      armorClass: '',
      speed: '',
      sizeId: '',
      skills: '',
      senses: '',
      language: '',
      challenge: '',
      savingThrows: '',
      proficiencyBonus: '',
      damageImmunities: [],
      damageResistance: [],
      conditionImmunities: [],
      conditionResistance: [],
      locationIds: [],
    },
  });
  const { control, getValues } = methods;
  const { data: locations, isLoading: locationLoading } = useGetLocationListQuery({ limit: 200 });

  function getTransformedData() {
    const { armorClass, proficiencyBonus, ...data } = getValues();

    return {
      armorClass: armorClass ? Number(armorClass || 0) : null,
      proficiencyBonus: proficiencyBonus ? Number(proficiencyBonus || 0) : null,
      ...data,
    } as HostileCreatures;
  }

  return (
    <EditList
      getTransformedData={getTransformedData}
      contentName="Враждебные существа"
      methods={methods}
      queryHook={useGetHostileCreaturesListQuery}
      createHook={useCreateHostileCreaturesMutation}
      updateHook={useUpdateHostileCreaturesMutation}
      removeHook={useDeleteHostileCreaturesMutation}
      mapData={(data: HostileCreatures[] | undefined) => {
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
          placeholder="Тиамат"
          message="Имя существа"
          name="name"
          control={control}
        />
        <Input
          required
          className="w-auto flex-1 min-w-[260px]"
          message="Прикрепите фотографию"
          placeholder="https://image.png"
          name="src"
          control={control}
        />
        <Selector
          className="w-auto flex-1 min-w-[260px]"
          placeholder="Долина лунных орхидей"
          message="Выберите локации"
          multiple
          label="Локации"
          control={control}
          name="locationIds"
          disabled={locationLoading || locations?.data.length === 0}
          options={locations?.data.map(({ id, name }) => ({ id, value: name }))}
        />
        <Selector
          message="Выберите тип существа"
          required
          placeholder="Монстр"
          label="Монстр"
          control={control}
          name={'type'}
          options={[
            { id: 'monster', value: 'Монстр' },
            { id: 'raidBoss', value: 'Рейдбосс' },
          ]}
        />
      </div>

      <div className="flex gap-2 flex-wrap">
        <div className="flex flex-col gap-2 min-w-[350px] flex-3 justify-start border border-brand-200 p-3 rounded-md">
          <Text color="brand-100" size="lg">
            Общие описания
          </Text>
          <Selector
            required
            message="Тип существа"
            label="Типы"
            placeholder="Гуманоид"
            name="typeId"
            control={control}
            options={creatureTypes}
          />
          <Selector
            required
            message="Размер"
            label="Размеры"
            placeholder="Средний"
            name="sizeId"
            control={control}
            options={creatureSizes}
          />
          <Input required message="Здоровье" placeholder="120" name="hp" control={control} />
          <Input required message="Статус" placeholder="статус" name="status" control={control} />
          <Input
            required
            message="Скорость"
            placeholder="30 футов, лазая 20 футов"
            name="speed"
            control={control}
          />
          <Input
            required
            message="Чувства"
            placeholder="Темное зрение 60 футов, пассивное Восприятие 10"
            name="senses"
            control={control}
          />
          <Input
            required
            message="класс брони"
            placeholder="15"
            name="armorClass"
            control={control}
          />
          <Input
            required
            message="Язык"
            placeholder="Общий, эльфийский"
            name="language"
            control={control}
          />
          <Input
            required
            className="flex-1"
            message="Показатель опасности (ПО)"
            placeholder="от - 50 включительно ,если нет, то опасность отсутствует"
            name="challenge"
            control={control}
          />
        </div>

        <CharacteristicForm
          control={control}
          className="flex-1 min-w-[350px]"
          name="characteristics"
          title="Характеристики"
        />

        <div className="flex flex-col flex-2 gap-2 justify-start max-w-[350px]! border border-brand-200 p-3 rounded-md ">
          <Text color="brand-100" size="lg">
            Иммунитеты / Сопротивления
          </Text>
          <Selector
            message="Иммунитеты к урону"
            placeholder="Огонь, холод"
            label="Характеристики"
            control={control}
            multiple
            name={'damageImmunities'}
            options={damageStates}
          />
          <Selector
            message="Резисты к урону"
            placeholder="Огонь, холод"
            label="Характеристики"
            control={control}
            multiple
            name={'damageResistance'}
            options={damageStates}
          />
          <Selector
            message="Иммунитеты к состояниям"
            placeholder="Очарование, отравленный"
            label="Характеристики"
            control={control}
            multiple
            name={'conditionImmunities'}
            options={conditionStates}
          />
          <Selector
            message="Резисты к состояниям"
            placeholder="Очарование, отравленный"
            label="Характеристики"
            control={control}
            multiple
            name={'conditionResistance'}
            options={conditionStates}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 items-start min-w-[350px] border border-brand-200 p-3 rounded-md">
        <Text color="brand-100" size="lg">
          Владения
        </Text>
        <div className="w-full flex gap-2 flex-wrap items-end">
          <Input
            className="w-auto flex-2 min-w-[260px]"
            message="Укажи выбор навыков"
            placeholder="Атлетика +8, акробатика  +20"
            name="skills"
            control={control}
          />
          <Input
            className="w-auto flex-2 min-w-[260px]"
            message="Укажи какими спасбросками владеет"
            placeholder="Сила +10, ловкость +1"
            name="savingThrows"
            control={control}
          />
          <Input
            required
            className="w-auto flex-1 min-w-[260px]"
            message="Бонус мастерства"
            placeholder="2"
            name="proficiencyBonus"
            control={control}
          />
        </div>
      </div>

      <Input
        required
        placeholder="Владыка преисподней и величайшее зло"
        message="Короткое описание (1-2 предложения)"
        name="shortDescription"
        control={control}
      />

      <TextareaMD
        hasMd
        required
        control={control}
        message="Описание статблока"
        name="mdStatblock"
      />

      <TextareaMD hasMd required control={control} message="Фан факты" name="mdFunFacts" />
      <TextareaMD hasMd required control={control} message="История" name="mdHistory" />

      <TextareaMD
        hasMd
        required
        control={control}
        message="Описание существа"
        name="mdDescription"
      />
    </EditList>
  );
};

export default EditHostileCreatures;
