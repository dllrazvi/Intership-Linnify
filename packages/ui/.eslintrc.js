/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@repo/eslint-config/react'],
  parserOptions: {
    project: true
  },
  env: {
    browser: true,
    node: false
  }
};
