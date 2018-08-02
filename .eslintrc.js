module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  plugins: [
    'prettier',
    'ember'
  ],
  extends: [
    'eslint:recommended',
    'plugin:ember/recommended',
    'prettier',
  ],
  env: {
    browser: true
  },
  rules: {
    'prettier/prettier': [
      'error',
      { trailingComma: 'es5' },
    ]
  },
  overrides: [
    // node files
    {
      files: [
        'ember-cli-build.js',
        'testem.js',
        'blueprints/*/index.js',
        'config/**/*.js',
        'lib/*/index.js'
      ],
      parserOptions: {
        sourceType: 'script',
        ecmaVersion: 2015
      },
      env: {
        browser: false,
        node: true
      }
    }
  ]
};
