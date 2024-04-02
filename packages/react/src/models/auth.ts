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

import { AuthClientConfig, Store } from "@asgardeo/ui-core";
import { ReactNode } from "react";
import { BrandingPreferenceAPIResponseInterface } from "./branding-preferences";
import { Localization } from "./localization";

export enum FlowStatus {
  DEFAULT = "DEFAULT", // hasn't started the flow yet
  FAIL_INCOMPLETE = "FAIL_INCOMPLETE",
  INCOMPLETE = "INCOMPLETE",
  SUCCESS_COMPLETED = "SUCCESS_COMPLETED",
}

export enum AuthenticatorType {
  FACEBOOK = "facebook",
  GOOGLE = "Google",
  TOTP = "TOTP",
  USERNAME_PASSWORD = "Username & Password",
}

export interface AsgardeoProviderPropsInterface {
  config: AuthClientConfig;
  customization?: Partial<BrandingPreferenceAPIResponseInterface>;
  localization?: Localization;
  store?: Store;
}

export interface EndPoints {
  authenticate?: string;
  authorize?: string;
  branding?: string;
  token?: string;
}

export interface AuthContext {
  accessToken: string;
  config: AuthClientConfig;
  customizationOptions?: any;
  isAuthenticated: boolean | undefined;
  setAuthentication: () => void;
}

/**
 * Common interface to extend identifiable components.
 */
export interface IdentifiableComponentInterface {
  /**
   * Unique component id.
   */
  "data-componentid"?: string;
}

/**
 * Proptypes for the SignIn fragment component.
 */
export interface SignInFragmentPropsInterface {
  authenticatorId: string;
  handleAuthenticate: Function;
  isRetry?: boolean;
}

/*
 * Proptypes for the signedIn and signedOut component.
 */
export interface SignedPropsInterface {
  fallback?: ReactNode;
}

export interface LoginOptionFragmentPropsInterface
  extends IdentifiableComponentInterface {
  authenticator: string;
  handleClick: Function;
}
