/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: '@repo/eslint-config/next',
  parserOptions: {
    project: true
  },
  ignorePatterns: ['tailwind.config.js'],
};
