import type {Meta} from '@storybook/react';

import {Help, Calendar} from 'icons';

import {Tooltip as BaseTooltip} from './Tooltip';
import {TooltipPlacement, TooltipProps} from './types';

export const Tooltip: React.FC<TooltipProps> = props => {
  const resultProps = {
    ...props,
  };

  return (
    <div>
      <BaseTooltip {...resultProps}>
        <Help />
      </BaseTooltip>
      <BaseTooltip {...resultProps} content="Текст подсказки">
        <Calendar />
      </BaseTooltip>
    </div>
  );
};

const meta = {
  title: 'Tooltip',
  component: Tooltip,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    content: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    width: {
      type: 'number',
      control: 'number',
      description: 'Ширина',
    },


    whiteSpace: {
      type: 'string',
      control: 'select',
      options: ['pre', 'pre-wrap', 'pre-line'],
    },

    zIndex: {
      type: 'number',
      control: 'number',
      description: 'z-index',
    },

    placement: {
      type: 'TooltipPlacement' as never,
      control: 'select',
      options: [
        TooltipPlacement.top,
        TooltipPlacement.right,
        TooltipPlacement.bottom,
        TooltipPlacement.left,
        TooltipPlacement.topStart,
        TooltipPlacement.topEnd,
        TooltipPlacement.rightStart,
        TooltipPlacement.rightEnd,
        TooltipPlacement.bottomStart,
        TooltipPlacement.bottomEnd,
        TooltipPlacement.leftStart,
        TooltipPlacement.leftEnd,
      ],
      description: 'Ширина',
    },

    color: {
      type: 'string',
      control: 'color',
      description: 'Цвет текста',
    },

    backgroundColor: {
      type: 'string',
      control: 'color',
      description: 'Цвет фона',
    },

    delay: {
      type: 'number',
      control: 'number',
      description: 'Задержка',
    },

    isOpen: {
      type: 'boolean',
      control: 'boolean',
      description: 'Флаг раскрытия',
    },
  },
  args: {
    content: `Контент всплывающей подсказки в несколько строк.
    Эта подсказка не нужна постоянно, но она помогает
    пользователю в момент когда он испытывает трудности.`,
  },
} satisfies Meta<typeof Tooltip>;

export default meta;
