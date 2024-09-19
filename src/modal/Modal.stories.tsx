import {useRef, useState} from 'react';
import type {Meta, StoryObj} from '@storybook/react';

import {SizeTokenValue, theme} from 'theme';
import {AccountCircle} from 'icons';
import {Button, ButtonVariant} from 'button';
import {Banner, BannerVariant} from 'banner';

import {ModalContent} from './ModalContent';
import {ModalHeader} from './ModalHeader';
import {ModalFooter, ModalFooterContent} from './ModalFooter';
import {Modal as BaseModal} from './Modal';
import {ModalProps} from './types';

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
  const ref = useRef<HTMLButtonElement>(null);

  const onOpen = () => setIsOpen(true);
  const onClose = props.onClose ? () => setIsOpen(false) : undefined;

  const resultProps: ModalProps = {
    ...rest,

    targetRef: withTargetRef ? ref : undefined,
    isOpen,
    onClose,
  };

  const modal = (
    <BaseModal {...resultProps}>
      <ModalHeader caption={caption} onClose={onClose} icon={props.icon ? <AccountCircle /> : undefined}>
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
          {onClose && (
            <Button size={SizeTokenValue.Small} variant={ButtonVariant.outlined} onClick={onClose}>
              Отменить
            </Button>
          )}
          <Button size={SizeTokenValue.Small}>Отправить</Button>
        </ModalFooterContent>
      </ModalFooter>
    </BaseModal>
  );

  return (
    <div style={{position: 'relative', color: theme.colors.grey[60]}}>
      <Button onClick={onOpen} ref={ref}>
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
