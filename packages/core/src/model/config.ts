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

import { OIDCEndpoints } from '@asgardeo/auth-js';

export interface DefaultAuthConfig {
  clientID: string;
  enablePKCE?: boolean;
  scope?: string[];
  signInRedirectURL: string;
}

// TODO: Check whether OIDC ENDPOINTS can be used
export interface WellKnownAuthConfig extends DefaultAuthConfig {
  baseUrl?: string;
  endpoints?: Partial<OIDCEndpoints>;
  wellKnownEndpoint: string;
}

export interface BaseURLAuthConfig extends DefaultAuthConfig {
  baseUrl: string;
  endpoints?: Partial<OIDCEndpoints>;
  wellKnownEndpoint?: string;
}

export interface ExplicitAuthConfig extends DefaultAuthConfig {
  baseUrl?: string;
  endpoints: OIDCEndpoints;
  wellKnownEndpoint?: string;
}

export type StrictAuthConfig = WellKnownAuthConfig | BaseURLAuthConfig | ExplicitAuthConfig;

export type AuthConfig<T = unknown> = StrictAuthConfig & T;
