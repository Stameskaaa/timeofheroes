import { useForm } from 'react-hook-form';
import {
  useCreateNewsMutation,
  useDeleteNewsMutation,
  useGetNewsListQuery,
  useUpdateNewsMutation,
} from '@/features/news/api';
import type { News } from '@/features/news/types';
import { EditList } from '../../ui/EditItem';
import { Input } from '@/components/wrappers/forms/input/Input';
import { TextareaMD } from '@/components/wrappers/forms/textarea/TextareaMD';

const EditNews = () => {
  const methods = useForm<News>({
    defaultValues: {
      createdDate: '',
      name: '',
      shortDescription: '',
      mdDescription: '',
      src: '',
    },
  });
  const { control } = methods;

  return (
    <EditList
      contentName="Новости"
      methods={methods}
      queryHook={useGetNewsListQuery}
      createHook={useCreateNewsMutation}
      updateHook={useUpdateNewsMutation}
      removeHook={useDeleteNewsMutation}
      mapData={(data: News[] | undefined) => {
        if (!data) return [];
        return data?.map(({ id, name: title, shortDescription }) => ({
          id,
          title,
          description: shortDescription,
        }));
      }}>
      <div className="flex gap-2 flex-wrap items-end">
        <Input
          required
          className="flex-1 min-w-[260px]"
          message="Название новости"
          placeholder="Украли кубики"
          name="name"
          control={control}
        />
        <Input
          required
          className="flex-1 min-w-[260px]"
          message="Ссылка на фото"
          placeholder="https://example.com/image.png"
          name="src"
          control={control}
        />
      </div>

      <Input
        required
        message="Краткое описание (1–2 предложения, используется в превью)"
        placeholder="Краткое описание"
        name="shortDescription"
        control={control}
      />
      <TextareaMD
        required
        control={control}
        name="mdDescription"
        placeholder="Напишите основной текст новости в формате Markdown"
      />
    </EditList>
  );
};

export default EditNews;
