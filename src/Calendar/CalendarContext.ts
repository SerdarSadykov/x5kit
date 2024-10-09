import {createContext} from 'react';

import type {CalendarContextProps} from './types';

export const CalendarContext = createContext<CalendarContextProps>({} as never);
