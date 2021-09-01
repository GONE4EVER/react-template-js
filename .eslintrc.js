const production = process.env.NODE_ENV === 'production';

const allowedToReassignParams = [
  'result', // reduce accumulator value
  'state', // react toolkit reducer
];

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true,
  },

  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 12,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },

  extends: [
    'plugin:react-hooks/recommended',
    'plugin:react/recommended',
    'plugin:jsx-a11y/recommended',
    'airbnb',
    'airbnb/hooks',
  ],
  plugins: [
    '@babel',
    'react',
    'import',
    'react-hooks',
    'jsx-a11y',
  ],

  settings: {
    'import/resolver': {
      // 'babel-module': {},
      node: {
        paths: [ 'src' ],
        extensions: [ '.js', '.jsx' ],
      },
    },
  },

  rules: {
    'array-bracket-spacing': [ 'error', 'always' ],
    'arrow-parens': [ 'error', 'as-needed' ],

    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'always-multiline',
      },
    ],
    'eol-last': [
      'error',
      'always',
    ],

    'import/extensions': [
      'error',
      'always',
      { js: 'never' },
    ],
    'import/newline-after-import': [
      2,
      { count: 1 },
    ],

    'import/order': [
      'error',
      {
        alphabetize: { order: 'asc' },
        'newlines-between': 'always',
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'index',
        ],
        pathGroups: [
          {
            pattern: '@/**',
            group: 'internal',
          },
          {
            pattern: '../**',
            group: 'parent',
          },
          {
            pattern: './**',
            group: 'index',
          },
        ],
      },
    ],
    indent: [ 'error', 2, { SwitchCase: 1 } ],
    'import/prefer-default-export': 0,

    'linebreak-style': [ 'error', 'unix' ],
    'max-len': [ 'error', { code: 100 } ],

    'newline-after-var': [ 'error', 'always' ],
    'newline-before-return': [ 'error' ],

    'no-console': production ? 'warn' : 'off',
    'no-debugger': production ? 'warn' : 'off',

    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: allowedToReassignParams,
      },
    ],

    'react/jsx-indent': [ 'error', 2 ],
    'react/jsx-indent-props': [ 'error', 2 ],
    'react/jsx-props-no-spreading': [ 1, { custom: 'ignore' } ],
    'react/jsx-filename-extension': [
      1,
      { extensions: [ '.js', '.jsx' ] },
    ],
    'react/jsx-fragments': [ 2, 'element' ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
  },
};
