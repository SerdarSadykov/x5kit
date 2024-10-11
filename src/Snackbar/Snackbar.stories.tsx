import {Button} from 'Button';

import {Link} from 'Link';

import {enqueueSnackbar} from './hook';
import {SnackbarVariant} from './types';

import type {Meta} from '@storybook/react';
import type {CSSObject} from '@emotion/react';
import type {SnackbarMessage} from './types';

export const Snackbar: React.FC<SnackbarMessage> = props => {
  const actionsTop: SnackbarMessage['actionsTop'] = props.actionsTop
    ? [
        {
          isButton: true,
          children: 'Кнопка',
          onClick: () => alert('onClick'),
        },
      ]
    : undefined;

  const actionsBottom: SnackbarMessage['actionsTop'] = props.actionsBottom
    ? [
        {
          isLink: true,
          children: 'Ссылка',
          href: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
        },
        <Link key="item2" target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
          Кнопка
        </Link>,
      ]
    : undefined;

  const anchorOrigin: SnackbarMessage['anchorOrigin'] = props['positionTopCenter']
    ? {vertical: 'top', horizontal: 'center'}
    : undefined;

  const open = () => enqueueSnackbar({...props, actionsTop, actionsBottom, anchorOrigin});

  return <Button onClick={open}>Показать</Button>;
};

const meta = {
  title: 'Snackbar',
  component: Snackbar,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    variant: {
      type: 'SnackbarVariant' as never,
      control: 'select',
      options: [SnackbarVariant.default, SnackbarVariant.success, SnackbarVariant.warning, SnackbarVariant.error],
      description: 'Вариант',
    },

    title: {
      type: 'string',
      control: 'text',
      description: 'Заголовок',
    },

    content: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    autoHideDuration: {
      type: 'number',
      control: 'number',
      description: 'Время показа',
    },

    closable: {
      type: 'boolean',
      control: 'boolean',
      description: 'Показывать крестик',
    },

    icon: {
      type: 'boolean | ReactNode' as never,
      control: 'boolean',
      description: 'Показывать иконку',
    },

    actionsTop: {
      type: 'boolean',
      control: 'boolean',
      description: 'Кнопки',
    },

    actionsBottom: {
      type: 'boolean',
      control: 'boolean',
      description: 'Кнопки снизу',
    },

    positionTopCenter: {
      type: 'boolean',
      control: 'boolean',
      description: 'Расположение сверху в центре',
    },

    whiteSpace: {
      type: 'string',
      control: 'select',
      options: ['pre', 'pre-wrap', 'pre-line', 'nowrap'] as Array<CSSObject['whiteSpace']>,
    },

    maxWidth: {
      type: 'string',
      control: 'text',
    },

    qa: {type: 'string', control: 'text'},
  },
  args: {
    title: 'Snackbars title',
    content: 'Simple message with action',
    closable: true,
  },
} as Meta<typeof Snackbar>;

export default meta;
