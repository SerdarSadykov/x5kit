import type {Meta} from '@storybook/react';

import {Link as BaseLink} from './Link';
import {LinkProps, LinkVariant} from './types';

type LinkStoryProps = {
  color: string;
  backgroundColor: string;
  borderColor: string;
} & LinkProps;

export const Link: React.FC<LinkStoryProps> = props => {
  const onClick = props.onClick ? () => alert('onClick') : undefined;

  const resultProps = {
    ...props,

    onClick,
  };

  return <BaseLink {...resultProps} />;
};

const meta = {
  title: 'Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    tooltip: {
      type: 'string',
      control: 'text',
      description: 'Tooltip',
    },

    variant: {
      type: 'LinkVariant' as never,
      control: 'select',
      options: [LinkVariant.accent, LinkVariant.blue],
      description: 'Вариант',
    },

    href: {
      type: 'string',
      control: 'text',
      description: 'Ссылка',
    },

    target: {
      type: 'HTMLAttributeAnchorTarget' as never,
      control: 'select',
      options: ['_self', '_blank'],
      description: 'Target',
    },

    disabled: {
      type: 'boolean',
      control: 'boolean',
    },

    pseudolink: {
      type: 'boolean',
      control: 'boolean',
    },

    visitable: {
      type: 'boolean',
      control: 'boolean',
    },

    loading: {
      type: 'boolean',
      control: 'boolean',
    },

    fontSize: {
      type: 'string',
      control: 'text',
    },

    lineHeight: {
      type: 'string',
      control: 'text',
    },

    color: {
      type: 'string',
      control: 'color',
      description: 'Цвет текста',
    },

    onClick: {
      type: 'MouseEventHandler<HTMLButtonElement>' as never,
      control: 'boolean',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    children: 'Текст ссылки',
    href: 'https://newportal.x5.ru/',
  },
} as Meta<typeof Link>;

export default meta;
