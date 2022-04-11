module.exports = {
  extends: '@mapledb/eslint-config/nextjs',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
  rules: {
    'no-html-link-for-pages': 0,
  },
};
