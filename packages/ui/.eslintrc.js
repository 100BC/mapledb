module.exports = {
  ...require('config-eslint/nextjs'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
