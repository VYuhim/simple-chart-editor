module.exports = {
  globals: {
    process: true,
  },
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  parser: '@typescript-eslint/parser', // Specifies the ESLint parser
  extends: [
    'eslint:recommended',
    'plugin:sonarjs/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended', // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:react/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    // 'plugin:react-hooks/recommended',
    'plugin:prettier/recommended',
  ],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: '.',
    extraFileExtensions: '.json',
    ecmaVersion: 2019, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  plugins: ['react', 'react-hooks', 'sonarjs', '@typescript-eslint'],
  rules: {
    'prettier/prettier': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/camelcase': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-ignore': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/prefer-function-type': 'error',
    '@typescript-eslint/interface-name-prefix': 'off',

    'react/display-name': 'off',
    'import/no-unresolved': 'off',
    'import/order': [
      'warn',
      {
        'newlines-between': 'always',
      },
    ],
    'import/first': 1,
    'import/no-duplicates': 2,
    'import/newline-after-import': 1,
    'no-multiple-empty-lines': ['error', { max: 2, maxBOF: 1 }],
    'padding-line-between-statements': [
      'error',
      { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
      { blankLine: 'always', prev: '*', next: ['const', 'let', 'var'] },
      { blankLine: 'any', prev: ['const', 'let', 'var'], next: ['const', 'let', 'var'] },
      { blankLine: 'always', prev: 'directive', next: '*' },
      { blankLine: 'any', prev: 'directive', next: 'directive' },
      { blankLine: 'always', prev: '*', next: 'if' },
    ],
    'sonarjs/no-duplicate-string': 'off',
    // 'no-shadow': ['error', { builtinGlobals: true }], // TODO enable and fix problems
    curly: ['error', 'all'],
    'no-alert': 'warn',
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    'no-implicit-coercion': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-useless-concat': 'error',
    'no-useless-return': 'error',
    'prefer-arrow-callback': 'error',

    'react/jsx-filename-extension': ['error', { extensions: ['.tsx'] }],
    'react/jsx-no-useless-fragment': 'error',
    'react/jsx-pascal-case': 'error',
  },

  ignorePatterns: ['*.mocks.ts'],
  settings: {
    react: {
      version: 'detect', // Tells eslint-plugin-react to automatically detect the version of React to use
    },
  },
};
