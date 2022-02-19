module.exports = {
  env: {
    browser: true,
    node: true,
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:@next/next/recommended',
    'prettier',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  settings: {
    next: {
      rootDir: ['apps/web/*', 'packages/*/'],
    },
  },
  rules: {
    /* Prefer TypeScript */
    'react/require-default-props': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'react/jsx-no-undef': 0,
    'react/jsx-no-useless-fragment': [1, { allowExpressions: true }],

    /* Rules */
    'import/prefer-default-export': 0,
    'arrow-body-style': 0,
    'jsx-a11y/label-has-associated-control': [2, { assert: 'htmlFor' }],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],

    // react-hook-form requires prop spreading
    'react/jsx-props-no-spreading': [
      1,
      { custom: 'ignore', exceptions: ['input', 'select'] },
    ],

    /* NextJS */
    // next/link passes the href to the <a> tag
    // already has error if next/link is missing the href
    // be careful with <a> tags not wrapped in next/link
    'jsx-a11y/anchor-is-valid': [
      'error',
      {
        components: ['Link'],
        specialLink: ['hrefLeft', 'hrefRight'],
        aspects: ['invalidHref', 'preferButton'],
      },
    ],
  },
  ignorePatterns: [
    'node_modules',
    'public',
    'next-env.d.ts',
    'styles',
    '.next',
    '.turbo',
    '.eslintrc.js',
    'next.config.js',
  ],
};
