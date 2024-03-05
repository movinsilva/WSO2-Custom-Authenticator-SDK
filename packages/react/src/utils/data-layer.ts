import configureAuthClient from 'asgardeo-core';
import { AuthenticationConfig, Authenticator } from '../models/auth';

export class DataLayer {
  private static instance: DataLayer;

  private constructor() {}

  public static getInstance(): DataLayer {
    if (!DataLayer.instance) {
      DataLayer.instance = new DataLayer();
    }
    return DataLayer.instance;
  }

  protected set(key: string, value: any): void {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  protected get(key: string): any {
    const value = sessionStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }

  protected remove(key: string): void {
    sessionStorage.removeItem(key);
  }

  public setAuthConfig = (
    config: AuthenticationConfig,
  ): void => {
    this.set('authConfig', config);
  };

  public getAuthConfig = (): AuthenticationConfig => {
    const {
      baseUrl, clientId, scope, redirectUri,
    } = this.get('authConfig');
    const config: AuthenticationConfig = {
      baseUrl, clientId, scope, redirectUri,
    };
    return config;
  };

  public setFlowConfig = (flowId: string, authenticatorType: Authenticator[]): void => {
    const config = { flowId, authenticatorType };
    this.set('flowConfig', config);
  };

  public getFlowConfig = (): { authenticatorType: Authenticator[], flowId: string } => this.get('flowConfig');

  public setTokens = (tokens: any): void => {
    this.set('tokens', tokens);
  };

  public getTokens = (): any => this.get('tokens');
}
