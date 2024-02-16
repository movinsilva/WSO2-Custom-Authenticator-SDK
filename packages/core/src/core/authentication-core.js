import { authorizeRequestBuilder, authenticateRequestBuilder, tokenRequestBuilder } from './authentication-core-request-builder.js';
import dataLayer from '../data/data-layer.js';
import { flowConfig } from '../data/config-data.js';

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
   // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

    const response = await fetch(request);

    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    console.log('response obj frm core: ', response);
    if (response.ok) {
      const responseObject = await response.json();
      flowConfig(responseObject.flowId, responseObject.nextStep.authenticators);
      return responseObject;
    }
    console.log(response.ok, 'response obj frm core: ', response);
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
const authenticate = async (authenticatorParameters) => {
  console.log("\ndataLayer.get('flowConfig').nextStep.authenticators,: " , dataLayer.get('flowConfig').authenticatorType[0].authenticatorId,)
  try {
    const request = authenticateRequestBuilder(
      dataLayer.get('authConfig').getAuthnUrl(),
      dataLayer.get('flowConfig').flowId,
      dataLayer.get('flowConfig').authenticatorType[0].authenticatorId,
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
      return responseObject;
    }

    console.log('response failed', await response.json());
    // exception to be implemented
  } catch (error) {
    // exception to be implemented
    console.error(error);
  }
};

const getAccessToken = async (code) => {
  try {
    const request = tokenRequestBuilder(
      code,
      dataLayer.get('authConfig').getClientId(),
      dataLayer.get('authConfig').getRedirectUri()
    )

    // Disable certificate verification for the duration of this request
    //process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);

    if(response.ok) {
      const responseObject = await response.json();
      console.log('data', responseObject);
      return responseObject;
    
    }
    console.log('response failed', await response.json());

  } catch (error) {
    console.error(error);
  }
}

export { authorize, authenticate };
