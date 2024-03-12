const path = require('path');

module.exports = {
  plugins: ['@wso2'],
  extends: [
    'plugin:@wso2/typescript',
    'plugin:@wso2/react',
    'plugin:@wso2/strict',
    'plugin:@wso2/internal',
    'plugin:@wso2/jest',
    'plugin:@wso2/prettier',
    'plugin:mdx/recommended',
    'plugin:react/jsx-runtime'
  ],
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
}
