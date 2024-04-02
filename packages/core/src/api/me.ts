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

import {AuthClient} from '../asgardeo-auth-js/asgardeo-auth-js';
import AsgardeoException from '../exception/exception';
import {MeResponse} from '../model/me-response';
import {getMeUrl} from '../utils/url-generator';

/**
 * Builds a request object for the "me" API endpoint.
 * @param {string} meUrl - The URL of the "me" API endpoint.
 * @returns {Request} - The request object.
 */
const getMeRequest = async (meUrl: string): Promise<Request> => {
  const accessToken: string = await AuthClient.getInstance().getAccessToken();

  if (!accessToken) {
    throw new AsgardeoException('JS_UI_CORE-ME-GMR-IV01', 'Access token is null');
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
export const me = async (): Promise<MeResponse> => {
  const {baseUrl} = await AuthClient.getInstance().getDataLayer().getConfigData();
  const request: Request = await getMeRequest(getMeUrl(baseUrl));
  let response: Response;
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    response = await fetch(request);
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  } catch (error) {
    throw new AsgardeoException('JS_UI_CORE-ME-ME-NE01', 'Me API call failed', error);
  }
  if (response.ok) {
    return (await response.json()) as MeResponse;
  }
  throw new AsgardeoException('JS_UI_CORE-ME-ME-HE02', 'Me response is not OK');
};

type ExportedForTestingType = {
  getMeRequest: (url: string) => Promise<Request>;
};

export const exportedForTesting: ExportedForTestingType = {
  getMeRequest,
};
