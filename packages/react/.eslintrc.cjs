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
    'plugin:react/jsx-runtime',
  ],
  parserOptions: {
    project: [
      path.resolve(__dirname, 'tsconfig.lib.json'),
      path.resolve(__dirname, 'tsconfig.spec.json'),
      path.resolve(__dirname, 'tsconfig.eslint.json'),
    ],
  },
  // TODO
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
};
