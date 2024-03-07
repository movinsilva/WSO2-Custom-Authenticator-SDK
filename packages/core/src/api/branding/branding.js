import { getBrandingUrl } from '../../utils/url-generator.js';

/**
 * Fetch branding information from the authentication server.
 *
 * @param {string} baseUrl - The base URL of the authentication server.
 * @returns {Promise<object|undefined>} A promise that resolves with the
 * response object from the authentication server, or an error occurs if
 * the response is not successful.
 */
export const branding = async (baseUrl) => {
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

/**
 * Build a request object for fetching branding text from the authentication server.
 *
 * @param {string} baseUrl - The base URL of the authentication server.
 * @param {string} locale - The locale of the branding text.
 * @param {string} name - The name of the branding text.
 * @param {string} screen - The screen of the branding text.
 * @param {string} type - The type of the branding text.
 * @returns {Request} The request object for fetching branding text.
 */
const brandingTextRequestBuilder = async (baseUrl, locale, name, screen, type) => {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  const requestOptions = {
    headers,
    method: 'GET',
  };

  const params = new URLSearchParams();
  params.append('locale', locale);
  params.append('name', name);
  params.append('screen', screen);
  params.append('type', type);

  const urlWithParams = `${baseUrl}?${params.toString()}`;

  return new Request(urlWithParams, requestOptions);
};

/**
 * Fetch branding text from the authentication server.
 *
 * @param {string} baseUrl - The base URL of the authentication server.
 * @param {string} locale - The locale of the branding text.
 * @param {string} name - The name of the branding text.
 * @param {string} screen - The screen of the branding text.
 * @param {string} type - The type of the branding text.
 * @returns {Promise<object|undefined>} A promise that resolves with the
 * response object from the authentication server, or an error occurs if
 * the response is not successful.
 */
export const brandingText = async (baseUrl, locale, name, screen, type) => {
  const request = brandingTextRequestBuilder(baseUrl, locale, name, screen, type);
  try {
    const response = await fetch(request);
    if (response.ok) {
      const responseObject = await response.json();
      return responseObject;
    }
    throw new Error('Branding Text request failed');
  } catch (error) {
    // handle the error
    throw new Error('Branding Text request failed');
  }
};
