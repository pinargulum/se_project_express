module.exports = {
  env: {
    es2021: true,
    node: true
  },

  // Add the necessary extensions.
  extends: [
    'eslint:recommended',
    'airbnb-base',
    'prettier',
    'plugin:node/recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,,cjs}'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'no-console': 'off',
    'no-unused-vars': ['warn', { argsIgnorePattern: 'reg|res|next' }],
    'node/no-unpublishhed-require': 'off',
    'node/no-missing-import': 'off',
    'no-underscore-dangle': ['error', { allow: ['_id'] }]
  }
}
