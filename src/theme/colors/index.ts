import {additional} from './additional';
import {theme} from './theme';
import {ui} from './ui';

import {ColorTokenState} from './types';

import type {ColorTokenGroup, ColorTokenMoreGroup} from './types';

export * from './types';

export const colors = {
  grey: <ColorTokenGroup>{
    5: '#f7f8fa',
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
    5: '#f0f7fc',
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

  red: <ColorTokenMoreGroup>{
    10: '#feebee',
    20: '#fecdd2',
    30: '#ef9a9a',
    40: '#e57373',
    50: '#ef5350',
    60: '#f44336',
    70: '#e53935',
    80: '#d32f2f',
    90: '#c62828',
    100: '#b71c1c',
  },

  green: <ColorTokenMoreGroup>{
    10: '#f1f8e9',
    20: '#dcedc8',
    30: '#c5e1a5',
    40: '#aed581',
    50: '#9ccc65',
    60: '#8bc34a',
    70: '#7cb342',
    80: '#689f38',
    90: '#558b2f',
    100: '#33691e',
  },

  lime: <ColorTokenMoreGroup>{
    10: '#f9fbe7',
    20: '#f0f4c3',
    30: '#e6ee9c',
    40: '#dce775',
    50: '#d4e157',
    60: '#cddc39',
    70: '#c0ca33',
    80: '#afb42b',
    90: '#9e9d24',
    100: '#827717',
  },

  indigo: <ColorTokenMoreGroup>{
    10: '#e8eaf6',
    20: '#c5cae9',
    30: '#9fa8da',
    40: '#7986cb',
    50: '#5c6bc0',
    60: '#3f51b5',
    70: '#3949ab',
    80: '#303f9f',
    90: '#283593',
    100: '#1a237e',
  },

  purple: <ColorTokenMoreGroup>{
    10: '#ede7f6',
    20: '#d1c4e9',
    30: '#b39ddb',
    40: '#9575cd',
    50: '#7e57c2',
    60: '#673ab7',
    70: '#5e35b1',
    80: '#512da8',
    90: '#4527a0',
    100: '#311b92',
  },

  teal: <ColorTokenMoreGroup>{
    10: '#e0f2f1',
    20: '#b2dfdb',
    30: '#80cbc4',
    40: '#4db6ac',
    50: '#26a69a',
    60: '#009688',
    70: '#00897b',
    80: '#00796b',
    90: '#00695c',
    100: '#004d40',
  },

  cyan: <ColorTokenMoreGroup>{
    10: '#e0f7fa',
    20: '#b2ebf2',
    30: '#80deea',
    40: '#4dd0e1',
    50: '#26c6da',
    60: '#00bcd4',
    70: '#00acc1',
    80: '#0097a7',
    90: '#00838f',
    100: '#006064',
  },

  bluegrey: <ColorTokenMoreGroup>{
    10: '#eceff1',
    20: '#cfd8dc',
    30: '#b0bec5',
    40: '#90a4ae',
    50: '#78909c',
    60: '#607d8b',
    70: '#546e7a',
    80: '#455a64',
    90: '#37474f',
    100: '#263238',
  },

  amber: <ColorTokenMoreGroup>{
    10: '#fff8e1',
    20: '#ffecb3',
    30: '#ffe082',
    40: '#ffd54f',
    50: '#ffca28',
    60: '#ffc107',
    70: '#ffb300',
    80: '#ffa000',
    90: '#ff8f00',
    100: '#ff6f00',
  },

  pink: <ColorTokenMoreGroup>{
    10: '#fce4ec',
    20: '#f8bbd0',
    30: '#f48fb1',
    40: '#f06292',
    50: '#ec407a',
    60: '#e91e63',
    70: '#d81b60',
    80: '#c2185b',
    90: '#ad1457',
    100: '#880e4f',
  },

  brown: <ColorTokenMoreGroup>{
    10: '#efebe9',
    20: '#d7ccc8',
    30: '#bcaaa4',
    40: '#a1887f',
    50: '#8d6e63',
    60: '#795548',
    70: '#6d4c41',
    80: '#5d4037',
    90: '#4e342e',
    100: '#3e2723',
  },

  yellow: <ColorTokenMoreGroup>{
    10: '#fffde7',
    20: '#fff9c4',
    30: '#fff59d',
    40: '#fff176',
    50: '#ffee58',
    60: '#ffeb3b',
    70: '#fdd835',
    80: '#fbc02d',
    90: '#f9a825',
    100: '#f57f17',
  },

  orange: <ColorTokenMoreGroup>{
    10: '#fbe9e7',
    20: '#ffccbc',
    30: '#ffab91',
    40: '#ff8a65',
    50: '#ff7043',
    60: '#ff5722',
    70: '#f4511e',
    80: '#e64a19',
    90: '#d84315',
    100: '#bf360c',
  },

  white: '#ffffff',
  focus: '#1565c0',

  [ColorTokenState.Success]: '#4caf50',
  [ColorTokenState.Error]: '#f44336',
  [ColorTokenState.Attention]: '#fdd835',

  additional,
  theme,
  ui,
} as const;
