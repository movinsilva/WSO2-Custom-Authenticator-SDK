// THis is temporary file to test the build process

import authConfig from './data/config-data.js';
import { authenticate } from './core/authentication-core.js';

authConfig('https://localhost:9443', 'CtYxaqN68OXg0a1sWrLcfARALxIa', 'openid internal_login', 'http://localhost:8080');

const test = async () => {
  console.log('test');
  const response1 = await authenticate('908b60c9-fe96-419a-82b2-0323a98baada', { authenticatorId: 'QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM' }, {
    username: 'admin',
    password: 'admin1',
  });
  console.log(response1);
};

test();
