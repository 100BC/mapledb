module.exports = {
  ...require('@mooseical/eslint-config/node'),
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
