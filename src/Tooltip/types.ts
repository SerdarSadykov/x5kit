import type {CSSProperties, ReactElement, ReactNode} from 'react';
import type {UseHoverProps} from '@floating-ui/react';

import type {Placement} from 'theme';
import type {QA} from 'common';

export type TooltipProps = {
  /** Компонент на котором показывать подсказку */
  children: ReactElement;
  /** Текст подсказки */
  content: ReactNode;

  /** Расположение */
  placement?: Placement;

  /** Принудительная установка состояния */
  isOpen?: boolean;
  /** Обработчик смены состояния */
  setIsOpen?: (newIsOpen: boolean) => void;

  /** Рендер в root или рядом */
  isPortal?: boolean;
} & QA &
  Pick<UseHoverProps, 'enabled' | 'delay'> &
  Pick<CSSProperties, 'width' | 'zIndex' | 'color' | 'backgroundColor' | 'whiteSpace'>;
