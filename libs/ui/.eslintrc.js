module.exports = {
  extends: '@mooseical/eslint-config/nextjs',
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: './tsconfig.json',
  },
};
