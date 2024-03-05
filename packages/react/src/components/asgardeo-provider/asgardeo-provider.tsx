import React, {
  createContext, useState, useContext, FunctionComponent, PropsWithChildren, useMemo,
} from 'react';
// import {configureAuthClient} from 'asgardeo-core';
import { AuthContext, AuthenticationConfig, Config } from '../../models/auth';
import BrandingPreferenceProvider from '../branding-preference-provider/branding-preference-provider';
import { DataLayer } from '../../utils/data-layer';
import SessionStore from '../../utils/session-store';
import Store from '../../models';
import { CryptoUtils } from '../../models/auth-js';
import SPACryptoUtils from '../../utils/crypto-utils';

// context for the AsgardeoProvider
export const AsgardeoProviderContext = createContext<AuthContext | undefined>(undefined);

export const AsgardeoProvider: FunctionComponent<PropsWithChildren<Config>> = (props: PropsWithChildren<Config>) => {
  const {
    children,
    config: {
      clientId, baseUrl, scope, redirectUri,
    },
    customization,
  } = props;

  const config: AuthenticationConfig = {
    baseUrl,
    clientId,
    redirectUri,
    scope,
  };

  const dataLayer = DataLayer.getInstance();
  dataLayer.setAuthConfig(config);

  // const store: Store = new SessionStore();
  // const spaUtils: CryptoUtils = new SPACryptoUtils();

  // configureAuthClient(config, store, spaUtils);
  // to do - temporary to remove tokens
  dataLayer.setTokens('');
  const tokens = dataLayer.getTokens();

  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokens);

  /**
   * Sets the authentication status and access token.
   *
   * @param {boolean} value - Authentication status to set.
   * @param {string} [token] - Access token to set.
   */
  const setAuthentication = (value: boolean, token?: string) => {
    setIsAuthenticated(value);
    dataLayer.setTokens(token);
    setAccessToken(token || '');
  };

  // Value object to be passed to the AsgardeoProvider
  const value = useMemo(
    () => ({
      isAuthenticated,
      setAuthentication,
      accessToken,
    }),
    [isAuthenticated, setAuthentication, accessToken],
  );

  // Render the provider with the value object and the wrapped components
  return (
    <AsgardeoProviderContext.Provider value={value}>
      <BrandingPreferenceProvider brandingProps={customization}>{children}</BrandingPreferenceProvider>
    </AsgardeoProviderContext.Provider>
  );
};

// Custom hook to access the authentication state
export const useAuthentication = () => {
  const { isAuthenticated } = useContext(AsgardeoProviderContext) as { isAuthenticated: boolean };
  const { accessToken } = useContext(AsgardeoProviderContext) as unknown as { accessToken: string };
  return { isAuthenticated, accessToken };
};
