import {ElementType, forwardRef} from 'react';
import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {EndAdornment} from './EndAdornment';
import {Content} from './Content';
import {Tooltip} from './Tooltip';
import {ChipProps, ChipStyles, ChipVariant} from './types';

const variantBehavior = {
  [ChipVariant.filled]: {
    default: {
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[20],
    },

    hover: {
      backgroundColor: theme.colors.grey[30],
      borderColor: theme.colors.grey[30],
    },

    active: {
      backgroundColor: theme.colors.accent[20],
      borderColor: theme.colors.accent[20],
    },

    error: {
      backgroundColor: theme.colors.red[20],
      borderColor: theme.colors.red[20],
    },

    checked: {
      backgroundColor: theme.colors.accent[20],
      borderColor: theme.colors.accent[20],
    },
  },

  [ChipVariant.outlined]: {
    default: {
      backgroundColor: 'none',
      borderColor: theme.colors.grey[30],
    },

    hover: {
      backgroundColor: theme.colors.grey[20],
      borderColor: theme.colors.grey[30],
    },

    active: {
      backgroundColor: theme.colors.accent[20],
      borderColor: theme.colors.accent[30],
    },

    error: {
      backgroundColor: 'none',
      borderColor: theme.colors.red[30],
    },

    checked: {
      backgroundColor: theme.colors.accent[20],
      borderColor: theme.colors.accent[30],
    },
  },
};

const Container = styled.div<ChipStyles>`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  gap: 4px;
  border-radius: 4px;
  color: ${theme.colors.grey[100]};
  border-width: 1px;
  border-style: solid;
  text-decoration: none;

  :link, :visited {
    color: ${theme.colors.grey[100]};
  }

  :hover {
    ${props => variantBehavior[props.variant].hover}
  }

  :active {
    ${props => variantBehavior[props.variant].active}
  }

  ${theme.typography.p2}

  ${props => {
    const variantProps = variantBehavior[props.variant];
    const isSmall = props.size == SizeTokenValue.Small;

    let resultProps: CSSObject = {
      padding: isSmall ? '2px 6px' : 8,
      minHeight: isSmall ? 20 : 32,
    };

    if (props.error) {
      resultProps = {...resultProps, ...variantProps.error};
    } else if (props.checked) {
      resultProps = {...resultProps, ...variantProps.checked};
    } else {
      resultProps = {...resultProps, ...variantProps.default};
    }

    if (props.disabled) {
      resultProps.cursor = 'not-allowed';
    } else if (props.isButton) {
      resultProps.cursor = 'pointer';
    }

    return resultProps;
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
    size,
    variant,

    disabled: props.disabled,
    checked: props.checked,
    error: props.error,
    isButton: !!onClick,

    as: props.href ? 'a' as ElementType : undefined,
    href: props.href,
    target: props.target,

    onClick: props.disabled ? undefined : onClick,
  };

  return (
    <Tooltip {...newProps}>
      <Container ref={ref} {...componentProps}>
        {startAdornment}

        <Content {...newProps} />

        <EndAdornment {...newProps} />
      </Container>
    </Tooltip>
  );
});
