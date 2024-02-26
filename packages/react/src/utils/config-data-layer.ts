import { AuthenticationConfig, Authenticator } from "../models/auth";
import dataLayer from "./data-layer";



export const setAuthConfig = (
    config: AuthenticationConfig
): void => {
    dataLayer.set('authConfig', config);
};

export const getAuthConfig = (): AuthenticationConfig => {
    const { baseUrl, clientId, scope, redirectUri } = dataLayer.get('authConfig');
    const config: AuthenticationConfig = { baseUrl, clientId, scope, redirectUri };
    return config;
};

export const setFlowConfig = (flowId: string, authenticatorType: Authenticator[]): void => {
    const config = { flowId, authenticatorType };
    dataLayer.set('flowConfig', config);
};

export const getFlowConfig = (): { flowId: string, authenticatorType: Authenticator[] } => {
    return dataLayer.get('flowConfig');
};

export const setAuthState = (state: any): void => {
    dataLayer.set('authState', state);
};

export const getAuthState = (): any => dataLayer.get('authState');