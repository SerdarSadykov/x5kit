import {useState} from 'react';

import {Visibility, VisibilityOff} from 'icons';
import {SizeTokenValue} from 'theme';
import {Input, InputButton} from 'Input';

import type {InputHTMLAttributes} from 'react';

import type {PasswordInputProps} from './types';

export const PasswordInput: React.FC<PasswordInputProps> = ({qa = 'password', ...props}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const Icon = isOpen ? Visibility : VisibilityOff;

  const type: InputHTMLAttributes<HTMLInputElement>['type'] = isOpen ? 'text' : 'password';

  const endAdornment = (
    <InputButton
      data-qa={`${qa}-toggle`}
      isDisabled={props.disabled}
      isSmall={props.size === SizeTokenValue.Small}
      onClick={() => setIsOpen(!isOpen)}
    >
      <Icon size={props.size} />
    </InputButton>
  );

  return <Input endAdornment={endAdornment} type={type} qa={qa} {...props} />;
};
