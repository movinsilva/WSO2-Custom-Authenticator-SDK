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

import UICoreException from 'src/exception/ui-core-exception';
import { getAuthorizeUrl } from '../utils/url-generator';

const authorizeRequestBuilder = (baseUrl: string, clientId: string, scope: string, redirectUri: string): Request => {
  const formBody: URLSearchParams = new URLSearchParams();
  formBody.append('client_id', clientId);
  formBody.append('scope', scope);
  formBody.append('response_type', 'code');
  formBody.append('response_mode', 'direct');
  formBody.append('redirect_uri', redirectUri);
  //   formBody.append('code_challenge', code_challenge);

  const headers: Headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestOptions: RequestInit = {
    body: formBody.toString(),
    headers,
    method: 'POST',
  };

  const authorizeUri: string = getAuthorizeUrl(baseUrl);

  return new Request(authorizeUri, requestOptions);
};

export const authorize = async (
  baseUrl: string,
  clientId: string,
  scope: string,
  redirectUri: string,
): Promise<any> => {
  try {
    const request: Request = authorizeRequestBuilder(baseUrl, clientId, scope, redirectUri);

    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response: Response = await fetch(request);

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
    if (response.ok) {
      return await response.json();
    }
    throw new UICoreException('AZ-RF-01', 'Authorization failed 01', response);
  } catch (error) {
    // console.error(error.message, error.code, error.stack, error);
    error.printException();
    throw new UICoreException('AZ-RF-02', 'Authorization failed 02', error);
  }
};

export const exportedForTesting: Object = {
  authorizeRequestBuilder,
};
