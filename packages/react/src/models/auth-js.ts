export interface Store {
  getData(key: string): Promise<string>;
  removeData(key: string): Promise<void>;
  setData(key: string, value: string): Promise<void>;
}

/**
 * JWK Model
 */
export interface JWKInterface {
  alg: string;
  e: string;
  kid: string;
  kty: string;
  n: string;
  use: string;
}

/**
 * The interface that defines the CryptoUtils methods.
 *
 * T is the type of the data passed as the argument into the `base64URLEncode` method.
 */
export interface CryptoUtils<T = any> {
  /**
     * Decode the provided data encoded in base64url format.
     *
     * @param value - Data to be decoded.
     *
     * @returns Decoded data.
     */
  base64URLDecode(value: string): string;

  /**
     * Encode the provided data in base64url format.
     *
     * @param value - Data to be encoded.
     *
     * @returns Encoded data.
     */
  base64URLEncode(value: T): string;

  /**
     * Generate random bytes.
     *
     * @param length - Length of the random bytes to be generated.
     *
     * @returns Random bytes.
     */
  generateRandomBytes(length: number): T;

  /**
     * Hash the provided data using SHA-256.
     *
     * @param data - Data to be hashed.
     *
     * @returns Hashed data.
     */
  hashSha256(data: string): Promise<string | T>;

  /**
     * Verify the provided JWT.
     *
     * @param idToken - ID Token to be verified.
     * @param jwk - JWK to be used for verification.
     * @param algorithms - Algorithms to be used for verification.
     * @param clientID - Client ID to be used for verification.
     * @param issuer - Issuer to be used for verification.
     * @param subject - Subject to be used for verification.
     * @param clockTolerance - Clock tolerance to be used for verification.
     *
     * @returns True if the ID Token is valid.
     *
     * @throws if the id_token is invalid.
     */
  verifyJwt(
    idToken: string,
    jwk: JWKInterface,
    algorithms: string[],
    clientID: string,
    issuer: string,
    subject: string,
    clockTolerance?: number,
    validateJwtIssuer?: boolean
  ): Promise<boolean>;
}
