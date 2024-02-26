import React, {
  createContext, useState, useContext, FunctionComponent, PropsWithChildren,
} from 'react';
import { branding
} from 'asgardeo-core';
import { AuthConfig, AuthContext, AuthenticationConfig, Config } from '../../models/auth';
import { BrandingPreferenceProvider } from '../../customization/branding-preference-provider';
import { setAuthConfig, getAuthState, setAuthState } from '../../utils/config-data-layer';

// Create a context for the provider
export const MyProviderContext = createContext<AuthContext | undefined>(undefined);

// Create the provider component
export const AsgardeoProvider: FunctionComponent<PropsWithChildren<Config>> = (
  props: PropsWithChildren<Config>,
) => {
  const {
    children, config: {
      clientId, baseUrl, scope, redirectUri, fallback,
    }, customization,
  } = props;

  const config: AuthenticationConfig ={ baseUrl, clientId, redirectUri, scope };
  setAuthConfig(config);

  const currentAuthState = getAuthState();
  const effectiveAuthState = currentAuthState || false;
  const [isAuthenticated, setIsAuthenticated] = useState(effectiveAuthState);

  let styles = customization;
  if (!customization) {
    styles = branding(baseUrl);
  }
  const [customizationOptions, setCustomizationOptions] = useState(styles);

  const _setAuthentication = (value: boolean) => {
    setIsAuthenticated(value);
    setAuthState(value);
  };

  // Create a value object with the authentication state and customization options
  const value = {
    isAuthenticated,
    customizationOptions,
    setAuthentication: _setAuthentication,
  };

  // Render the provider with the value object and the wrapped components
  return (
    <MyProviderContext.Provider value={value}>
      <BrandingPreferenceProvider>
        {children}
      </BrandingPreferenceProvider>
    </MyProviderContext.Provider>
  );
};

// Custom hook to access the authentication state
export const useAuthentication = () => {
  const { isAuthenticated } = useContext(MyProviderContext) as { isAuthenticated: boolean };
  return isAuthenticated;
};
