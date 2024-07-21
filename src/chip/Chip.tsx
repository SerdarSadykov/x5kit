import styled from '@emotion/styled';

import {SizeTokenValue, theme} from 'theme';

import {ChipProps, ChipStyles, ChipVariant} from './types';

const Container = styled.div<ChipStyles>`
  display: flex;
  align-items: flex-start;
  box-sizing: border-box;
  gap: 4px;
  border-radius: 4px;
  color: ${theme.colors.grey[100]};
  border-width: 1px;
  border-style: solid;

  ${theme.typography.p2}

  ${({size, whiteSpace}) => {
    const isSmall = size == SizeTokenValue.Small;

    return {
      whiteSpace,
      padding: isSmall ? '2px 6px' : 8,
      minHeight: isSmall ? 20 : 32,
    };
  }}
`;

const FilledContainer = styled(Container)`
  &:hover {
    background-color: ${theme.colors.grey[30]};
    border-color: ${theme.colors.grey[30]};
  }

  ${({checked}) => {
    const backgroundColor = checked ? theme.colors.accent[20] : theme.colors.grey[20];

    return {
      backgroundColor,
      borderColor: backgroundColor,
    };
  }}
`;

const OutlinedContainer = styled(Container)`
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

const Content = styled.div<ChipStyles>`
  ${({whiteSpace}) => ({whiteSpace})}
`;

export const Chip: React.FC<ChipProps> = props => {
  const {label, startAdornment, endAdornment, size = SizeTokenValue.Medium, variant = ChipVariant.filled} = props;

  const styles: ChipStyles = {
    size,
    whiteSpace: props.whiteSpace,
    checked: props.checked,
    error: props.error,
  };

  const Component = variant === ChipVariant.outlined ? OutlinedContainer : FilledContainer;

  return (
    <Component {...styles}>
      {startAdornment}

      <Content {...styles}>{label}</Content>

      {endAdornment}
    </Component>
  );
};
