import styled from '@emotion/styled';

const Container = styled.div`
  display: flex;
  width: 40px;
  height: 40px;
  justify-content: center;
  align-items: center;
`;

export type DayProps = {
  date: Date;
}

const Day: React.FC<DayProps> = ({date}) => {
  return (
    <Container>{date.getDate()}</Container>
  );
}

export const getDayComponent = (date: Date) => <Day key={date.getTime()} date={date} />
