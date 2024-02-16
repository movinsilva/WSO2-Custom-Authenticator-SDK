/**
 * Builds a request for authorization.
 *
 * @param {string} authorizeUri - The authorization endpoint URI.
 * @param {string} clientId - The client ID.
 * @param {string} scope - The requested scope.
 * @param {string} redirectUri - The redirect URI.
 * @returns {Request} - The authorization request.
 */
const authorizeRequestBuilder = (authorizeUri, clientId, scope, redirectUri) => {
  const formBody = new URLSearchParams();
  formBody.append('client_id', clientId);
  formBody.append('scope', scope);
  formBody.append('response_type', 'code');
  formBody.append('response_mode', 'direct');
  formBody.append('redirect_uri', redirectUri);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const requestOptions = {
    body: formBody.toString(),
    headers,
    method: 'POST',
  };

  console.log('\n\n AUTH', requestOptions, authorizeUri);
  return new Request(authorizeUri, requestOptions);
};

/**
 * Builds a request for authentication.
 *
 * @param {string} authnUri - The authentication endpoint URI.
 * @param {string} flowId - The flow ID.
 * @param {object} authenticatorType - The authenticator type.
 * @param {object} authenticatorAuthParams - The authenticator authentication parameters.
 * @returns {Request} - The authentication request.
 */
const authenticateRequestBuilder = (authnUri, flowId, authenticatorId, authenticatorAuthParams) => {
  const authBody = {
    flowId,
    selectedAuthenticator: {
      authenticatorId: authenticatorId,
      params: authenticatorAuthParams,
    },
  };

  const formBody = JSON.stringify(authBody);
  const headers = {
    'Content-Type': 'application/json',
  };

  const requestOptions = {
    body: formBody,
    headers,
    method: 'POST',
  };

  return new Request(authnUri, requestOptions);
};

const tokenRequestBuilder = (tokenUri, code, clientId, redirectUri) => {
  const formBody = new URLSearchParams();
  formBody.append('code', code);
  formBody.append('client_id', clientId);
  formBody.append('grant_type', 'authorization_code');
  formBody.append('redirect_uri', redirectUri);

  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  };

  const requestOptions = {
    body: formBody.toString(),
    headers,
    method: 'POST',
  };

  return new Request(tokenUri, requestOptions);

}

export { authenticateRequestBuilder, authorizeRequestBuilder, tokenRequestBuilder };
