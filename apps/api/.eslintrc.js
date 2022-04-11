module.exports = {
  extends: '@mapledb/eslint-config/node',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
