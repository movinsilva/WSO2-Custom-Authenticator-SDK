module.exports = {
  plugins: ['@brionmario'],
  extends: ['plugin:@brionmario/typescript', 'plugin:@brionmario/react'],
  rules: {
    'max-len': ['error', {
      code: 120,
      ignoreUrls: true,
      ignoreStrings: true,
      ignoreTemplateLiterals: true,
      ignoreRegExpLiterals: true,
    }],
  }
};
