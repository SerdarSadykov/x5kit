import {forwardRef} from 'react';

import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {getQAAttribute} from 'common';

import {SegmentedControlItem} from './SegmentedControlItem';

import type {CSSObject} from '@emotion/styled';
import type {SegmentedControlProps} from './types';

const Container = styled.div<Pick<SegmentedControlProps, 'size' | 'disabled' | 'readOnly' | 'width'>>`
  position: relative;
  display: inline-flex;
  align-items: flex-start;
  justify-content: flex-start;
  border-radius: 4px;
  background-color: ${theme.colors.grey[20]};

  > label > span {
    ${props => {
      const isSmall = props.size === SizeTokenValue.Small;

      const styles: CSSObject = {
        padding: isSmall ? '4px 16px' : '12px 20px',
        minHeight: isSmall ? 32 : 48,
      };

      if (props.disabled) {
        styles.borderColor = theme.colors.grey[20];
        styles.backgroundColor = theme.colors.grey[20];
        styles.color = theme.colors.grey[40];
      }

      return styles;
    }}
  }

  ${props => ({
    width: props.width,
    pointerEvents: props.disabled || props.readOnly ? 'none' : undefined,
  })}
`;

export const SegmentedControl = forwardRef<HTMLDivElement, SegmentedControlProps>((props, ref) => {
  const {options, size, width, qa = 'segmented', ...restProps} = props;

  const children = options.map((option, index) => {
    const resultProps = {
      ...restProps,
      ...option,

      checked: typeof restProps.value !== 'undefined' ? restProps.value === option.value : undefined,

      qa: option.qa ?? `${qa}-element`,
    };

    return <SegmentedControlItem key={`${index}-${option.value}`} {...resultProps} />;
  });

  const containerProps = {
    size,
    width,
    children,

    disabled: props.disabled,
    readOnly: props.readOnly,

    'data-qa': qa,
  };

  return <Container ref={ref} {...containerProps} />;
});
