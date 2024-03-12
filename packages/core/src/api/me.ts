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

import { getAuthInstance } from '../asgardeo-auth-js';
import { getMeUrl } from '../utils/url-generator';

/**
 * Builds a request object for the "me" API endpoint.
 * @param {string} meUrl - The URL of the "me" API endpoint.
 * @returns {Request} - The request object.
 */
const meRequestBuilder = async (meUrl: string): Promise<Request> => {
  const accessToken: string = await getAuthInstance().getAccessToken();

  if (!accessToken) {
    throw new Error('Access token is null');
  }

  const headers: Headers = new Headers();
  headers.append('Authorization', `Bearer ${accessToken}`);
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
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
const me = async (baseUrl: string): Promise<Response> => {
  try {
    const request: Request = await meRequestBuilder(getMeUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response: Response = await fetch(request);
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      return await response.json();
    }
    throw new Error('Me request failed');
  } catch (error) {
    // handle the error
    throw new Error(`Me request failed: ${error}`);
  }
};

export default me;
