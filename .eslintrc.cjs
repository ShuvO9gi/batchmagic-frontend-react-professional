module.exports = {
  root: true,
  parser: '@babel/eslint-parser',
  parserOptions: {
    ecmaVersion: 2023,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    browser: true,
    es2023: true,
  },
  plugins: ['react', 'react-hooks'],
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    // suppress errors for missing 'import React' in files
    'react/react-in-jsx-scope': 'off',
    // allow jsx syntax in js files (for next.js project)
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }], //should add ".ts" if typescript project
    //eslint-disable-next-line react-hooks/exhaustive-deps
    'react-hooks/exhaustive-deps': 'off',
    //eslint-disable-next-line no-console
    'no-console': 'off',
  },
};
