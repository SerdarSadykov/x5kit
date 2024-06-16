import {withThemeFromJSXProvider} from '@storybook/addon-themes';
import type {Preview} from '@storybook/react';

import {ThemeProvider} from 'theme';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
    }),
  ],
};

export default preview;
