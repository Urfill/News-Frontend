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
    'no-multiple-empty-lines': 0,
    'no-plusplus': 0,
    'prefer-promise-reject-errors': 1,
    'class-methods-use-this': 0,
    'import/no-cycle': 1,
    'no-underscore-dangle': 0,
    'max-len': 0,
    'no-param-reassign': 1,
  },
};
