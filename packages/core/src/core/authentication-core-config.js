export class AuthenticationCoreConfig {
  constructor(baseUrl, clientId, scope, redirectUri) {
    this.baseUrl = baseUrl;
    this.clientId = clientId;
    this.scope = scope;
    this.redirectUri = redirectUri;
  }

  getAuthorizeUrl() {
    return `${this.baseUrl}/oauth2/authorize`;
  }

  getAuthnUrl() {
    return `${this.baseUrl}/oauth2/authn`;
  }

  getTokenUrl() {
    return `${this.baseUrl}/oauth2/token`;
  }

  getClientId() {
    return this.clientId;
  }

  getScope() {
    return this.scope;
  }

  getRedirectUri() {
    return this.redirectUri;
  }
}
