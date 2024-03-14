/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { getAuthInstance } from 'src/asgardeo-auth-js/asgardeo-auth-js';
import { getBrandingTextUrl } from 'src/utils/url-generator';

const brandingTextRequestBuilder = async (
  locale: string,
  name: string,
  screen: string,
  type: string,
): Promise<Request> => {
  const headers: Headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    headers,
    method: 'GET',
  };

  const params: URLSearchParams = new URLSearchParams();
  params.append('locale', locale);
  params.append('name', name);
  params.append('screen', screen);
  params.append('type', type);

  const { baseUrl } = await getAuthInstance().getDataLayer().getConfigData();
  const textUrl: string = getBrandingTextUrl(baseUrl);
  const urlWithParams: string = `${textUrl}?${params.toString()}`;

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
const brandingText = async (locale: string, name: string, screen: string, type: string): Promise<Response> => {
  const request: Request = await brandingTextRequestBuilder(locale, name, screen, type);
  try {
    const response: Response = await fetch(request);
    if (response.ok) {
      return await response.json();
    }
    throw new Error('Branding Text request failed');
  } catch (error) {
    // handle the error
    throw new Error('Branding Text request failed');
  }
};

export default brandingText;
