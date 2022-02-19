module.exports = {
  ...require('eslint-config/nextjs'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
