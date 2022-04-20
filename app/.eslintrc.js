module.exports = {
  root: true,
  // parserOptions: {
  //   parser: 'babel-eslint',
  //   ecmaVersion: 2016,
  //   sourceType: 'module',
  // },
  env: {
    browser: true,
    node: true,
  },
  extends: ['plugin:vue/strongly-recommended', 'plugin:prettier/recommended'],
  globals: {
    __static: true,
  },
  plugins: ['vue', 'prettier'],
  rules: {
    // 'prettier/prettier': 2,
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true,
      },
    ],
    semi: 0,
    // end comma in array
    'comma-dangle': 0,
    // allow paren-less arrow functions
    'arrow-parens': 0,
    // allow async-await
    'generator-star-spacing': 0,
    // allow debugger during development
    'no-console': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': 0,
    // 'space-before-function-paren': 'off',
    // vue rules
    'vue/html-closing-bracket-newline': [
      'error',
      {
        singleline: 'never',
        multiline: 'always',
      },
    ],
    'vue/html-closing-bracket-spacing': [
      'error',
      {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'always',
      },
    ],
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always',
          normal: 'never',
          component: 'never',
        },
        svg: 'always',
        math: 'always',
      },
    ],
    'vue/max-attributes-per-line': [
      'off',
      {
        singleline: 1,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': [
      'off',
      {
        ignores: ['pre', 'textarea'],
      },
    ],
    'vue/name-property-casing': ['error', 'kebab-case'],
    'vue/component-name-in-template-casing': ['error', 'kebab-case'],
    'vue/html-indent': [
      'error',
      2,
      {
        attribute: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      },
    ],
    'vue/v-bind-style': ['error', 'shorthand'],
    'vue/attribute-hyphenation': [
      'error',
      'always',
      {
        ignore: [],
      },
    ],
  },
};

// module.exports = {
//   root: true,
//   env: {
//     node: true,
//   },
//   extends: [
//     'plugin:vue/essential',
//     '@vue/airbnb',
//   ],
//   parserOptions: {
//     parser: '@babel/eslint-parser',
//   },
//   rules: {
//     'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
//     'vue/no-v-model-argument': 'off',
//     'linebreak-style': 0
//   },
//   overrides: [
//     {
//       files: [
//         '**/__tests__/*.{j,t}s?(x)',
//         '**/tests/unit/**/*.spec.{j,t}s?(x)',
//       ],
//       env: {
//         jest: true,
//       },

//     },
//   ],
// };
