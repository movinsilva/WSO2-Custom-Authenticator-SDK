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

import {
  AsgardeoAuthClient, AuthClientConfig, CryptoUtils, Store,
} from '@asgardeo/auth-js';
import { AuthConfig } from '../model/config';

export class AuthClient {
  private static instance: AsgardeoAuthClient<any>;

  private constructor() {}

  static getInstance(
    authClientConfig?: AuthClientConfig,
    store?: Store,
    cryptoUtils?: CryptoUtils,
  ): AsgardeoAuthClient<any> {
    if (!AuthClient.instance) {
      AuthClient.instance = new AsgardeoAuthClient();
      AuthClient.instance.initialize(authClientConfig, store, cryptoUtils);
    }
    return AuthClient.instance;
  }
}

export function setAuthInstance(config: AuthConfig, store: Store, cryptoUtils: CryptoUtils): void {
  const authClientConfig: AuthClientConfig = {
    baseUrl: config.baseUrl,
    clientID: config.clientID,
    enablePKCE: config.enablePKCE ?? true,
    endpoints: config.endpoints,
    scope: config.scope,
    signInRedirectURL: config.signInRedirectURL,
    wellKnownEndpoint: config.wellKnownEndpoint,
  };

  AuthClient.getInstance(authClientConfig, store, cryptoUtils);
}

export function getAuthInstance(): AsgardeoAuthClient<any> {
  return AuthClient.getInstance();
}
