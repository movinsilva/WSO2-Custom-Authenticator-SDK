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

import {AsgardeoAuthClient, AuthClientConfig, CryptoUtils, Store} from '@asgardeo/auth-js';

export class AuthClient {
  private static instance: AsgardeoAuthClient<unknown>;

  private constructor() {}

  static getInstance(authClientConfig?: AuthClientConfig, store?: Store, cryptoUtils?: CryptoUtils): AuthClient {
    if (!AuthClient.instance) {
      AuthClient.instance = new AsgardeoAuthClient();
      AuthClient.instance.initialize(authClientConfig, store, cryptoUtils);
    }
    return AuthClient.instance;
  }
}

// TODO: Add the type for the config object
export function setAuthInstance(config: any, store: Store, cryptoUtils: CryptoUtils, endpoints?: any): void {
  const {baseUrl, clientId, redirectUri} = config;

  const authClientConfig: AuthClientConfig = {
    baseUrl,
    clientID: clientId,
    enablePKCE: false,
    signInRedirectURL: redirectUri,
    signOutRedirectURL: redirectUri,
  };

  AuthClient.getInstance(authClientConfig, store, cryptoUtils);
}

export function getAuthInstance(): AuthClient {
  return AuthClient.getInstance();
}
