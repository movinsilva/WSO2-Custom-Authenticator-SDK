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

import {AsgardeoAuthClient} from '@asgardeo/auth-js';
import {AuthClient} from '../asgardeo-auth-js/asgardeo-auth-js';
import AsgardeoException from '../exception/exception';
import {AuthApiResponse} from '../model/public-model';

const getAuthorizePostRequest = async (): Promise<Request> => {
  const authInstace: AsgardeoAuthClient<any> = AuthClient.getInstance();
  const data: any = await authInstace.getDataLayer().getConfigData();
  const url: string = await authInstace.getAuthorizationURL();
  const authorizeUri: string = (await authInstace.getOIDCServiceEndpoints()).authorizationEndpoint;

  // Parse the URL and extract the search parameters
  const params: URLSearchParams = new URLSearchParams(new URL(url).search);
  const formBody: URLSearchParams = new URLSearchParams();

  formBody.append('response_type', 'code');
  formBody.append('response_mode', 'direct');
  formBody.append('redirect_uri', data.signInRedirectURL);
  formBody.append('client_id', params.get('client_id'));
  formBody.append('scope', params.get('scope'));
  formBody.append('code_challenge', params.get('code_challenge'));
  formBody.append('code_challenge_method', params.get('code_challenge_method'));
  const state: string = params.get('state');
  formBody.append('state', state);

  /* Save the state temporarily in the data layer, this needs to be passed when token is requested */
  await authInstace.getDataLayer().setTemporaryDataParameter('state', state);

  const headers: Headers = new Headers();
  headers.append('Accept', 'application/json');
  headers.append('Content-Type', 'application/x-www-form-urlencoded');

  const requestOptions: RequestInit = {
    body: formBody.toString(),
    headers,
    method: 'POST',
  };

  return new Request(authorizeUri, requestOptions);
};

/**
 * Authorizes the user and returns the authentication response.
 * @returns {Promise<AuthApiResponse>} The authentication response.
 * @throws {UICoreException} If the authorization API call fails.
 * @throws {AsgardeoException} If the authorization response is not OK.
 */
export const authorize = async (): Promise<AuthApiResponse> => {
  let response: Response;
  try {
    // Disable certificate verification for the duration of this request
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    response = await fetch(await getAuthorizePostRequest());
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  } catch (error) {
    throw new AsgardeoException('JS_UI_CORE-AUTHZ-AZ-NE01', 'Authorization API call failed', error.stack);
  }

  if (response.ok) {
    return (await response.json()) as AuthApiResponse;
  }
  throw new AsgardeoException('UI_CORE-AUTHZ-AZ-HE02', 'Authorization response is not OK');
};

type ExportedForTestingType = {
  authorizeRequestBuilder: () => Promise<Request>;
};

export const exportedForTesting: ExportedForTestingType = {
  authorizeRequestBuilder: getAuthorizePostRequest,
};
