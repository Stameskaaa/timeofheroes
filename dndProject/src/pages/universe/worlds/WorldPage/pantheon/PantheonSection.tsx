import { useState } from 'react';
import { God } from '@/features/gods/types';
import { hasArrayData } from '@/helpers/asyncHelpers';
import { PantheonModal } from './PantheonModal';
import { ImageRevealCard } from '@/components/wrappers/cards/ImageRevealCard/ImageRevealCard';

export const PantheonSection = ({ gods }: { gods?: God[] }) => {
  const [showPatheon, setShowPatheon] = useState(false);

  if (!hasArrayData(gods)) return null;

  return (
    <>
      <ImageRevealCard
        onClick={() => setShowPatheon(true)}
        name="Пантеон богов"
        description="описание"
        src="https://i.pinimg.com/1200x/02/0d/ff/020dfff081c9911f5568e4087e12c3ae.jpg"
      />
      <PantheonModal gods={gods} setOpen={setShowPatheon} open={showPatheon} />
    </>
  );
};
