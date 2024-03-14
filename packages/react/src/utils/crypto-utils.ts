/**
 * Copyright (c) 2024, WSO2 LLC. (https://www.wso2.com). All Rights Reserved.
 *
 * WSO2 LLC. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { createLocalJWKSet, jwtVerify } from "jose";
import AsgardeoAuthException from "../exception/exception";
import { CryptoUtils, JWKInterface } from "../models/auth-js";

// Function to generate random bytes of specified length
function randombytes(length: number): string {
  const bytes = new Uint8Array(length);
  window.crypto.getRandomValues(bytes);
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, "0")).join(
    ""
  );
}

export default class SPACryptoUtils
  implements CryptoUtils<Promise<string> | string>
{
  /* eslint-disable class-methods-use-this */

  /**
   * Get URL encoded string.
   *
   * @returns {string} base 64 url encoded value.
   */
  public base64URLEncode(value: string): string {
    const utf8Value = unescape(encodeURIComponent(value));
    return btoa(utf8Value)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");
    // return base64url.encode(value).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  }

  public base64URLDecode(value: string): string {
    return atob(value).toString();
    // return base64url.decode(value).toString();
  }

  public async hashSha256(data: string): Promise<string> {
    // return Buffer.from(sha256(new TextEncoder().encode(data)));
    // encode as UTF-8
    const msgBuffer = new TextEncoder().encode(data);

    // hash the message
    const hashBuffer = await crypto.subtle.digest("SHA-256", msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string
    const hashHex = hashArray
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");
    return hashHex;
  }

  public generateRandomBytes(length: number): string {
    return randombytes(length);
  }

  public verifyJwt(
    idToken: string,
    jwk: Partial<JWKInterface>,
    algorithms: string[],
    clientID: string,
    issuer: string,
    subject: string,
    clockTolerance?: number,
    validateJwtIssuer?: boolean
  ): Promise<boolean> {
    const jwtVerifyOptions = {
      algorithms,
      audience: clientID,
      clockTolerance,
      subject,
      issuer,
    };

    if (validateJwtIssuer ?? true) {
      jwtVerifyOptions.issuer = issuer;
    }

    return jwtVerify(
      idToken,
      createLocalJWKSet({
        keys: [jwk],
      }),
      jwtVerifyOptions
    )
      .then(() => Promise.resolve(true))
      .catch((error) =>
        Promise.reject(
          new AsgardeoAuthException(
            "SPA-CRYPTO-UTILS-VJ-IV01",
            error?.reason ?? JSON.stringify(error),
            `${error?.code} ${error?.claim}`
          )
        )
      );
  }

  /* eslint-disable class-methods-use-this */
}
