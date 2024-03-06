import { getBrandingUrl } from '../../utils/url-generator.js';

/**
 * Fetch branding information from the authentication server.
 *
 * @param {string} baseUrl - The base URL of the authentication server.
 * @returns {Promise<object|undefined>} A promise that resolves with the
 * response object from the authentication server, or an error occurs if
 * the response is not successful.
 */
const branding = async (baseUrl) => {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(getBrandingUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }
    throw new Error('Branding request failed');
  } catch (error) {
    // handle the error
    throw new Error('Branding request failed');
  }
};

export default branding;
