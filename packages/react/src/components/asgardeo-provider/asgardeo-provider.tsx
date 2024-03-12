import React, {useState, FunctionComponent, PropsWithChildren, useMemo, useEffect} from 'react';
import {setAuthInstance, getAuthInstance} from '@asgardeo/ui-core';
import {AsgardeoProviderPropsInterface, AuthenticationConfig} from '../../models/auth';
import BrandingPreferenceProvider from '../branding-preference-provider/branding-preference-provider';
import SessionStore from '../../utils/session-store';
import Store from '../../models';
import {CryptoUtils} from '../../models/auth-js';
import SPACryptoUtils from '../../utils/crypto-utils';
import {AsgardeoProviderContext} from './asgardeo-context';

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
const AsgardeoProvider: FunctionComponent<PropsWithChildren<AsgardeoProviderPropsInterface>> = (
  props: PropsWithChildren<AsgardeoProviderPropsInterface>,
) => {
  const {
    children,
    config: {clientId, baseUrl, scope, redirectUri},
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

  setAuthInstance(config, storeInstance, spaUtils);

  const [accessToken, setAccessToken] = useState<string>('');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  /**
   * Sets the authentication status and access token.
   */
  const setAuthentication = () => {
    const authClient = getAuthInstance();
    authClient.isAuthenticated().then((isAuth: boolean) => {
      console.log('AsgardeoProvider -> setAuthentication -> isAuth', isAuth);
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

export default AsgardeoProvider;
