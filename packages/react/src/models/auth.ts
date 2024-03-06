import { ReactNode } from 'react';
import { BrandingPreferenceAPIResponseInterface } from './branding-preferences';
import { Store } from './auth-js';

export enum FlowStatus {
  DEFAULT = 'DEFAULT', // hasn't started the flow yet
  FAIL_INCOMPLETE = 'FAIL_INCOMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  SUCCESS_COMPLETED = 'SUCCESS_COMPLETED',
}

export enum AuthenticatorType {
  FACEBOOK = 'facebook',
  GOOGLE = 'Google',
  TOTP = 'TOTP',
  USERNAME_PASSWORD = 'Username & Password',
}

/**
 * Represents the configuration for authentication.
 */
export interface AuthConfig {
  baseUrl: string; // The base URL for authentication
  clientId: string;
  // The redirect URI for authentication
  fallback?: ReactNode; // The scope for authentication
  redirectUri: string;
  // The client ID for authentication
  scope: string; // The fallback component to render
}

export interface AsgardeoProviderPropsInterface {
  config: AuthConfig;
  customization?: Partial<BrandingPreferenceAPIResponseInterface>; // to be changed
  store?: Store;
}

export interface AuthContext {
  accessToken: string;
  config: AuthenticationConfig;
  customizationOptions?: any;
  isAuthenticated: boolean;
  setAuthentication: () => void;
}

/**
 * Common interface to extend identifiable components.
 */
export interface IdentifiableComponentInterface {
  /**
   * Unique component id.
   */
  'data-componentid'?: string;
}

export interface AuthorizeApiResponseInterface {
  authData?: AuthData;
  flowId: string;
  flowStatus: FlowStatus;
  flowType: string;
  links: Link[];
  nextStep: AuthStep;
}

export interface AuthStep {
  authenticators: Authenticator[];
  stepType: string;
}

export interface Authenticator {
  authenticator: string;
  authenticatorId: string;
  idp: string;
  metadata: Metadata;
  requiredParams: string[];
}

export interface Metadata {
  additionalData: AdditionalData;
  // to do
  promptType: string;
}

export interface AdditionalData {
  redirectUrl: string;
  state: string;
}

export interface Link {
  href: string;
  method: string;
  name: string;
}

export interface AuthenticationConfig {
  baseUrl: string;
  clientId: string;
  redirectUri: string;
  scope: string;
}

export interface AuthData {
  code: string;
  session_state: string;
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

export interface LoginOptionFragmentPropsInterface extends IdentifiableComponentInterface {
  authenticator: string;
  handleClick: Function;
}
