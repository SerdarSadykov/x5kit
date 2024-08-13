import type {Meta} from '@storybook/react';

import {Tooltip} from 'tooltip';
import {Button} from 'button';

import {Banner as BaseBanner} from './Banner';
import {BannerProps, BannerVariant} from './types';
import {SizeTokenValue, theme} from 'theme';
import {Download} from 'icons';

type BannerStoryProps = BannerProps & {
  actionText?: string;
  actionHref?: string;
};

export const Banner: React.FC<BannerStoryProps> = ({children, ...props}) => {
  const action = props.actionText && {
    text: props.actionText,
    href: props.actionHref,
    onClick: () => alert('onClick'),
  };

  const buttonAction = props.actionText && (
    <Button size={SizeTokenValue.Medium} onClick={() => alert('onClick')}>
      {props.actionText}
    </Button>
  );

  const customIcon = props.icon !== false && <Download size={SizeTokenValue.Medium} color={theme.colors.focus} />;

  const resultProps = {
    ...props,
    action,
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
      <div>
        <BaseBanner {...resultProps} icon={customIcon} action={buttonAction}>
          {children}
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

    actionText: {
      type: 'BannerAction | ReactNode' as never,
      control: 'text',
      description: 'Текст кнопки',
    },

    actionHref: {
      type: 'string',
      control: 'text',
      description: 'Ссылка кнопки',
    },

    actionNextLine: {
      type: 'boolean',
      control: 'boolean',
      description: 'Расположение кнопки',
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
  },
  args: {
    children: 'An example of a very long message in a banner. We recommend using a maximum of 5 lines',
    maxWidth: '584px',
  },
} satisfies Meta<typeof Banner>;

export default meta;
