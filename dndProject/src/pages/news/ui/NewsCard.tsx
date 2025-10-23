import { News } from '@/features/news/types';
import { Button } from '@/components/ui/button';
import { Text } from '@/components/wrappers/typography/Text';
import { useNavigatePath } from '@/hooks/useNavigatePath';
import { Image } from '@/components/wrappers/image/Image';

export const NewsCard = (data: News) => {
  const { createdAt, name, shortDescription, src, id } = data;
  const { navigatePath } = useNavigatePath();

  return (
    <div
      onClick={() => navigatePath(`/news/${id}`, { newsData: data })}
      className="flex cursor-pointer flex-col border h-full border-brand-300 hover:border-brand-100 hover:shadow-md transition-all duration-300 rounded-md bg-brand-400 p-4 gap-3">
      <Text color="text-description" className="uppercase text-xs tracking-wide">
        {createdAt}
      </Text>

      <Text size="xl" className="line-clamp-2 leading-tight">
        {name}
      </Text>

      <Image src={src} alt="Картинка новости" className="!h-[220px] rounded-md" />

      <Text color="text-secondary" size="sm" className="line-clamp-3">
        {shortDescription}
      </Text>

      <div className="mt-auto flex justify-end">
        <Button size="sm" variant="ghost" className="text-brand-100 hover:text-brand-50">
          Подробнее →
        </Button>
      </div>
    </div>
  );
};
