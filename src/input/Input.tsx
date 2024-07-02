import {InputHTMLAttributes, ReactNode, forwardRef} from 'react';
import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string | ReactNode;
  caption?: string | ReactNode;

  filled?: boolean;

  error?: boolean;
  textError?: string;

  // size?: SizeTokenValue;
  // loading?: boolean;
  // autoFocus?: boolean;

  // unborder?: boolean;
  // forbidTyping?: boolean;
  // autoComplete?: string;
  // isAbsoluteCaption?: boolean;
  // endAdornment?: ReactNode;
  // startAdornment?: ReactNode;

  // clear?: boolean
  // onClearClick?: MouseEventHandler
};

const Container = styled.div<InputHTMLAttributes<HTMLInputElement>>`
  width: ${props => props.width || '100%'};
  font-family: ${theme.typography.base.fontFamily};
`;

const InputContainer = styled.div<InputProps>`
  position: relative;
  font-size: ${theme.spaces.x8}px;
  line-height: ${theme.spaces.x12}px;
  letter-spacing: 0.12px;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-sizing: border-box;
    border-style: solid;
    border-radius: 4px;
    user-select: none;
    pointer-events: none;

    ${({error}) => {
      if (error) {
        return {
          borderWidth: 2,
          borderColor: theme.colors.additional.red[80],
        };
      }

      return {
        borderWidth: 1,
        borderColor: theme.colors.grey[30],
      };
    }}
  }
`;

const InputComponent = styled.input<InputProps>`
  position: relative;
  width: 100%;
  min-height: 48px;
  box-sizing: border-box;
  padding: 12px;
  outline: none;
  border: none;
`;

const LabelContainer = styled.div<InputProps>`
  position: absolute;
  display: flex;
  align-items: center;
  user-select: none;
  pointer-events: none;
  left: 0;
  width: 100%;
  box-sizing: border-box;
  transition-duration: 0.3s;
  color: ${theme.colors.grey[60]};

  ${({filled}) => {
    if (filled) {
      return {
        top: 4,
        height: 16,
        padding: '0 12px',
        fontSize: theme.spaces.x6,
        lineHeight: `${theme.spaces.x12}px`,
        letterSpacing: '0.08px',
      };
    }

    return {
      top: 0,
      height: '100%',
      padding: 12,
    };
  }}
`;

const Label = styled.label`
  display: block;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  overflow: hidden;
`;

const Caption = styled.div<InputProps>`
  padding: 4px 0;
  width: 100%;
  color: ${({error}) => (error ? theme.colors.additional.red[80] : theme.colors.grey[60])};
  font-size: ${theme.spaces.x6}px;
  line-height: ${theme.spaces.x8}px;
  letter-spacing: 0.08px;
  word-break: break-all;
`;

export const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const {value, onChange, label, error} = props;

  const filled = props.filled ?? !!value;

  const caption = error && props.textError ? props.textError : props.caption;

  const styles = {
    error,
    filled,
  };

  return (
    <Container ref={ref} width={props.width}>
      <InputContainer {...styles}>
        <InputComponent value={value} onChange={onChange} />

        {label && (
          <LabelContainer {...styles}>
            <Label>{label}</Label>
          </LabelContainer>
        )}
      </InputContainer>

      {caption && <Caption {...styles}>{caption}</Caption>}
    </Container>
  );
});
