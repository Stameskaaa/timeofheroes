import { toast } from 'sonner';
import { LucideStar } from 'lucide-react';
import {
  FavoriteTypes,
  toggle,
  useFavorites,
  useFavoritesActions,
} from '@/features/favorite/favoriteSlice';
import { Button } from '@/components/ui/button';

export const AddFavorite = ({ type, id }: { type: FavoriteTypes; id: number }) => {
  const favorites = useFavorites();
  const dispatch = useFavoritesActions();

  const current =
    type === 'traits' || type === 'spells' ? favorites[type].includes(id) : favorites[type] === id;

  const names: Record<FavoriteTypes, string> = {
    class: 'Класс',
    origin: 'Происхождение',
    race: 'Раса',
    traits: 'Черта',
    spells: 'Заклинание',
  };

  const handleClick = () => {
    dispatch(toggle({ type, id }));

    const name = names[type];
    let action = current ? 'удалён' : 'добавлен';

    if (type === 'race' || type === 'traits') {
      action = current ? 'удалена' : 'добавлена';
    }

    if (type === 'spells' || type === 'origin') {
      action = current ? 'удалено' : 'добавлено';
    }

    toast(`${name} успешно ${action}`);
  };

  return (
    <Button size="icon" variant="ghost" onClick={handleClick}>
      <LucideStar fill={current ? 'currentColor' : 'none'} stroke="currentColor" />
    </Button>
  );
};
