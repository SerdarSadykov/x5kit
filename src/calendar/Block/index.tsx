import {createContext, useContext} from 'react';
import styled from '@emotion/styled';
import {addMonths} from 'date-fns';

import {RequiredQA, getQAAttribute} from 'common';
import {CalendarContext} from 'calendar';

import {WeekDays} from '../WeekDays';
import {Header} from '../Header';
import {Days} from '../Days';
import {theme} from 'theme';

export type BlockContextProps = {
  viewDate: Date;
  blockNumber: number;
  isSingle: boolean;
  isFirst: boolean;
  isLast: boolean;
};

export const BlockContext = createContext<BlockContextProps>({
  blockNumber: 0,
  viewDate: new Date(),
  isSingle: true,
  isFirst: true,
  isLast: true,
});

const Container = styled.div`
  position: relative;
  padding: ${theme.spaces.x8}px;
`;

export type BlockProps = RequiredQA & {
  blockNumber: number;
};

const Block: React.FC<BlockProps> = ({qa, blockNumber}) => {
  const getQA = getQAAttribute(qa);
  const context = useContext(CalendarContext);
  const viewDate = blockNumber > 0 ? addMonths(context.viewDate, blockNumber) : context.viewDate;

  const isSingle = context.blocks === 1;
  const isFirst = blockNumber === 0;
  const isLast = blockNumber === context.blocks - 1;

  const blockContext: BlockContextProps = {
    blockNumber,
    viewDate,
    isSingle,
    isFirst,
    isLast,
  };

  return (
    <Container data-qa={getQA('block-1')}>
      <BlockContext.Provider value={blockContext}>
        <Header qa={getQA('header')} />
        <WeekDays qa={getQA('week')} />
        <Days />
      </BlockContext.Provider>
    </Container>
  );
};

export default Block;
