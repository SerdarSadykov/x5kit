import React from 'react';
import type {Preview} from '@storybook/react';

import {ThemeProvider} from 'themeProvider';

const preview: Preview = {
  decorators: [
    Story => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
  tags: ['autodocs'],
};

export default preview;
