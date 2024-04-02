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

import {AuthClient} from '../asgardeo-auth-js';
import AsgardeoException from '../exception/exception';
import {AuthApiResponse, AuthnParams} from '../model';
import {getAuthnUrl} from '../utils/url-generator';

const getAuthnRequest = async (props: AuthnParams): Promise<Request> => {
  const {flowID, authenticatorID, authenticatorParametres} = props;

  const authBody: any = {
    flowId: flowID,
    selectedAuthenticator: {
      authenticatorId: authenticatorID,
      ...(authenticatorParametres && {params: authenticatorParametres}),
    },
  };

  const formBody: string = JSON.stringify(authBody);

  const headers: Headers = new Headers();
  headers.append('Content-Type', 'application/json');

  const requestOptions: RequestInit = {
    body: formBody,
    headers,
    method: 'POST',
  };

  /* Getting baseURL from authClient's data layer */
  const {baseUrl} = await AuthClient.getInstance().getDataLayer().getConfigData();

  return new Request(getAuthnUrl(baseUrl), requestOptions);
};

/**
 * Authenticates the user with the provided parameters.
 * @param props - The authentication parameters.
 * @returns A promise that resolves to the authentication response.
 * @throws An AsgardeoException if the authentication API call fails or the response is not OK.
 */
export const authenticate = async (props: AuthnParams): Promise<AuthApiResponse> => {
  let response: Response;
  try {
    response = await fetch(await getAuthnRequest(props));
  } catch (error) {
    throw new AsgardeoException('JS_UI_CORE-AUTHN-AN-NE01', `Authentication API call Failed: ${error}`, error.message);
  }
  if (response.ok) {
    return (await response.json()) as AuthApiResponse;
  }
  throw new AsgardeoException('JS_UI_CORE-AUTHN-AN-HE02', 'Authentication Response is not OK');
};

type ExportedForTestingType = {
  getAuthenticateRequest: (arg: AuthnParams) => Promise<Request>;
};

export const exportedForTesting: ExportedForTestingType = {
  getAuthenticateRequest: getAuthnRequest,
};
