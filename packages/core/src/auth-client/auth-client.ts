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

import {AsgardeoAuthClient, CryptoUtils, Store} from '@asgardeo/auth-js';
import AsgardeoUIException from 'src/exception/exception';
import AuthConfig from 'src/model/auth-config';

export class AuthClient {
  private static instance: AsgardeoAuthClient<any>;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  static getInstance(authClientConfig?: AuthConfig, store?: Store, cryptoUtils?: CryptoUtils): AsgardeoAuthClient<any> {
    try {
      throw new AsgardeoUIException('001', 'testing msg');
    } catch (error) {
      console.log(typeof error);
      console.log('instanceof AsgardeoUIException', error instanceof Error);
    }

    if (!AuthClient.instance) {
      AuthClient.instance = new AsgardeoAuthClient();
      AuthClient.instance.initialize(authClientConfig, store, cryptoUtils);
    }
    return AuthClient.instance;
  }
}

export {
  AsgardeoAuthException,
  CryptoUtils,
  JWKInterface,
  Store,
  AsgardeoAuthClient,
  TokenResponse,
} from '@asgardeo/auth-js';
