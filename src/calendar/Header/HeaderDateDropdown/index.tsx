import styled from '@emotion/styled';

import {Placement} from 'theme';

import {Tooltip} from 'tooltip';

import {Dropdown} from 'calendar/Dropdown';

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
    <Center>
      <Tooltip placement={Placement.bottom} content="Выбор месяца">
        <Dropdown {...monthsProps} {...getDropdownProps(HeaderDateType.month)} />
      </Tooltip>
      <Tooltip placement={Placement.bottom} content="Выбор года">
        <Dropdown {...yearsProps} {...getDropdownProps(HeaderDateType.year)} />
      </Tooltip>
    </Center>
  );
};
