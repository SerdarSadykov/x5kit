import {addons} from '@storybook/manager-api';
import {create} from '@storybook/theming';

const theme = create({
  base: 'dark',
  brandTitle: 'X5 JOIN',
  brandUrl: 'https://x5-tech.ru/',
  brandImage: 'https://www.x5.ru/wp-content/themes/x5/assets/img/logo.svg',
  brandTarget: '_blank',
});

addons.setConfig({theme});