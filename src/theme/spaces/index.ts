export type SpaceTokenValue = number;

export enum SpaceTokenName {
  x0 = 'x0',
  x1 = 'x1',
  x2 = 'x2',
  x3 = 'x3',
  x4 = 'x4',
  x5 = 'x5',
  x6 = 'x6',
  x8 = 'x8',
  x10 = 'x10',
  x12 = 'x12',
  x16 = 'x16',
  x20 = 'x20',
}

export type SpaceJoinArgs = SpaceTokenName[];

export type SpaceTokenRecord = {
  join: (...args: SpaceJoinArgs) => string;
} & Record<SpaceTokenName, SpaceTokenValue>;

export const spaces: SpaceTokenRecord = {
  [SpaceTokenName.x0]: 0,
  [SpaceTokenName.x1]: 2,
  [SpaceTokenName.x2]: 4,
  [SpaceTokenName.x3]: 6,
  [SpaceTokenName.x4]: 8,
  [SpaceTokenName.x5]: 10,
  [SpaceTokenName.x6]: 12,
  [SpaceTokenName.x8]: 16,
  [SpaceTokenName.x10]: 20,
  [SpaceTokenName.x12]: 24,
  [SpaceTokenName.x16]: 32,
  [SpaceTokenName.x20]: 40,

  join: (...args) => args.map(key => `${spaces[key]}px`).join(' '),
};
