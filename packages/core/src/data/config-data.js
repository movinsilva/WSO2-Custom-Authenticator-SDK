import { AuthenticationCoreConfig } from '../core/authentication-core-config.js';
import dataLayer from './data-layer.js';

const authConfig = (baseUrl, clientId, scope, redirectUri) => {
  const config = new AuthenticationCoreConfig(baseUrl, clientId, scope, redirectUri);
  dataLayer.set('authConfig', config);
};

export default authConfig;