import { authorizeRequestBuilder, authenticateRequestBuilder, tokenRequestBuilder } from './authentication-core-request-builder.js';
import { getAuthorizeUrl, getAuthnUrl, getTokenUrl } from '../utils/url-generator.js';

/**
 * Authorizes the user with the provided base URL, client ID, scope, and redirect URI.
 * @param {string} baseUrl - The base URL for authorization.
 * @param {string} clientId - The client ID for authorization.
 * @param {string} scope - The scope for authorization.
 * @param {string} redirectUri - The redirect URI for authorization.
 * @returns {Promise<object>} A promise that resolves to the response from the server as an object.
 */
export const authorize = async (baseUrl, clientId, scope, redirectUri) => {
  try {
    const request = authorizeRequestBuilder(
      getAuthorizeUrl(baseUrl),
      clientId,
      scope,
      redirectUri,
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
    throw new Error('Authorization failed');
  } catch (error) {
    // exception to be implemented
    throw new Error('Authorization failed');
  }
};

/**
 * Authenticates the user with the provided flow ID, authenticator type ID, and parameters.
 * @param {string} baseUrl - The base URL of the authentication server.
 * @param {string} flowId - The ID of the authentication flow.
 * @param {string} authenticatorId - The ID of the authenticator.
 * @param {object} authenticatorParameters - The parameters for the authenticator.
 * @returns {Promise<object>} A promise that resolves with the response object from server.
 */
export const authenticate = async (baseUrl, flowId, authenticatorId, authenticatorParameters) => {
  try {
    const request = authenticateRequestBuilder(
      getAuthnUrl(baseUrl),
      flowId,
      authenticatorId,
      authenticatorParameters,
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
    throw new Error('Authentication failed');
  } catch (error) {
    // exception to be implemented
    throw new Error('Authentication failed');
  }
};

/**
 * Gets an access token by passing the code with client ID and redirect URL.
 * @param {string} baseUrl - The base URL of the authentication server.
 * @param {string} code - The authorization code received from the authentication server.
 * @param {string} clientId - The client ID of the application.
 * @param {string} redirectUri - The URI to redirect to after successful login.
 * @returns {Promise<object|undefined>} A promise that resolves with the response object from the
 * authentication server, or undefined if the response is not successful or an error occurs.
 */
export const getAccessToken = async (baseUrl, code, clientId, redirectUrl) => {
  try {
    const request = tokenRequestBuilder(
      getTokenUrl(baseUrl),
      code,
      clientId,
      redirectUrl,
    );

    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);

    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }
    throw new Error('Token request failed');
  } catch (error) {
    throw new Error('Token request failed');
  }
};
