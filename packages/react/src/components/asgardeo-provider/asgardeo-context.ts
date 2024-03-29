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

import { AuthConfig, MeResponse } from "@asgardeo/ui-core";
import { Context, createContext, useContext } from "react";
import { AuthContext } from "../../models/auth";

/**
 * Context for the AsgardeoProvider component.
 */
export const AsgardeoProviderContext: Context<AuthContext | undefined> =
  createContext<AuthContext | undefined>(undefined);

/**
 * Custom hook to access authentication related information from the AsgardeoProviderContext.
 * @returns An object containing the isAuthenticated and accessToken values.
 */
export const useAuthentication = () => {
  // TODO: Check whether isAuthenticated is taken from the core everytime.
  // If not call isAuthenticate function in the asgardeo provider
  const { isAuthenticated } = useContext(AsgardeoProviderContext) as {
    isAuthenticated: Promise<boolean> | boolean;
  };
  const { accessToken } = useContext(AsgardeoProviderContext) as {
    accessToken: string;
  };

  const { user } = useContext(AsgardeoProviderContext) as unknown as {
    user: MeResponse;
  };

  const signOut = (): void => {
    sessionStorage.clear();
    window.location.reload();
  };
  return { accessToken, isAuthenticated, signOut, user };
};

/**
 * Custom hook to access the authentication configuration from the AsgardeoProviderContext.
 * @returns An object containing the authentication configuration.
 */
export const useConfig = () => {
  const { config } = useContext(AsgardeoProviderContext) as {
    config: AuthConfig;
  };
  return { config };
};
