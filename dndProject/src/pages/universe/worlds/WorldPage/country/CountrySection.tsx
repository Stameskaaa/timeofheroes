import { useState } from 'react';
import { Country } from '@/features/country/types';
import { hasArrayData } from '@/helpers/asyncHelpers';
import { CountryModal } from './CountryModal';
import { WorldsSectionTitle } from '../WorldPage';
import { PreviewCard } from '@/components/wrappers/cards/PreviewCard/PreviewCard';

export const CountrySection = ({ countries }: { countries?: Country[] }) => {
  const [openCountry, setOpenCountry] = useState<Country | null>(null);

  if (!hasArrayData(countries)) return null;

  return (
    <div className="flex flex-col gap-6">
      <WorldsSectionTitle title="Страны" />

      <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(300px,1fr))]">
        {countries.map((data, i) => (
          <PreviewCard
            onClick={() => setOpenCountry(data)}
            key={i}
            name={data?.name}
            src={data?.src}
          />
        ))}
      </div>

      <CountryModal currentCounty={openCountry} setCurrentCounty={setOpenCountry} />
    </div>
  );
};
