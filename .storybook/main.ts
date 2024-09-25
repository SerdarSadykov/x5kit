import type {StorybookConfig} from '@storybook/react-webpack5';

const path = require('path');

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],

  addons: [
    '@storybook/addon-webpack5-compiler-swc',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
  ],

  framework: {
    name: '@storybook/react-webpack5',
    options: {
      builder: {
        useSWC: true,
      },
    },
  },

  typescript: {
    reactDocgen: 'react-docgen',
    check: false,
  },

  swc: () => ({
    jsc: {
      transform: {
        react: {
          runtime: 'automatic',
        },
      },
    },
  }),

  webpackFinal: async config => {
    config.resolve ??= {};
    config.resolve.modules ??= [];

    config.resolve.modules.push(path.resolve(__dirname, '../src'));

    return config;
  },
};
export default config;
