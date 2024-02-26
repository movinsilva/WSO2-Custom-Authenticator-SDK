import { authorizeRequestBuilder, authenticateRequestBuilder, tokenRequestBuilder } from './authentication-core-request-builder.js';
import dataLayer from '../data/data-layer.js';
import { flowConfig, getAuthConfig } from '../data/config-data.js';
import { AuthenticationCoreConfig } from './authentication-core-config.js';

/**
 * Authorizes the request by sending an authorization request to the server.
 * @returns {Promise<string>} A promise that resolves to the response from the server as a string.
 */
const authorize = async (baseUrl, clientId, scope, redirectUri) => {
  try {
    const request = authorizeRequestBuilder(
      AuthenticationCoreConfig.getAuthorizeUrl(baseUrl),
      clientId,
      scope,
      redirectUri
    );

    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(request);

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }
    // exception to be implemented
  } catch (error) {
    // exception to be implemented
    console.error(error);
  }
};

/**
 * Authenticates the user with the provided flow ID, authenticator type, and parameters.
 * @param {string} flowId - The flow ID for authentication.
 * @param {string} authenticatorType - The type of authenticator to be used for authentication.
 * @param {object} authenticatorParameters - The parameters required for authentication.
 * @returns {Promise<string>} A promise that resolves to the response from the server as a string.
 */
const authenticate = async (baseUrl, flowId, authenticatorId, authenticatorParameters) => {
  try {
    const request = authenticateRequestBuilder(
      AuthenticationCoreConfig.getAuthnUrl(baseUrl),
      flowId,
      authenticatorId,
      authenticatorParameters,
    );
    console.log('auth request', request);

    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }

    // exception to be implemented
  } catch (error) {
    // exception to be implemented
    console.error(error);
  }
};

const getAccessToken = async (baseUrl, code, clientId, redirectUri) => {

  console.log('getAccessToken',baseUrl, code, clientId, redirectUri);
  try {
    const request = tokenRequestBuilder(
      AuthenticationCoreConfig.getTokenUrl(baseUrl),
      code,
      clientId,
      redirectUri
    );

    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);

    if (response.ok) {
      const responseObject = await response.json();
      console.log('token data: ', responseObject);
      return responseObject;
    }
    console.log('response failed', await response.json());
  } catch (error) {
    console.error(error);
  }
};

export { authorize, authenticate, getAccessToken };
