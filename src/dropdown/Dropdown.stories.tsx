import {useRef, useState} from 'react';
import type {Meta} from '@storybook/react';

import {Placement, SizeTokenValue, theme} from 'theme';
import {ArrowDown, ArrowUp} from 'icons';
import {Button} from 'button';

import {Dropdown as BaseDropdown, DropdownContent} from './Dropdown';
import type {DropdownProps} from './types';

export const Dropdown: React.FC<DropdownProps> = props => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const ref = useRef<HTMLButtonElement>(null);

  const onClick = () => setIsOpen(!isOpen);

  const Arrow = isOpen ? ArrowUp : ArrowDown;

  const endAdornment = <Arrow size={SizeTokenValue.Small} color={theme.colors.white} />;

  const resultProps: DropdownProps = {
    ...props,

    setIsOpen,

    isOpen: props.isOpen ?? isOpen,
    targetRef: ref,
  };

  const buttonProps = {
    onClick,
    endAdornment,
  };

  return (
    <>
      <Button ref={ref} {...buttonProps}>
        Создать отчет
      </Button>
      <BaseDropdown {...resultProps}>
        <DropdownContent>
          <div style={{padding: 15, ...theme.typography.p2}}>Описание текст форма</div>
        </DropdownContent>
      </BaseDropdown>
    </>
  );
};

const meta = {
  title: 'Dropdown',
  component: Dropdown,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    zIndex: {
      type: 'number',
      control: 'number',
      description: 'z-index',
    },

    placement: {
      type: 'Placement' as never,
      control: 'select',
      options: [
        Placement.top,
        Placement.right,
        Placement.bottom,
        Placement.left,
        Placement.topStart,
        Placement.topEnd,
        Placement.rightStart,
        Placement.rightEnd,
        Placement.bottomStart,
        Placement.bottomEnd,
        Placement.leftStart,
        Placement.leftEnd,
      ],
      description: 'Ширина',
    },

    width: {
      type: 'string | target' as never,
      control: 'text',
      description: 'Ширина',
    },

    isOpen: {
      type: 'boolean',
      control: 'boolean',
      description: 'Флаг раскрытия',
    },

    isPortal: {
      type: 'boolean',
      control: 'boolean',
      description: 'Использовать портал для рендера',
    },

    isMounted: {
      type: 'boolean',
      control: 'boolean',
      description: 'Рендерить скрытым',
    },

    setFloating: {
      type: '(floating: UseFloatingReturn) => void' as never,
      description: 'Вернуть инстанс floating UI',
    },

    middleware: {
      type: 'Array<Middleware | null | undefined | false>' as never,
      description: 'middleware floating UI',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {},
} satisfies Meta<typeof Dropdown>;

export default meta;
