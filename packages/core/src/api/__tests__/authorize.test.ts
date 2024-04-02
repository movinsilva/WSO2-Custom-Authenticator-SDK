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

import {describe, jest, test, expect} from '@jest/globals';
import {SpyInstance} from 'jest-mock';
import * as authJS from '../../asgardeo-auth-js/index';
import {exportedForTesting} from '../authorize';

const {authorizeRequestBuilder} = exportedForTesting;

const mockBaseUrl: string = 'https://mockbaseurl:9443';
const mockScope: string = 'mockScope';
const mockRedirectUri: string = 'https://mockUrl:5173';
const mockClientId: string = 'mockClientId';
const mockResponseType: string = 'mockResponseType';
const mockResponseMode: string = 'direct';

const mock: SpyInstance = jest.spyOn(authJS, 'getAuthInstance');
mock.mockImplementation((): any => ({
  getAuthorizationURL: () =>
    `${mockBaseUrl}/oauth2/authorize?scope=${mockScope}&response_type=${mockResponseType}&response_mode=${mockResponseMode}&redirect_uri=${mockRedirectUri}&client_id=${mockClientId}`,
  getDataLayer: () => ({
    getConfigData: () => ({
      baseUrl: mockBaseUrl,
      clientID: mockClientId,
      signInRedirectURL: mockRedirectUri,
    }),
    setTemporaryDataParameter: () => jest.fn(),
  }),
  getOIDCServiceEndpoints: () => ({
    authorizationEndpoint: `${mockBaseUrl}/oauth2/authorize`,
  }),
}));

describe('authorize', () => {
  test('getAuthorizePostRequest: should return a request object with the correct request type', async () => {
    const request: Request = await authorizeRequestBuilder();
    expect(request.method).toBe('POST');
    expect(request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
    expect(request.headers.get('Accept')).toBe('application/json');
    expect(request.url).toBe(`${mockBaseUrl}/oauth2/authorize`);
  });

  test('getAuthorizePostRequest: should return a request object with the correct request parameters', async () => {
    const request: Request = await authorizeRequestBuilder();
    const requestText: string = await request.text();

    expect(requestText).toContain(`client_id=${mockClientId}`);
    expect(requestText).toContain(`response_mode=${mockResponseMode}`);
    expect(requestText).toContain(`scope=${mockScope}`);
    expect(requestText).toContain(`redirect_uri=${encodeURIComponent(mockRedirectUri)}`);
    expect(requestText).toContain('response_type=code');
  });
});
