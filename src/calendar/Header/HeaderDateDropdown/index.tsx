import styled from '@emotion/styled';

import {RequiredQA} from 'common';
import {Dropdown} from 'calendar/Dropdown';

import {HeaderDateType} from '../types';

import {useHeaderDateDropdown, useMonths, useYears} from './hook';

export * from './hook';

const Center = styled.div`
  display: flex;
`;

export const HeaderDateDropdown: React.FC<RequiredQA> = props => {
  const yearsProps = useYears();
  const monthsProps = useMonths();
  const getDropdownProps = useHeaderDateDropdown(props);

  return (
    <Center>
      <Dropdown {...monthsProps} {...getDropdownProps(HeaderDateType.month)} />
      <Dropdown {...yearsProps} {...getDropdownProps(HeaderDateType.year)} />
    </Center>
  );
};
