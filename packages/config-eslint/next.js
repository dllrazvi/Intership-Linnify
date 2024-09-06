const { resolve } = require('node:path');

const project = resolve(process.cwd(), 'tsconfig.json');

/** @type {import("eslint").Linter.Config} */
module.exports = {
  plugins: ['@tanstack/query'],
  extends: ['next', 'prettier', 'plugin:@tanstack/eslint-plugin-query/recommended'],
  parser: '@typescript-eslint/parser',
  globals: {
    React: true,
    JSX: true
  },
  settings: {
    'import/resolver': {
      /* Allow ESLint to resolve paths based on the tsconfig.json */
      typescript: {
        project // Looks for tsconfig.json by default
      }
    }
  },
  rules: {
    '@tanstack/query/exhaustive-deps': 'off'
  }
};
