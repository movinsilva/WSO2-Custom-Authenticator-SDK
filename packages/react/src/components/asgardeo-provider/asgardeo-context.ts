import {createContext, useContext} from 'react';
import {AuthContext, AuthenticationConfig} from '../../models/auth';

/**
 * Context for the AsgardeoProvider component.
 */
export const AsgardeoProviderContext = createContext<AuthContext | undefined>(undefined);

/**
 * Custom hook to access authentication related information from the AsgardeoProviderContext.
 * @returns An object containing the isAuthenticated and accessToken values.
 */
export const useAuthentication = () => {
  //TODO: Check whether isAuthenticated is taken from the core everytime.
  //If not call isAuthenticate function in the asgardeo provider
  const {isAuthenticated} = useContext(AsgardeoProviderContext) as {isAuthenticated: boolean};
  const {accessToken} = useContext(AsgardeoProviderContext) as {accessToken: string};
  return {isAuthenticated, accessToken};
};

/**
 * Custom hook to access the authentication configuration from the AsgardeoProviderContext.
 * @returns An object containing the authentication configuration.
 */
export const useConfig = () => {
  const {config} = useContext(AsgardeoProviderContext) as {config: AuthenticationConfig};
  return {config};
};
