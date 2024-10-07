import type {Meta} from '@storybook/react';

import {theme} from 'theme';

import {Link as BaseLink} from './Link';
import type {LinkProps} from './types';
import {LinkVariant} from './types';

export const Link: React.FC<LinkProps> = props => {
  const onClick = props.onClick ? () => alert('onClick') : undefined;

  const resultProps = {
    ...props,

    onClick,
  };

  return (
    <div style={theme.typography.p2}>
      {'Ссылка используется в тексте. '}
      <BaseLink {...resultProps} />
      {' связывает веб-страницы'}
    </div>
  );
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
