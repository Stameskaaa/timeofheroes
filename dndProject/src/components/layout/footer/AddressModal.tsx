import { FooterButton } from './WavesFooter';
import { Text } from '@/components/wrappers/typography/Text';
import { ModalWindow } from '@/components/wrappers/modals/modalWindow/ModalWindow';

export const AddressModal = () => {
  return (
    <ModalWindow
      contentClassname="w-[90%] !max-w-[600px] h-auto min-h-0 p-4"
      buttonTrigger={<FooterButton text="Время работы, адреса клуба" />}>
      <Text weight="bold" color="text-secondary">
        <Text as="span" weight="normal" color="brand-100" size="xl">
          Адреса клуба <br />
        </Text>
        г. Пермь, ул. Максима Горького, д. 24, офис 30 (2 этаж) <br />
        г. Пермь, ул. Ленина, д. 50, офис 93
      </Text>
      <Text className="text-secondary">
        <Text as="span" color="brand-100" size="xl">
          Время работы <br />
        </Text>
        Забронируйте игру в удобное для вас время! Индивидуальные заказы принимаются ежедневно.{' '}
        <br /> Также присоединяйтесь к нашим регулярным играм:
        <strong>
          {` `}Пт{` `}
        </strong>
         16:00 – 20:00 |
        <strong>
          {` `}Сб–Вс {` `}
        </strong>
          10:00 – 20:00
      </Text>
    </ModalWindow>
  );
};
