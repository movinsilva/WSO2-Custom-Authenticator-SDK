import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
  PropsWithChildren,
  useMemo,
  useEffect,
} from 'react';
import { configureAuthClient, getAuthInstance } from 'asgardeo-core';
import { AsgardeoProviderPropsInterface, AuthContext, AuthenticationConfig } from '../../models/auth';
import BrandingPreferenceProvider from '../branding-preference-provider/branding-preference-provider';
import SessionStore from '../../utils/session-store';
import Store from '../../models';
import { CryptoUtils } from '../../models/auth-js';
import SPACryptoUtils from '../../utils/crypto-utils';

// context for the AsgardeoProvider
export const AsgardeoProviderContext = createContext<AuthContext | undefined>(undefined);

export const AsgardeoProvider: FunctionComponent<PropsWithChildren<AsgardeoProviderPropsInterface>> = (
  props: PropsWithChildren<AsgardeoProviderPropsInterface>,
) => {
  const {
    children,
    config: {
      clientId, baseUrl, scope, redirectUri,
    },
    customization,
    store,
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

  configureAuthClient(config, storeInstance, spaUtils);

  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * Sets the authentication status and access token.
   */
  const setAuthentication = () => {
    const authClient = getAuthInstance();
    authClient.isAuthenticated().then((isAuth: boolean) => {
      setIsAuthenticated(isAuth);
    });

    setIsAuthenticated(getAuthInstance().isAuthenticated());

    authClient.getAccessToken().then((accessTokenFromClient: any) => {
      setAccessToken(accessTokenFromClient);
    });
  };

  useEffect(() => {
    setAuthentication();
  }, []);

  // Value object to be passed to the AsgardeoProvider
  const value = useMemo(
    () => ({
      isAuthenticated,
      setAuthentication,
      accessToken,
      config,
    }),
    [isAuthenticated, accessToken],
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
  const { accessToken } = useContext(AsgardeoProviderContext) as { accessToken: string };
  return { isAuthenticated, accessToken };
};

export const useConfig = () => {
  const { config } = useContext(AsgardeoProviderContext) as { config: AuthenticationConfig };
  return { config };
};
