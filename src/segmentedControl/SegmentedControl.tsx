import {forwardRef} from 'react';
import styled, {CSSObject} from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {SegmentedControlItem} from './SegmentedControlItem';
import {SegmentedControlProps} from './types';
import {getQAAttribute} from 'common';

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
  const getQA = getQAAttribute(qa);

  const children = options.map((props, index) => {
    const resultProps = {
      ...restProps,
      ...props,

      checked: typeof restProps.value !== 'undefined' ? restProps.value === props.value : undefined,
      qa: getQA('element'),
    };

    return <SegmentedControlItem key={`${index}-${props.value}`} {...resultProps} />;
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
