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

import { Buffer } from "buffer";
import {
  AsgardeoAuthException,
  CryptoUtils,
  JWKInterface,
} from "@asgardeo/js-ui-core";
import base64url from "base64url";
import sha256 from "fast-sha256";
import { createLocalJWKSet, jwtVerify } from "jose";
import randombytes from "randombytes";

export default class SPACryptoUtils implements CryptoUtils<Buffer | string> {
  /**
   * Get URL encoded string.
   *
   * @returns {string} base 64 url encoded value.
   */
  public base64URLEncode(value: Buffer | string): string {
    //console.log("base64URLEncode called with value: ", value);
    return base64url
      .encode(value)
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=/g, "");

    // return btoa(unescape(encodeURIComponent(value.toString())));
  }

  public base64URLDecode(value: string): string {
    //console.log("base64URLDecode called with value: ", value);
    return base64url.decode(value).toString();
    // return atob(value);
  }

  public hashSha256(data: string): string | Buffer {
    // console.log("hashSha256 called with data: ", data);
    return Buffer.from(sha256(new TextEncoder().encode(data)));
  }

  public generateRandomBytes(length: number): string | Buffer {
    //console.log("generateRandomBytes called with length: ", length);
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
    //console.log("verifyJwt called with idToken: ", idToken);
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
      .catch((error) => {
        console.log("error: ", error);
        return Promise.reject(
          new AsgardeoAuthException(
            "SPA-CRYPTO-UTILS-VJ-IV01",
            error?.reason ?? JSON.stringify(error),
            `${error?.code} ${error?.claim}`
          )
        );
      });
  }
}
