import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { FooterButton } from './WavesFooter';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';
import { CatalogModal, MOCK_PRODUCTS, Product } from '@/pages/main/components/CatalogSection';

export const EventsModal = () => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <>
      <ModalWindow
        contentClassname="w-[90%] !max-w-[400px] h-auto min-h-0 p-4"
        buttonTrigger={<FooterButton text="Основные мероприятия" />}>
        <div className="flex flex-col gap-1">
          <Text as="span" color="brand-100" size="xl">
            Основные мероприятия
          </Text>
          <Separator
            edgeColor="brand-300"
            edgeEffect="block"
            className="!h-[1px]"
            spacing="equalSmall"
          />
          {MOCK_PRODUCTS.map((data) => (
            <button
              onClick={() => setActiveProduct(data)}
              className="py-2 text-left px-4 group flex cursor-pointer items-center gap-2 justify-between bg-brand-300 hover:bg-brand-300/20 active:bg-brand-300 transition-colors rounded-sm"
              key={data.id}>
              <Text className="group-hover:text-brand-100">{data.title}</Text>
              <Text className="group-hover:text-brand-100">
                <ArrowRight size={16} />
              </Text>
            </button>
          ))}
        </div>
      </ModalWindow>
      <CatalogModal product={activeProduct} close={() => setActiveProduct(null)} />
    </>
  );
};
