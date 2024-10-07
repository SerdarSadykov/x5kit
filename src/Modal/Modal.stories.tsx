import {useRef, useState} from 'react';

import {SizeTokenValue, theme} from 'theme';
import {AccountCircle} from 'icons';
import {Button, ButtonVariant} from 'Button';
import {Banner, BannerVariant} from 'Banner';

import {ModalContent} from './ModalContent';
import {ModalHeader} from './ModalHeader';
import {ModalFooter, ModalFooterContent} from './ModalFooter';
import {Modal as BaseModal} from './Modal';

import type {ModalProps} from './types';
import type {Meta, StoryObj} from '@storybook/react';

type ModalStoryProps = {
  title: string;
  caption: string;
  icon: boolean;
  onClose: boolean;
  noBorderScroll: boolean;
  withTargetRef: boolean;
} & Omit<ModalProps, 'onClose'>;

export const Modal: React.FC<ModalStoryProps> = props => {
  const {title, caption, noBorderScroll, withTargetRef, ...rest} = props;

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  const onToggle = () => setIsOpen(!isOpen);
  const onClose = () => setIsOpen(false);

  const onOpenConfirm = () => setIsOpenConfirm(true);
  const onCloseConfirm = () => {
    setIsOpen(false);
    setIsOpenConfirm(false);
  };

  const resultProps: ModalProps = {
    ...rest,

    targetRef: withTargetRef ? ref : undefined,
    isOpen,
    onClose,
  };

  const modalConfirm = (
    <BaseModal
      isOpen={isOpenConfirm}
      onClose={() => setIsOpenConfirm(false)}
      closeOnOverlay={false}
      closeOnEscape={false}
    >
      <ModalHeader>Вы уверены что хотите "Отправить"?</ModalHeader>
      <ModalFooter>
        <ModalFooterContent />
        <ModalFooterContent>
          <Button size={SizeTokenValue.Small} variant={ButtonVariant.outlined} onClick={() => setIsOpenConfirm(false)}>
            Отменить
          </Button>
          <Button size={SizeTokenValue.Small} onClick={onCloseConfirm}>
            Отправить
          </Button>
        </ModalFooterContent>
      </ModalFooter>
    </BaseModal>
  );

  const modal = (
    <BaseModal {...resultProps}>
      <ModalHeader
        caption={caption}
        onClose={props.onClose ? onClose : undefined}
        icon={props.icon ? <AccountCircle /> : undefined}
      >
        {title}
      </ModalHeader>
      <ModalContent noBorderScroll={noBorderScroll}>
        <Banner variant={BannerVariant.warning} title="Низкий уровень мэтча с сегментами кампании">
          После мэтча в отчет вошли менее 60% загруженной аудитории. Возможно, проблема с логами. Обратите внимание на
          аналитику по каждому id
        </Banner>
        {props.children}
      </ModalContent>
      <ModalFooter>
        <ModalFooterContent>
          <Button size={SizeTokenValue.Small} variant={ButtonVariant.text}>
            Кнопка 1
          </Button>
        </ModalFooterContent>
        <ModalFooterContent>
          {props.onClose && (
            <Button size={SizeTokenValue.Small} variant={ButtonVariant.outlined} onClick={onToggle}>
              Отменить
            </Button>
          )}
          <Button size={SizeTokenValue.Small} onClick={onOpenConfirm}>
            Отправить
          </Button>
        </ModalFooterContent>
      </ModalFooter>
      {modalConfirm}
    </BaseModal>
  );

  return (
    <div style={{position: 'relative', color: theme.colors.grey[60]}}>
      <Button onClick={onToggle} ref={ref}>
        Открыть
      </Button>
      {modal}
    </div>
  );
};

const meta = {
  title: 'Modal',
  component: Modal,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    size: {
      type: 'SizeTokenValue | number' as never,
      control: 'select',
      options: [SizeTokenValue.Small, SizeTokenValue.Medium, SizeTokenValue.Large],
      description: 'Размер',
    },

    noBorderScroll: {
      type: 'boolean',
      control: 'boolean',
      description: 'Скрыть границу при overflow',
    },

    title: {
      type: 'string',
      control: 'text',
      description: 'Заголовок',
    },

    caption: {
      type: 'string',
      control: 'text',
      description: 'Под заголовоком',
    },

    children: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    icon: {
      type: 'ReacNode' as never,
      control: 'boolean',
      description: 'Иконка',
    },

    isPortal: {
      type: 'boolean',
      control: 'boolean',
      description: 'Рендер в body',
    },

    closeOnEscape: {
      type: 'boolean',
      control: 'boolean',
      description: 'Скрывать по Esc',
    },

    closeOnOverlay: {
      type: 'boolean',
      control: 'boolean',
      description: 'Скрывать по нажатию на фон',
    },

    onClose: {
      type: '() => void' as never,
      control: 'boolean',
      description: 'Показать крестик закрытия',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    title: 'Header',
    children: '999+',
    onClose: true,
  },
} as Meta<typeof Modal>;

export const ModalPopup: StoryObj<typeof Modal> = {
  args: {
    withTargetRef: true,
  },
};

export default meta;
