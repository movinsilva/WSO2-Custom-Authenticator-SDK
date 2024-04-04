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
  AuthClient,
  me,
  Store,
  CryptoUtils,
  AsgardeoAuthClient,
  MeResponse,
} from "@asgardeo/js-ui-core";
import {
  useState,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useEffect,
} from "react";
import { AsgardeoProviderContext } from "./asgardeo-context";
import { AsgardeoProviderPropsInterface, AuthContext } from "../../models/auth";
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
  const { children, config, customization, store, localization } = props;

  // If a store instance is passed, use it. Otherwise, create a new instance of the SessionStore
  const storeInstance: Store = store || new SessionStore();

  const spaUtils: CryptoUtils = new SPACryptoUtils();

  const authClient: AsgardeoAuthClient<any> = AuthClient.getInstance(
    config,
    storeInstance,
    spaUtils
  );

  const [accessToken, setAccessToken] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>();
  const [user, setUser] = useState<MeResponse>();

  /**
   * Sets the authentication status and access token.
   */
  const setAuthentication = (): void => {
    authClient.isAuthenticated().then((isAuth: boolean) => {
      // Update the state only if the value has changed
      if (isAuth !== isAuthenticated) {
        setIsAuthenticated(isAuth);
      }
    });

    authClient.getAccessToken().then((accessTokenFromClient: any) => {
      if (accessTokenFromClient) {
        setAccessToken(accessTokenFromClient);

        me().then((response: MeResponse) => {
          setUser(response);
        });
      }
    });
  };

  useEffect(() => {
    setAuthentication();

    // This script is added so that the popup window can send the code and state to the parent window
    const url: URL = new URL(window.location.href);
    if (url.searchParams.has("code") && url.searchParams.has("state")) {
      const code: string | null = url.searchParams.get("code");
      const state: string | null = url.searchParams.get("state");

      // Send the 'code' and 'state' to the parent window and close the current window (popup)
      window.opener.postMessage({ code, state }, config.signInRedirectURL);
      window.close();
    }
  }, []);

  // Value object to be passed to the AsgardeoProvider
  const value: AuthContext = useMemo(
    () => ({
      accessToken,
      config,
      isAuthenticated,
      setAuthentication,
      user,
    }),
    [isAuthenticated, accessToken, user]
  );

  // Render the provider with the value object and the wrapped components
  return (
    <AsgardeoProviderContext.Provider value={value}>
      <BrandingPreferenceProvider
        brandingProps={customization}
        localization={localization}
      >
        {children}
      </BrandingPreferenceProvider>
    </AsgardeoProviderContext.Provider>
  );
};

export default AsgardeoProvider;
