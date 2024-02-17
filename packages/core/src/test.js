// THis is temporary file to test the build process

import { authConfig } from './data/config-data.js';
import { authenticate, authorize } from './core/authentication-core.js';
import branding from './branding/branding.js';

authConfig('https://localhost:9443', 'CtYxaqN68OXg0a1sWrLcfARALxIa', 'openid internal_login', 'http://localhost:5173/');

// eslint-disable-next-line no-unused-vars
const test = async () => {
  console.log('test');
  const resp = await authorize();
  console.log('authorize resp: ', resp);
  const response1 = await authenticate({
    password: 'admin',
    username: 'admin',
  });
  console.log('authenticate resp: ', response1);
};

const brandingTest = async () => {
  const data = await branding();
  console.log('branding data: ', data.preference.theme.DARK);
};

brandingTest();
