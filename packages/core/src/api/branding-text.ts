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

import { getAuthInstance } from '../asgardeo-auth-js/asgardeo-auth-js';
import { AsgardeoException } from '../exception';
import { BrandingTextResponse } from '../model';
import { getBrandingTextUrl } from '../utils/url-generator';

const getBrandingTextRequest = async (locale: string, name: string, screen: string, type: string): Promise<Request> => {
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
 * Fetches the branding text from the server.
 *
 * @param locale - The locale of the branding text.
 * @param name - The name of the branding text.
 * @param screen - The screen of the branding text.
 * @param type - The type of the branding text.
 * @returns A Promise that resolves to the response from the server.
 * @throws {AsgardeoException} If the API call fails or the response is not OK.
 */
export const brandingText = async (
  locale: string,
  name: string,
  screen: string,
  type: string,
): Promise<BrandingTextResponse> => {
  const request: Request = await getBrandingTextRequest(locale, name, screen, type);
  let response: Response;

  try {
    response = await fetch(request);
  } catch (error) {
    throw new AsgardeoException('JS_UI_CORE-BT-BT-NE01', 'Branding Text API call failed', error);
  }
  if (response.ok) {
    return (await response.json()) as BrandingTextResponse;
  }
  throw new AsgardeoException('JS_UI_CORE-BT-BT-HE02', 'Branding Text response is not OK');
};

type ExportedForTestingType = {
  getBrandingTextRequest: (locale: string, name: string, screen: string, type: string) => Promise<Request>;
};

export const exportedForTesting: ExportedForTestingType = {
  getBrandingTextRequest,
};
