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

import { getAuthInstance } from 'src/asgardeo-auth-js';
import { getAuthnUrl } from 'src/utils/url-generator';
import IdentityException from '../exception/exception';

type AuthnParams = {
  authenticatorID: string;
  authenticatorParametres?: any;
  flowID: string;
};

const generateAuthnRequest = async (props: AuthnParams): Promise<Request> => {
  const { flowID, authenticatorID, authenticatorParametres } = props;

  const authBody: any = {
    flowId: flowID,
    selectedAuthenticator: {
      authenticatorId: authenticatorID,
      ...(authenticatorParametres && { params: authenticatorParametres }),
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
  const { baseUrl } = await getAuthInstance().getDataLayer().getConfigData();
  return new Request(getAuthnUrl(baseUrl), requestOptions);
};

const authenticate = async (props: AuthnParams): Promise<Response> => {
  try {
    const request: Request = await generateAuthnRequest(props);
    const response: Response = await fetch(request);
    if (!response.ok) {
      throw new IdentityException('AN-RF-01', 'Authentication Response Failed', 'Request failed damn');
    }
    return await response.json();
  } catch (error) {
    throw new IdentityException('AN-RF-02', `Authentication Response Failed: ${error}`, error.message);
  }
};

export default authenticate;
