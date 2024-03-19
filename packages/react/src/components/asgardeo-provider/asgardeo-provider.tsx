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

import { setAuthInstance, getAuthInstance, me } from "@asgardeo/ui-core";
import React, {
  useState,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useEffect,
} from "react";
import { AsgardeoProviderContext } from "./asgardeo-context";
import Store from "../../models";
import {
  AsgardeoProviderPropsInterface,
  AuthenticationConfig,
} from "../../models/auth";
import { CryptoUtils } from "../../models/auth-js";
import { MeAPIResponseInterface } from "../../models/me";
import SPACryptoUtils from "../../utils/crypto-utils";
import SessionStore from "../../utils/session-store";
import BrandingPreferenceProvider from "../branding-preference-provider/branding-preference-provider";

/**
 * AsgardeoProvider component is a wrapper component that provides authentication-related
 * functionality to its child components.
 *
 * @component
 * @param {AsgardeoProviderPropsInterface} props The props of the component
 * @returns {ReactElement} The AsgardeoProvider component
 * @example
 * ```tsx
 * <AsgardeoProvider
 *   config={{
 *     clientId: "your-client-id",
 *     baseUrl: "https://your-base-url",
 *     scope: "openid",
 *     redirectUri: "https://your-redirect-uri"
 *   }}
 *   customization={customization}
 *   store={store}
 * >
 *   <App />
 * </AsgardeoProvider>
 * ```
 */
const AsgardeoProvider: FunctionComponent<
  PropsWithChildren<AsgardeoProviderPropsInterface>
> = (props: PropsWithChildren<AsgardeoProviderPropsInterface>) => {
  const {
    children,
    config: { clientId, baseUrl, scope, redirectUri },
    customization,
    store,
    endpoints,
  } = props;

  const config: AuthenticationConfig = {
    baseUrl,
    clientId,
    redirectUri,
    scope,
  };

  // If a store instance is passed, use it. Otherwise, create a new instance of the SessionStore
  const storeInstance: Store = store || new SessionStore();

  const spaUtils: CryptoUtils = new SPACryptoUtils();

  setAuthInstance(config, storeInstance, spaUtils, endpoints);

  const [accessToken, setAccessToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<MeAPIResponseInterface>();

  /**
   * Sets the authentication status and access token.
   */
  const setAuthentication = (): void => {
    const authClient = getAuthInstance();
    authClient.isAuthenticated().then((isAuth: boolean) => {
      // Update the state only if the value has changed
      if (isAuth !== isAuthenticated) {
        setIsAuthenticated(isAuth);
      }
    });

    setIsAuthenticated(getAuthInstance().isAuthenticated());

    authClient.getAccessToken().then((accessTokenFromClient: any) => {
      if (accessTokenFromClient) {
        setAccessToken(accessTokenFromClient);

        me(config.baseUrl).then((response: any) => {
          console.log("response from user: ", response);
          setUser(response as MeAPIResponseInterface);
        });
      }
    });
  };

  useEffect(() => {
    setAuthentication();

    // This script is added so that the popup window can send the code and state to the parent window
    const url: URL = new URL(window.location.href);
    console.log("url:", url);
    if (url.searchParams.has("code") && url.searchParams.has("state")) {
      const code: string | null = url.searchParams.get("code");
      const state: string | null = url.searchParams.get("state");

      console.log("code:", code, "\nstate:", state);

      // Send the 'code' and 'state' to the parent window and close the current window (popup)
      window.opener.postMessage({ code, state }, config.redirectUri);
      window.close();
    }
  }, []);

  // Value object to be passed to the AsgardeoProvider
  const value = useMemo(
    () => ({
      isAuthenticated,
      setAuthentication,
      accessToken,
      config,
      user,
    }),
    [isAuthenticated, accessToken, user]
  );

  // Render the provider with the value object and the wrapped components
  return (
    <AsgardeoProviderContext.Provider value={value}>
      <BrandingPreferenceProvider brandingProps={customization}>
        {children}
      </BrandingPreferenceProvider>
    </AsgardeoProviderContext.Provider>
  );
};

export default AsgardeoProvider;
