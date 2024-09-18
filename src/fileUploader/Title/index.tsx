import styled from '@emotion/styled';

import {Download} from 'icons';
import {Link} from 'link';

import {FileUploaderProps} from '../types';
import {theme} from 'theme';

type TitleStyles = Pick<FileUploaderProps, 'disabled'>;

type TitleProps = Pick<FileUploaderProps, 'title' | 'subTitle'> & TitleStyles;

const TitleContainer = styled.div<TitleStyles>`
  text-align: center;
  user-select: none;
  color: ${props => theme.colors.grey[props.disabled ? 40 : 100]};

  ${theme.typography.p2}

  div {
    margin-bottom: 8px;
    color: ${props => props.disabled ? theme.colors.grey[40] : theme.colors.accent[90]};
  }

  a {
    color: ${props => props.disabled ? theme.colors.grey[40] : theme.colors.accent[90]};
  }
`;

const SubTitleContainer = styled.div<TitleStyles>`
  padding-top: 8px;
  text-align: center;
  user-select: none;
  color: ${props => props.disabled ? theme.colors.grey[40] : theme.colors.grey[60]};

  ${theme.typography.p3}
`;

export const Title: React.FC<TitleProps> = ({disabled, title, subTitle}) => {
  title ??= (
    <TitleContainer disabled={disabled}>
      <div>
        <Download />
      </div>
      <span>Перетащите файлы сюда или </span>
      <Link>выберите на компьютере</Link>
    </TitleContainer>
  );

  return (
    <div>
      {title}
      {!!subTitle && <SubTitleContainer disabled={disabled}>{subTitle}</SubTitleContainer>}
    </div>
  );
};
