export class AuthenticationCoreConfig {

  static getAuthorizeUrl(baseUrl) {
    return `${baseUrl}/oauth2/authorize`;
  }

  static getAuthnUrl(baseUrl) {
    return `${baseUrl}/oauth2/authn`;
  }

  static getTokenUrl(baseUrl) {
    return `${baseUrl}/oauth2/token`;
  }

  static getBrandingUrl(baseUrl) {
    return `${baseUrl}/api/server/v1/branding-preference`;
  }
}
