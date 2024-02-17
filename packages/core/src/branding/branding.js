import dataLayer from '../data/data-layer.js';

/**
 * Fetches branding data from the specified URL.
 * @returns {Promise} A promise that resolves to the branding data.
 */

const branding = async () => {
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response = await fetch(dataLayer.get('authConfig').getBrandingUrl());
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    const data = await response.json();
    return data;
  } catch (error) {
    // handle the error
    console.error(error);
  }
};

export default branding;
