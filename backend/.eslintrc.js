module.exports = {
  root: true,
  extends: ['noftalint/typescript'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  ignorePatterns: ['node_modules/', 'dist/'],
  reportUnusedDisableDirectives: true,
  parserOptions: {
    project: './tsconfig.eslint.json',
  },
  rules: {
    'no-irregular-whitespace': ['error', {
      skipStrings: true,
      skipTemplates: true,
    }],
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  overrides: [],
  globals: {
    PromiseRejectedResult: 'readonly',
    PromiseSettledResult: 'readonly',
    PromiseFulfilledResult: 'readonly',
  },
};
