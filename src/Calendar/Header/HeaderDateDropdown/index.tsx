import styled from '@emotion/styled';

import {Dropdown} from 'Calendar/Dropdown';

import {HeaderDateType} from '../types';

import {useHeaderDateDropdown, useMonths, useYears} from './hook';

import type {RequiredQA} from 'common';

export * from './hook';

const Center = styled.div`
  display: flex;
`;

export const HeaderDateDropdown: React.FC<RequiredQA> = props => {
  const yearsProps = useYears();
  const monthsProps = useMonths();
  const getDropdownProps = useHeaderDateDropdown(props);

  return (
    <Center data-qa={props.qa}>
      <Dropdown {...monthsProps} {...getDropdownProps(HeaderDateType.month)} />
      <Dropdown {...yearsProps} {...getDropdownProps(HeaderDateType.year)} />
    </Center>
  );
};
