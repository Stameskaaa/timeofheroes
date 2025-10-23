import { useForm } from 'react-hook-form';
import {
  useCreateRuleMutation,
  useDeleteRuleMutation,
  useGetRulesListQuery,
  useUpdateRuleMutation,
} from '@/features/rules/api';
import type { Rule } from '@/features/rules/types';
import { allTags, ruleOptions } from '@/features/rules/constant';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { Selector } from '@/components/wrappers/forms/selector/Selector';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditRules = () => {
  const methods = useForm<Rule>({
    defaultValues: {
      name: '',
      type: 'dnd',
      shortDescription: '',
      mdContent: '',
      tags: [],
    },
  });
  const { watch, control, getValues, resetField } = methods;

  const selectedTag = watch('type');
  const tagList = allTags?.[selectedTag];

  function handleSave() {
    const { tags, ...rest } = getValues();
    const newTags = Array.isArray(tags) ? tags : [tags || 'other'];
    return { ...rest, tags: newTags };
  }

  return (
    <EditList
      contentName="Правила"
      methods={methods}
      getTransformedData={handleSave}
      queryHook={useGetRulesListQuery}
      createHook={useCreateRuleMutation}
      updateHook={useUpdateRuleMutation}
      removeHook={useDeleteRuleMutation}
      mapData={(data: Rule[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name, shortDescription }) => ({
          id,
          title: name,
          description: shortDescription,
        }));
      }}>
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          className="flex-2 min-w-[260px]"
          required
          placeholder="Введите название правила"
          message="Название правила"
          name="name"
          control={control}
        />

        <Selector
          className="flex-1"
          required
          onChangeAction={() => resetField('tags')}
          placeholder="Выберите тип правила"
          message="Тип правила"
          control={control}
          name="type"
          options={ruleOptions}
        />

        <Selector
          className="flex-1"
          message="Теги зависят от выбранного типа"
          required
          disabled={!tagList}
          multiple={selectedTag === 'dnd'}
          placeholder="Выберите тег"
          label="Теги"
          control={control}
          name="tags"
          options={tagList}
        />
      </div>
      <Input
        required
        message="Краткое описание (1–2 предложения, используется в превью)"
        placeholder="Введите короткое описание"
        name="shortDescription"
        control={control}
      />
      <TextareaMD
        hasMd
        required
        control={control}
        message="Полное описание правила в формате Markdown"
        placeholder="Добавьте подробное описание (Markdown)"
        name="mdContent"
      />
    </EditList>
  );
};

export default EditRules;
