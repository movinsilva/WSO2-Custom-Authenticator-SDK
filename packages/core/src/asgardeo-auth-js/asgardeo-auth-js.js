import { AsgardeoAuthClient } from '@asgardeo/auth-js';
import { DataLayer } from '../data';

export class AuthClient {
  static instance;

  static getInstance(authClientConfig, store, cryptoUtils) {
    if (!AuthClient.instance) {
      AuthClient.instance = new AsgardeoAuthClient();
      AuthClient.instance.initialize(authClientConfig, store, cryptoUtils);
    }
    return AuthClient.instance;
  }
}

export function configureAuthClient(config, store, cryptoUtils) {
  const {
    baseUrl,
    clientId,
    redirectUri,
  } = config;

  const authClientConfig = {
    baseUrl,
    clientID: clientId,
    signInRedirectURL: redirectUri,
    signOutRedirectURL: redirectUri,
  };

  AuthClient.getInstance(authClientConfig, store, cryptoUtils);
  DataLayer.getInstance(store);
}

export async function requestAccessToken(authCode, sessionState) {
  return AuthClient.instance.requestAccessToken(authCode, sessionState, '');
}

export async function getIsAuthenticated() {
  return AuthClient.instance.isAuthenticated();
}

export async function getDataLayer() {
  return AuthClient.instance.getDataLayer();
}

export function getAuthInstance() {
  return AuthClient.instance;
}

export async function signOut() {
  const url = AuthClient.instance.getSignOutURL();
  window.location.href = url;
}
