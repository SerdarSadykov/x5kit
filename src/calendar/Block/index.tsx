import {useContext} from 'react';

import {RequiredQA, getQAAttribute} from 'common';

import Day from '../Day';
import {Week} from '../Week';
import {Header} from '../Header';

import {CalendarBlockProps} from './types';
import {freezeRangeValues} from '../types';
import {getDayStates, findDisabledDate} from './helpers';

import {useStyles} from './styles';
import {CalendarContext} from 'calendar';
import styled from '@emotion/styled';

const BlockContainer = styled.div();

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
    <BlockContainer data-qa={getQA('block-1')}>
      <Header qa={getQA('header')} />
      <Week qa={getQA('week')} />
      <div>
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
      </div>
    </BlockContainer>
  );
};

export default Block;
