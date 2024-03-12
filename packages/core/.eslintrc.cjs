const path = require('path');

module.exports = {
  plugins: ['@wso2'],
  extends: [
    'plugin:@wso2/typescript',
    'plugin:@wso2/strict',
    'plugin:@wso2/internal',
  ],
  parserOptions: {
    project: [path.resolve(__dirname, 'tsconfig.eslint.json')],
  },
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
  