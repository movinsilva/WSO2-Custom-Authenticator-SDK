import { ReactNode } from 'react';

export enum FlowStatus {
  DEFAULT = 'DEFAULT', // hasn't started the flow yet
  FAIL_INCOMPLETE = 'FAIL_INCOMPLETE',
  INCOMPLETE = 'INCOMPLETE',
  SUCCESS_COMPLETED = 'SUCCESS_COMPLETED',
}

export enum AuthenticatorType {
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

export interface Config {
  config: AuthConfig;
  customization?: string; // to be changed
}

export interface AuthContext {
  customizationOptions: any;
  isAuthenticated: boolean;
  setAuthentication: (value: boolean) => void;
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
  flowId: string;
  flowStatus: FlowStatus;
  flowType: string;
  links: Link[];
  nextStep: AuthStep;
  authData?: AuthData;
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
  // to do
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
}