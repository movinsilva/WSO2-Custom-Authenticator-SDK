import { AuthenticationCoreConfig } from '../core/authentication-core-config.js';
import { getAuthConfig } from '../data/config-data.js';
import dataLayer from '../data/data-layer.js';

/**
 * Fetches branding data from the specified URL.
 * @returns {Promise} A promise that resolves to the branding data.
 */

const branding = async (baseUrl) => {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(AuthenticationCoreConfig.getBrandingUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    const data = await response.json();
    return data;
  } catch (error) {
    // handle the error
    console.error(error);
  }
};

export default branding;
