import React, {
  createContext, useState, useContext, FunctionComponent, PropsWithChildren,
} from 'react';
import { AuthContext, AuthenticationConfig, Config } from '../../models/auth';
import BrandingPreferenceProvider from '../../customization/branding-preference-provider';
import { DataLayer } from '../../utils/data-layer';

// context for the provider
export const AsgardeoProviderContext = createContext<AuthContext | undefined>(undefined);

// eslint-disable-next-line
export const AsgardeoProvider: FunctionComponent<PropsWithChildren<Config>> = (props: PropsWithChildren<Config>) => {
  const {
    children,
    config: {
      clientId, baseUrl, scope, redirectUri, fallback,
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
  // to do - temporary to remove tokens
  dataLayer.setTokens('');
  const tokens = dataLayer.getTokens();

  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState(!!tokens);

  /**
   * Sets the authentication status and access token.
   *
   * @param {boolean} value - The authentication status to set. If true, the user is considered authenticated.
   * @param {string} [token] - The access token to set. If not provided, the access token is set to an empty string.
   */
  const setAuthentication = (value: boolean, token?: string) => {
    setIsAuthenticated(value);
    dataLayer.setTokens(token);
    setAccessToken(token || '');
  };

  // Value object to be passed to the AsgardeoProvider
  const value = {
    isAuthenticated,
    setAuthentication,
    accessToken,
  };

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
