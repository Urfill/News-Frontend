module.exports = {
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: {
    'global-require': 1,
    'import/no-extraneous-dependencies': 1,
    'no-unused-vars': 1,
  },
};
