import {SizeTokenValue, theme} from 'theme';
import {Download} from 'icons';
import {Tooltip} from 'Tooltip';
import {Button} from 'Button';
import {Link} from 'Link';

import {Banner as BaseBanner} from './Banner';
import {BannerVariant} from './types';

import type {Meta, StoryObj} from '@storybook/react';
import type {BannerProps} from './types';

type BannerStoryProps = Omit<BannerProps, 'onClose'> & {
  onClose?: boolean;
};

export const Banner: React.FC<BannerStoryProps> = ({children, ...props}) => {
  const onClose = props.onClose ? () => alert('onClose') : undefined;

  const actionsTop = props.actionsTop ? (
    <Link target="_blank" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ">
      Перейти
    </Link>
  ) : undefined;

  const actionsBottom = props.actionsBottom ? (
    <Button size={SizeTokenValue.Small} onClick={() => alert('onClick')}>
      Исправить
    </Button>
  ) : undefined;

  const icon = props.icon !== false ? <Download size={SizeTokenValue.Medium} color={theme.colors.focus} /> : undefined;

  const resultProps = {
    ...props,

    icon,
    onClose,
    actionsTop,
    actionsBottom,
  };

  return (
    <div>
      <div style={{marginBottom: 16}}>
        <BaseBanner {...resultProps}>{children}</BaseBanner>
      </div>
      <div style={{marginBottom: 16}}>
        <BaseBanner {...resultProps}>
          <Tooltip content={children}>
            <div style={{whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}}>{children}</div>
          </Tooltip>
        </BaseBanner>
      </div>
    </div>
  );
};

const meta = {
  title: 'Banner',
  component: Banner,
  parameters: {
    layout: 'centered',
  },

  argTypes: {
    children: {
      type: 'string',
      control: 'text',
      description: 'Контент',
    },

    title: {
      type: 'string',
      control: 'text',
      description: 'Заголовок',
    },

    icon: {
      type: 'string | ReactNode' as never,
      control: 'boolean',
      description: 'Иконка',
    },

    variant: {
      type: 'BannerType' as never,
      control: 'select',
      options: [
        BannerVariant.defaultBlue,
        BannerVariant.defaultGrey,
        BannerVariant.success,
        BannerVariant.warning,
        BannerVariant.error,
      ],
      description: 'Тип',
    },

    size: {
      type: 'SizeTokenValue' as never,
      control: 'select',
      options: [SizeTokenValue.Medium, SizeTokenValue.XSmall],
      description: 'Размер',
    },

    actionsBottom: {
      type: 'boolean',
      control: 'boolean',
      description: 'Кнопки сверху',
    },

    actionsTop: {
      type: 'boolean',
      control: 'boolean',
      description: 'Кнопки снизу',
    },

    width: {
      type: 'string',
      control: 'text',
    },

    maxWidth: {
      type: 'string',
      control: 'text',
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

    borderColor: {
      type: 'string',
      control: 'color',
      description: 'Цвет границы',
    },

    onClose: {
      type: 'MouseEventHandler<HTMLButtonElement>' as never,
      control: 'boolean',
    },
  },
  args: {
    children: 'Simple message ',
  },
} satisfies Meta<typeof Banner>;

export const WithAction: StoryObj<typeof Banner> = {
  args: {
    children: 'У вашей команды не собираются метрики по Проектированию, потому что отсутствует ссылка на Базу знаний ',
    maxWidth: '513px',
    variant: BannerVariant.warning,
    onClose: true,
  },
};

export default meta;
