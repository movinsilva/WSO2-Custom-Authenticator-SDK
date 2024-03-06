module.exports = {
    plugins: ['@brionmario'],
    extends: ['plugin:@brionmario/javascript'],
    rules: {
      'import/extensions': 'off',
      'max-len': ['error', {
        code: 120,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
     }],
  },
  };
  