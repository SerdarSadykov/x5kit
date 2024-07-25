import {forwardRef, MouseEventHandler} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';
import {Loader} from 'loader';

import {LinkProps, LinkStyles, LinkVariant} from './types';

const variantBehavior = {
  [LinkVariant.accent]: {
    default: {
      color: theme.colors.accent[90],
    },

    hover: {
      color: theme.colors.accent[80],
    },

    active: {
      color: theme.colors.accent[100],
    },

    visited: {
      color: theme.colors.additional.violet[80],
    },

    disabled: {
      color: theme.colors.grey[40],
      cursor: 'default',
    },
  },

  [LinkVariant.blue]: {
    default: {
      color: theme.colors.additional.blue[90],
    },

    hover: {
      color: theme.colors.additional.blue[80],
    },

    active: {
      color: theme.colors.additional.blue[100],
    },

    visited: {
      color: theme.colors.additional.violet[80],
    },

    disabled: {
      color: theme.colors.grey[40],
      cursor: 'default',
    },
  },
};

const BaseLinkComponent = styled.a<LinkStyles>`
  display: inline-flex;
  gap: 8px;
  align-items: center;
  text-decoration-skip-ink: none;
  vertical-align: bottom;
  font-family: ${theme.typography.p1.fontFamily};

  ${props => props.behavior.default}

  :hover {
    ${props => props.behavior.hover}
  }

  :active {
    ${props => props.behavior.active}
  }

  :visited {
    ${props => props.visitable && props.behavior.visited}
  }

  &[disabled] {
    ${props => props.behavior.disabled}
  }
`;

const LinkComponent = styled(BaseLinkComponent)`
  text-decoration: none;

  :link {
    text-decoration: none;
  }

  :hover {
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }

  :visited {
    text-decoration: none;
  }

  &[disabled] {
    text-decoration: none;
  }
`;

const PseudoLinkComponent = styled(BaseLinkComponent)`
  text-decoration: underline dashed;

  :link {
    text-decoration: underline dashed;
  }

  :hover {
    text-decoration: underline dashed;
  }

  :active {
    text-decoration: dashed;
  }

  :visited {
    text-decoration: dashed;
  }

  &[disabled] {
    text-decoration: none;
  }
`;

export const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const {
    children,
    disabled,
    behavior,
    pseudolink,
    loading,

    variant = LinkVariant.accent,
    qa = 'link',

    ...rest
  } = props;

  const onClickCapture: MouseEventHandler<HTMLAnchorElement> = e => {
    if (disabled) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!props.href) {
      e.preventDefault();
    }

    props.onClickCapture?.(e);
  };

  const linkStyles = {
    ...rest,

    ref,
    disabled,
    onClickCapture,

    behavior: behavior ?? variantBehavior[variant],

    'data-qa': qa,
  };

  const Component = pseudolink ? PseudoLinkComponent : LinkComponent;

  return (
    <Component {...linkStyles}>
      {loading && <Loader color="inherit" size={SizeTokenValue.Small} />}
      {children}
    </Component>
  );
});
