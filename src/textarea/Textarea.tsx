import {CSSProperties, forwardRef, MouseEventHandler, useEffect, useRef} from 'react';
import styled, {CSSObject} from '@emotion/styled';
import ReactTextareaAutosize from 'react-textarea-autosize';

import {theme} from 'theme';
import {InputCaption, InputProps, InputStyles, Label, useInput} from 'input';

import {TextareaProps} from './types';

type TextareaStyles = InputStyles & Pick<CSSProperties, 'width' | 'maxWidth' | 'minHeight' | 'maxHeight' | 'resize'>;

const Container = styled.div<TextareaStyles>`
  position: relative;

  * {
    ${theme.typography.base}
  }
  
  :hover textarea {
    ${({isDisabled, isFocused}) => {
      if (isDisabled || isFocused) {
        return;
      }

      return {
        borderWidth: 2,
        borderColor: theme.colors.grey[40],
      };
    }}
  }

  textarea {
    margin: 0;
    outline: none;
    border: none;
    background-color: transparent;
    vertical-align: top;
    box-sizing: border-box;
    border-style: solid;
    border-radius: 4px;

    ${theme.scroll};

    ${props => {
      const styles: CSSObject = {
        ...theme.typography.p1,
        
        resize: props.resize,
        width: props.width,
        maxWidth: props.maxWidth,
        maxHeight: props.maxHeight,
        minHeight: props.minHeight ?? 160,

        padding: props.isFilled ? '20px 12px 0' : '10px 12px 10px',
        cursor: props.isReadOnly ? 'default' : undefined,
        
        borderWidth: 1,
        borderColor: theme.colors.grey[30],
        color: theme.colors.grey[props.isDisabled ? 40 : 100],
      };

      if (props.isError) {
        styles.borderWidth = 2;
        styles.borderColor = theme.colors.additional.red[80];
      }else if (props.isDisabled) {
        styles.borderWidth = 1;
        styles.borderColor = theme.colors.grey[20];
      }else if (props.isFocused) {
        styles.borderWidth = 2;
        styles.borderColor = theme.colors.accent[90];
      }else if (props.isUnborder) {
        styles.borderWidth = 0;
      }

      return styles;
    }}
  }
`;

const LabelContainer = styled.div`
  position: absolute;
  pointer-events: none;
  left: 12px;
  top: 2px;
  height: 18px;
  background-color: ${theme.colors.white};
`;

export const Textarea = forwardRef<HTMLDivElement, TextareaProps>((props, ref) => {
  const inputProps = useInput(props as InputProps);
  
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);

  const textareaStyles = {
    ...inputProps.style,

    width: props.width,
    maxWidth: props.maxWidth,
    minHeight: props.minHeight,
    maxHeight: props.maxHeight,
    resize: props.resize,
  };

  const setLabelWidth = (width?: number) => {
    if(!width || !labelRef.current){
      return;
    }

    labelRef.current.style.width = `${width - 30}px`;
  }

  const onMouseMove: MouseEventHandler = e => {
    setLabelWidth((e.target as HTMLTextAreaElement)?.clientWidth);
  }

  useEffect(() => {
    setLabelWidth(inputRef.current?.clientWidth);
  }, [props.width, props.maxWidth]);

  const textareaProps = {
    ...inputProps.inputProps,

    onMouseMove,

    value: props.value,
    onInput: props.onChange,
  } as TextareaProps;

  return (
    <Container ref={ref} {...textareaStyles}>
      <ReactTextareaAutosize ref={inputRef} {...textareaProps} />

      <LabelContainer ref={labelRef}>
        <Label {...inputProps} />
      </LabelContainer>

      <InputCaption {...inputProps} />
    </Container>
  );
});
