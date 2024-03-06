import { getAuthInstance } from '../../asgardeo-auth-js';
import { getMeUrl } from '../../utils/url-generator';

const meRequestBuilder = async (meUrl) => {
  const accessToken = await getAuthInstance().getAccessToken();

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
