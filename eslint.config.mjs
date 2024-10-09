import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginImport from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import pluginReact from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  {
    ignores: ['dist/*', 'vite.config.mjs', 'eslint.config.mjs', 'test-setup.js'],
  },
  {
    languageOptions: {
      parserOptions: {
        ecmaVersion: 6,
        project: 'tsconfig.json',
        ecmaFeatures: {
          jsx: true,
        },
      }
    }
  },

  pluginJs.configs.recommended,

  ...tseslint.configs.recommended,

  pluginImport.flatConfigs.recommended,

  eslintPluginPrettierRecommended,

  pluginReact.configs.flat.recommended,
  pluginReact.configs.flat['jsx-runtime'],

  {
    plugins: {
      'react-hooks': reactHooks,
    },

    'rules': {
      ...reactHooks.configs.recommended.rules,

      'react/react-in-jsx-scope': 'off',
      'react/jsx-curly-newline': 'off',
      'react/display-name': 'off',
      'react/prop-types': 'off',
      'react/jsx-props-no-spreading': 'off',
      'react/no-unescaped-entities': ['error', {'forbid': ['>', '}']}],

      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/quotes': [
        'error',
        'single',
        {
          'avoidEscape': true,
          'allowTemplateLiterals': true
        }
      ],

      'no-console': 'error',

      'import/no-nodejs-modules': 'error',
      'import/newline-after-import': 'error',
      'import/no-default-export': 'error',
      'import/no-duplicates': 'error',
      'import/order': [
        'warn',
        {
          'groups': ['builtin', 'external', 'internal', 'parent', 'sibling', 'index', 'type'],
          'newlines-between': 'always-and-inside-groups'
        }
      ]
    },
    'settings': {
      'import/resolver': {
        'typescript': {
          'project': 'tsconfig.json',
        },
        'node': {
          'project': 'tsconfig.json',
        },
      },
      'react': {
        'version': 'detect',
      },
    },
  },
];