import type {Meta} from '@storybook/react';

import {colors} from '.';

export const Colors = () => {
  const digit = /\d/;

  const renderItem = (name: string, value) => {
    if (typeof value === 'object') {
      return Object.entries(value).flatMap(([key, value]) =>
        renderItem(digit.test(key) ? `${name}[${key}]` : `${name}.${key}`, value)
      );
    }

    return (
      <div key={`${name}`} style={{marginBottom: 10}}>
        <div style={{color: value, marginBottom: 10}}>
          <h2>
            {name} [{value}]
          </h2>
          Сайт рыбатекст поможет дизайнеру, верстальщику, вебмастеру сгенерировать несколько абзацев более менее
          осмысленного текста рыбы на русском языке, а начинающему оратору отточить навык публичных выступлений в
          домашних условиях
        </div>
        <div style={{height: 20, backgroundColor: value}}></div>
      </div>
    );
  };

  return (
    <div style={{width: 600}}>
      {Object.entries(colors).flatMap(([key, value]) => renderItem(`colors.${key}`, value))}
    </div>
  );
};

const meta = {
  title: 'Colors',
  component: Colors,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<typeof Colors>;

export default meta;
