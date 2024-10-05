import {mergeConfig} from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';

import type {StorybookConfig} from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.tsx'],

  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@storybook/manager-api',
    '@storybook/theming',
  ],

  framework: '@storybook/react-vite',

  typescript: {
    reactDocgen: 'react-docgen-typescript',
    check: true,
  },

  viteFinal: config => mergeConfig(config, {plugins: [tsconfigPaths()]}),
};

export default config;
