module.exports = {
  extends: '@mooseical/eslint-config/node',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
