module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: { browser: true, es2020: true },
  plugins: ['@typescript-eslint', 'react-refresh'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb/hooks',
    'airbnb-typescript',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
  },
  ignorePatterns: ['dist', '.eslintrc.cjs', '*.config.*'],
  rules: {
    '@typescript-eslint/no-unused-vars': 'warn',
    'prettier/prettier': 'off',
    'no-console': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/require-default-props': 'off',
    'react-refresh/only-export-components': [
      'warn',
      { allowConstantExport: true },
    ],
    'react/function-component-definition': [
      2,
      { namedComponents: 'arrow-function' },
    ],
    'import/prefer-default-export': 'off',
  },
};
