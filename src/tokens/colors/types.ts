export enum ColorTokenState {
  Success = 'success',
  Attention = 'attention',
  Error = 'error',
}

export type ColorTokenWeight = 5 | 10 | 20 | 30 | 40 | 50 | 60 | 70 | 80 | 90 | 100;

export type ColorTokenValue = string;
export type ColorTokenGroup = Record<ColorTokenWeight, ColorTokenValue>;
export type ColorTokenMoreGroup = Record<Exclude<ColorTokenWeight, 5>, ColorTokenValue>;
