import { Fragment } from 'react/jsx-runtime';
import { God } from '@/features/gods/types';
import { Separator } from '@/components/ui/separator';
import { Text } from '@/components/wrappers/typography/Text';
import { MarkDownText } from '@/components/wrappers/typography/MarkDownText';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';
import { Image } from '@/components/wrappers/image/Image';
import { OrnamentalDivider } from '@/components/wrappers/border/OrnamentalDivider';

export const PantheonModal = ({
  open,
  gods,
  setOpen,
}: {
  gods: God[];
  open: boolean;
  setOpen: (data: boolean) => void;
}) => {
  const count = gods.length || 0;

  return (
    <ModalWindow
      contentClassname="w-[98%] bg-brand-500 h-[80%] max-h-[1000px] !max-w-[1000px]"
      open={open}
      setOpen={() => setOpen(false)}>
      <div className="flex flex-col gap-6 h-full pr-3 overflow-y-auto">
        {gods?.map((data, i) => (
          <Fragment key={data.id}>
            <div className="flex flex-col gap-5" key={data.id}>
              <div className="relative flex justify-center overflow-hidden">
                <Image
                  className="h-[300px]! border-brand-200 border rounded-md"
                  alt={`Фотография бога ${data.name}`}
                  src={data.src}
                />
                <OrnamentalDivider className="absolute!" />
                <Text color="brand-100" className="absolute bottom-0 z-1" weight="bold" size="4xl">
                  {data?.name}
                </Text>
                <div
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, #141a1b 4%, transparent 100%)',
                  }}
                />
              </div>
              <MarkDownText className="mx-auto text-justify max-w-[600px]!">
                {data?.mdContent}
              </MarkDownText>
            </div>
            {i !== count - 1 ? (
              <Separator edgeEffect="block" edgeColor="brand-200" spacing="empty" />
            ) : null}
          </Fragment>
        ))}
      </div>
    </ModalWindow>
  );
};
