import {SizeTokenValue} from 'tokens/sizes';

const small = '0px 0px 8px rgba(80, 86, 94, 0.08), 0px 1px 2px rgba(80, 86, 94, 0.32)';
const medium =
  '0px 6px 10px rgba(80, 86, 94, 0.02), 0px 2px 18px rgba(80, 86, 94, 0.12), 0px 4px 5px rgba(80, 86, 94, 0.12)';
const large =
  '0px 24px 38px rgba(80, 86, 94, 0.04), 0px 9px 46px rgba(80, 86, 94, 0.04), 0px 11px 15px rgba(80, 86, 94, 0.1)';

export const shadows: Record<SizeTokenValue, string> = {
  [SizeTokenValue.Small]: small,
  [SizeTokenValue.Medium]: medium,
  [SizeTokenValue.Large]: large,
} as const;
