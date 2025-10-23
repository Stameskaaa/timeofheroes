import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SmartLink } from '../../navigation/link/SmartLink';

export const BackButton = () => {
  return (
    <SmartLink to={-1}>
      <Button className="mr-auto">
        <ArrowLeft /> Назад
      </Button>
    </SmartLink>
  );
};
