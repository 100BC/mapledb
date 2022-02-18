module.exports = {
  env: {
    node: true,
  },
  plugins: ['security', '@typescript-eslint'],
  extends: [
    'airbnb-base',
    'airbnb-typescript/base',
    'plugin:node/recommended',
    'plugin:security/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  settings: {
    next: {
      rootDir: ['apps/web/*', 'packages/*/'],
    },
  },
  rules: {
    // Prefers TypeScript
    'node/no-missing-import': 0,
    'node/no-unsupported-features/es-syntax': [
      'error',
      { ignores: ['modules'] },
    ],
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': 0,

    // Rules
    'arrow-body-style': 0,
    'import/prefer-default-export': 0,
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
  },
  ignorePatterns: [
    'node_modules',
    '.turbo',
    'dist',
    'coverage',
    '.eslintrc.js',
  ],
};
