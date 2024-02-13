import { authorizeRequestBuilder, authenticateRequestBuilder } from './authentication-core-request-builder.js';
import dataLayer from '../data/data-layer.js';

/**
 * Authorizes the request by sending an authorization request to the server.
 * @returns {Promise<string>} A promise that resolves to the response from the server as a string.
 */
const authorize = async () => {
  try {
    const request = authorizeRequestBuilder(
      dataLayer.get('authConfig').getAuthorizeUrl(),
      dataLayer.get('authConfig').getClientId(),
      dataLayer.get('authConfig').getScope(),
      dataLayer.get('authConfig').getRedirectUri(),
    );

    // Disable certificate verification for the duration of this request
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(request);

   process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      const responseObject = await response.json();
      return responseObject.toString();
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
const authenticate = async (flowId, authenticatorType, authenticatorParameters) => {
  try {
    const request = authenticateRequestBuilder(
      dataLayer.get('authConfig').getAuthnUrl(),
      flowId,
      authenticatorType,
      authenticatorParameters,
    );
      console.log('auth request', request);

    // Disable certificate verification for the duration of this request
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);

    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    console.log('auth response', response);

    if (response.ok) {
      const responseObject = await response.json();
      console.log('response obj: ', responseObject);
      return responseObject.toString();
    }

    console.log('response failed', await response.json());
    // exception to be implemented
  } catch (error) {
    // exception to be implemented
    console.error(error);
  }
};

export { authorize, authenticate };
