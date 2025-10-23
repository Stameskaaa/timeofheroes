import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/wrappers/image/Image';
import { MotionText, Text } from '@/components/wrappers/typography/Text';
import { Carousel } from '@/components/wrappers/media/carousel/Carousel';
import { Section } from '@/components/wrappers/sections/section/Section';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';

export const MOCK_PRODUCTS: Product[] = Array.from({ length: 8 }).map((_, i) => ({
  id: i,
  title: `Услуга ${i + 1}`,
  image: `https://cdna.artstation.com/p/assets/images/images/036/584/474/large/anato-finnstark-1-final-cover-2.jpg?1618064194`,
  shortDesc: `Короткое описание услуги ${i + 1}`,
  mdFullDesc: `# Полное описание услуги ${
    i + 1
  }\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit. Пример MD контента для услуги ${
    i + 1
  }.`,
}));

export interface Product {
  id: number;
  title: string;
  image: string;
  shortDesc: string;
  mdFullDesc: string;
}

export const CatalogSection = () => {
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

  return (
    <Section
      paddingY="large"
      className="mx-auto flex bg-brand-400/50 items-center justify-center flex-col">
      <MotionText
        className="mb-14"
        size="4xl"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}>
        Наши услуги
      </MotionText>
      <Section
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true, amount: 0.4 }}
        fixedWidth>
        <Carousel
          options={{ dragFree: true, slidesToScroll: 1 }}
          slides={MOCK_PRODUCTS.map((product, i) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => setActiveProduct(product)}
            />
          ))}
        />
      </Section>
      <CatalogModal product={activeProduct} close={() => setActiveProduct(null)} />
    </Section>
  );
};

interface ProductCardProps {
  product: Product;
  onClick: () => void;
}

const ProductCard = ({ product, onClick }: ProductCardProps) => {
  return (
    <div
      onClick={onClick}
      className="relative flex flex-col min-w-[250px] rounded-sm overflow-hidden flex-1 h-full cursor-pointer hover:shadow-lg transition-shadow group">
      <div className=" w-full flex-1 overflow-hidden">
        <Image src={product.image} alt={product.title} />
      </div>
      <div className="absolute inset-0 z-1 flex items-center justify-center bg-black/80 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Text size="xl" color="brand-100">
          Подробнее
        </Text>
      </div>
      <div className="absolute bottom-0 border-t-2 border-brand-100 w-full h-[90px] bg-black/75 flex flex-col justify-center p-2">
        <Text size="2xl" weight="bold">
          {product.title}
        </Text>
        <Text color="text-secondary">{product.shortDesc}</Text>
      </div>
    </div>
  );
};

export const CatalogModal = ({
  product,
  close,
}: {
  product: Product | null;
  close: () => void;
}) => {
  return (
    <ModalWindow
      contentClassname="w-[800px] !max-w-[95%] max-h-[80%] h-[800px] overflow-y-auto"
      open={!!product}
      setOpen={close}>
      {!!product && (
        <div className="flex max-[687px]:flex-col h-full gap-4">
          <div className="flex-1 min-w-[250px] h-full overflow-hidden rounded-md max-h-[800px] max-[687px]:max-h-[400px]">
            <Image alt="Фотография каталога товаров" src={product.image} />
          </div>

          <div className="flex-1 min-w-[280px] flex flex-col justify-between">
            <div>
              <Text size="2xl" weight="bold" className="mb-4">
                {product.title}
              </Text>
              <MarkDownText className="mb-4">{product.mdFullDesc}</MarkDownText>
            </div>
            <Button
              onClick={() => window.open('https://vk.com/market-202247698?screen=group', '_blank')}
              size="lg"
              variant="success">
              Приобрести
            </Button>
          </div>
        </div>
      )}
    </ModalWindow>
  );
};
