import {useContext} from 'react';
import styled from '@emotion/styled';
import {useDismiss, useInteractions} from '@floating-ui/react';

import {theme} from 'theme';

import {BaseCalendar, CalendarMode} from 'Calendar';
import {DatepickerContext} from 'Datepicker';

import type {BaseCalendarProps} from 'Calendar';

const Container = styled.div`
  z-index: ${theme.sizes.zIndex.dropdown};
`;

export const Calendar: React.FC = () => {
  const {value, mode, floating, calendarProps, onChange, isOpen, setIsOpen} = useContext(DatepickerContext);

  const floatingI = useInteractions([useDismiss(floating.context)]);

  if (!isOpen) {
    return null;
  }

  const props: BaseCalendarProps = {
    viewDate: value[0],

    ...calendarProps,

    mode,
    value,

    onChange: newValue => {
      const newIsOpen = mode === CalendarMode.range && (!newValue[0] || !newValue[1]);

      setIsOpen(newIsOpen);
      onChange(newValue);
    },
  };

  const containerProps = {
    ...floatingI.getFloatingProps(),

    style: floating.floatingStyles,
  };

  return (
    <Container ref={floating.refs.setFloating} {...containerProps}>
      <BaseCalendar {...props} />
    </Container>
  );
};
