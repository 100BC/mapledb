module.exports = {
  ...require('@mooseical/eslint-config/nextjs'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
