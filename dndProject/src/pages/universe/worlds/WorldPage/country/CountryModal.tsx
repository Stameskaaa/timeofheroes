import { Country } from '@/features/country/types';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';

export const CountryModal = ({
  currentCounty,
  setCurrentCounty,
}: {
  currentCounty: Country | null;
  setCurrentCounty: (data: Country | null) => void;
}) => {
  return (
    <ModalWindow
      contentClassname="w-[98%]  h-[80%] max-h-[800px] !max-w-[800px]"
      open={!!currentCounty}
      setOpen={() => setCurrentCounty(null)}>
      <div className="pb-3 flex">
        <Text style={{ fontFamily: 'Cinzel' }} className="mx-auto" weight="bold" size="2xl">
          {currentCounty?.name}
        </Text>
      </div>

      <MarkDownText>{currentCounty?.mdDescription}</MarkDownText>
    </ModalWindow>
  );
};
