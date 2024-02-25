import { AuthenticationCoreConfig } from '../core/authentication-core-config.js';
import dataLayer from './data-layer.js';

/**
 * Sets the authentication configuration.
 * @param {string} baseUrl - The base URL of the authentication server.
 * @param {string} clientId - The client ID for authentication.
 * @param {string} scope - The scope of the authentication.
 * @param {string} redirectUri - The redirect URI for authentication.
 */
const setAuthConfig = (baseUrl, clientId, scope, redirectUri) => {
  const config = new AuthenticationCoreConfig(baseUrl, clientId, scope, redirectUri);
  dataLayer.set('authConfig', config);
};

const getAuthConfig = () => {
  const {
    baseUrl, clientId, scope, redirectUri,
  } = dataLayer.get('authConfig');
  return new AuthenticationCoreConfig(baseUrl, clientId, scope, redirectUri);
};

const flowConfig = (flowId, authenticatorType) => {
  const config = {
    authenticatorType,
    flowId,
  };
  dataLayer.set('flowConfig', config);
};

const setAuthState = (state) => {
  dataLayer.set('authState', state);
};

const getAuthState = () => dataLayer.get('authState');

export {
  setAuthConfig, getAuthConfig, flowConfig, setAuthState, getAuthState,
};
