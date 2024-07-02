import {withThemeFromJSXProvider} from '@storybook/addon-themes';
import type {Preview} from '@storybook/react';

import {ThemeProvider} from 'theme';

const preview: Preview = {
  decorators: [
    withThemeFromJSXProvider({
      Provider: ThemeProvider,
    }),
  ],
};

export default preview;
