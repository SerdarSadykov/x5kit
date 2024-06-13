import {useContext} from 'react';
import styled from '@emotion/styled';

import {RequiredQA, getQAAttribute} from 'common';
import {CalendarContext} from 'calendar';

import {WeekDays} from '../WeekDays';
import {Header} from '../Header';
import {Days} from '../Days';

// import {CalendarBlockProps} from './types';
// import {freezeRangeValues} from '../types';
// import {getDayStates, findDisabledDate} from './helpers';

const Container = styled.div`
  position: relative;
`;

const Block: React.FC<RequiredQA> = ({qa}) => {
  const {} = useContext(CalendarContext);
  const getQA = getQAAttribute(qa);

  // const isHover = Array.isArray(date) && (date.length === 1 || freezeRange === freezeRangeValues.end)

  // const onChangeViewDateHandle = (event) => {
  //   const { value } = event.currentTarget.dataset
  //   onChangeViewDate(value)
  // }

  // const onChangeDateHandle = (event) => {
  //   const { value } = event.currentTarget.dataset
  //   if (!long) onChangeViewDateHandle(event)

  //   onChangeHoverDate('')
  //   onChangeDate(value)
  // }

  // const onMouseOver = (event) => {
  //   if (isHover) {
  //     const { value } = event.currentTarget.dataset
  //     onChangeHoverDate(value)
  //   }
  // }

  // const onMouseOut = () => {
  //   if (isHover) {
  //     onChangeHoverDate('')
  //   }
  // }

  return (
    <Container data-qa={getQA('block-1')}>
      <Header qa={getQA('header')} />
      <WeekDays qa={getQA('week')} />
      <Days />
        {/* {elements.map((days, i) => (
          <div key={i} className={classes.block}>
            {days.map((day, j) => {
              if (!day) {
                return <Day key={`${i}-${j}`} qa={getQA('day', 'hide')} value="none" states={['hide']} />
              }

              const { isDisabled, tooltip } = findDisabledDate(disabledDates, dateFormat, dayjs(day, dateFormat))
              const states = getDayStates({
                day,
                date,
                viewDate,
                dateFormat,
                hoverDate,
                minDate,
                maxDate,
                isDisabled,
                freezeRange,
              })

              return (
                <Day
                  qa={getQA('day', states)}
                  key={`${i}-${j}`}
                  value={day}
                  states={states}
                  dateFormat={dateFormat}
                  onClick={onChangeDateHandle}
                  onMouseOver={onMouseOver}
                  onMouseOut={onMouseOut}
                  tooltip={tooltip}
                />
              )
            })}
          </div>
        ))} */}
      {/* </div> */}
    </Container>
  );
};

export default Block;
