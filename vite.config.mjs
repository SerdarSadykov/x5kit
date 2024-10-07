import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {globSync} from 'glob';
import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import dts from 'vite-plugin-dts';

const input = globSync(['src/**/index.{ts,tsx}'], {maxDepth: 3}).reduce((acc, file) => {
  const entryName = file.slice(4, file.length - path.extname(file).length);

  acc[entryName] = fileURLToPath(new URL(file, import.meta.url));

  return acc;
}, {});

export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    dts({exclude: ['**/*.stories.tsx', '**/*.spec.{ts,tsx}']}),
  ],
  build: {
    // lib mode inlines assets https://github.com/vitejs/vite/issues/4454
    // lib: {
    //   entry: 'src/index.ts',
    //   formats: ['es', 'cjs],
    // },

    rollupOptions: {
      input,

      external: [
        'react',
        'react-dom',
        'react/jsx-runtime',
        '@emotion/react',
        '@emotion/styled',
        '@floating-ui/react',
        'date-fns',
        'notistack',
        'react-window',
      ],
      output: {
        entryFileNames: '[name].js',
        assetFileNames: 'assets/[name][extname]',
        globals: {
          'react': 'react',
          'react-dom': 'react-dom',
          'react/jsx-runtime': 'react/jsx-runtime',
          '@emotion/react': '@emotion/react',
          '@emotion/styled': '@emotion/styled',
          '@floating-ui/react': '@floating-ui/react',
          'date-fns': 'date-fns',
          'notistack': 'notistack',
          'react-window': 'react-window',
        },
      },
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
    dir: 'src',
    exclude: ['**/*.stories.tsx'],
    coverage: {
      provider: 'v8',
      exclude: ['**/*.stories.tsx'],
    },
  },
});
