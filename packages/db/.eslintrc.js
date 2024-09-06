/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/library'],
  parserOptions: {
    project: true
  }
};
