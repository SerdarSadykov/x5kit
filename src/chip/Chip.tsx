import {CSSProperties, forwardRef} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {EndAdornment} from './EndAdornment';
import {Content} from './Content';
import {Tooltip} from './Tooltip';
import {ChipProps, ChipVariant} from './types';

const Container = styled.div<Pick<ChipProps, 'size' | 'disabled'> & {isButton: boolean}>`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  gap: 4px;
  border-radius: 4px;
  color: ${theme.colors.grey[100]};
  border-width: 1px;
  border-style: solid;

  ${theme.typography.p2}

  ${props => {
    const isSmall = props.size == SizeTokenValue.Small;
    let cursor: CSSProperties['cursor'];

    if (props.disabled) {
      cursor = 'not-allowed';
    } else if (props.isButton) {
      cursor = 'pointer';
    }

    return {
      cursor,
      padding: isSmall ? '2px 6px' : 8,
      minHeight: isSmall ? 20 : 32,
    };
  }}
`;

const FilledContainer = styled(Container)<Pick<ChipProps, 'checked' | 'error'>>`
  &:hover {
    background-color: ${theme.colors.grey[30]};
    border-color: ${theme.colors.grey[30]};
  }

  ${props => {
    let backgroundColor = theme.colors.grey[20];

    if (props.error) {
      backgroundColor = theme.colors.red[20];
    } else if (props.checked) {
      backgroundColor = theme.colors.accent[20];
    }

    return {
      backgroundColor,
      borderColor: backgroundColor,
    };
  }}
`;

const OutlinedContainer = styled(Container)<Pick<ChipProps, 'checked' | 'error'>>`
  &:hover {
    background-color: ${theme.colors.grey[20]};
    border-color: ${theme.colors.grey[30]};
  }

  ${props => {
    if (props.error) {
      return {
        backgroundColor: 'none',
        borderColor: theme.colors.red[30],
      };
    }

    if (props.checked) {
      return {
        backgroundColor: theme.colors.accent[20],
        borderColor: theme.colors.accent[30],
      };
    }

    return {
      backgroundColor: 'none',
      borderColor: theme.colors.grey[30],
    };
  }}
`;

export const Chip = forwardRef<HTMLDivElement, ChipProps>((props, ref) => {
  const {
    startAdornment,
    onClick,

    maxLength = 25,
    size = SizeTokenValue.Medium,
    variant = ChipVariant.filled,
  } = props;

  const newProps = {maxLength, size, variant, ...props};

  const componentProps = {
    ref,
    size,

    disabled: props.disabled,
    checked: props.checked,
    error: props.error,
    isButton: !!onClick,

    onClick: props.disabled ? undefined : onClick,
  };

  const Component = variant === ChipVariant.outlined ? OutlinedContainer : FilledContainer;

  return (
    <Tooltip {...newProps}>
      <Component {...componentProps}>
        {startAdornment}

        <Content {...newProps} />

        <EndAdornment {...newProps} />
      </Component>
    </Tooltip>
  );
});
