import {ColorTokenGroup, ColorTokenState} from './types';

export const ui = {
  grey: <ColorTokenGroup>{
    5: '#f6f6f8',
    10: '#eff1f5',
    20: '#e1e5eb',
    30: '#cfd4dc',
    40: '#b4bbc6',
    50: '#9299a4',
    60: '#6c737d',
    70: '#50565e',
    80: '#3b4047',
    90: '#2a2e33',
    100: '#222429',
  },

  accent: <ColorTokenGroup>{
    5: '#f0f9fc',
    10: '#e3f2fd',
    20: '#bbdefb',
    30: '#90caf9',
    40: '#64b5f6',
    50: '#42a5f5',
    60: '#2196f3',
    70: '#1e88e5',
    80: '#1976d2',
    90: '#1565c0',
    100: '#0d47a1',
  },
} as const;
