import { getAuthInstance } from '../../asgardeo-auth-js';
import { getMeUrl } from '../../utils/url-generator';

/**
 * Builds a request object for the "me" API endpoint.
 * @param {string} meUrl - The URL of the "me" API endpoint.
 * @returns {Request} - The request object.
 */
const meRequestBuilder = async (meUrl) => {
  const accessToken = await getAuthInstance().getAccessToken();

  if (!accessToken) {
    throw new Error('Access token is null');
  }

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    'Content-Type': 'application/json',
  };

  const requestOptions = {
    headers,
    method: 'GET',
  };

  return new Request(meUrl, requestOptions);
};

/**
 * Retrieves user information from the "me" API endpoint.
 * @param {string} baseUrl - The base URL of the API.
 * @returns {Promise<Object>} - A promise that resolves to the user information.
 * @throws {Error} - If the "me" request fails.
 */
const me = async (baseUrl) => {
  try {
    const request = await meRequestBuilder(getMeUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(request);
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }
    throw new Error('Me request failed');
  } catch (error) {
    // handle the error
    throw new Error(`Me request failed: ${error}`);
  }
};

export default me;
