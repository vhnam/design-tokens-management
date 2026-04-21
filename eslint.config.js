//  @ts-check

import { tanstackConfig } from '@tanstack/eslint-config';
import tanstackQueryPlugin from '@tanstack/eslint-plugin-query';

export default [
  ...tanstackConfig,
  ...tanstackQueryPlugin.configs['flat/recommended'],
  {
    rules: {
      'import/no-cycle': 'off',
      'import/order': 'off',
      'sort-imports': 'off',
      '@typescript-eslint/array-type': 'off',
      '@typescript-eslint/require-await': 'off',
      'pnpm/json-enforce-catalog': 'off',
    },
  },
  {
    ignores: ['eslint.config.js', 'prettier.config.js'],
  },
];
