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

import {describe, jest, test, expect, beforeAll} from '@jest/globals';
import {SpyInstance} from 'jest-mock';
import * as AuthJS from '../../asgardeo-auth-js/asgardeo-auth-js';
import {AuthnParams} from '../../model';
import {exportedForTesting} from '../authenticate';

const {getAuthenticateRequest} = exportedForTesting;

describe('authenticate', () => {
  beforeAll(() => {});

  const mockAuthenticatorID: string = 'authenticatorID';
  const mockAuthenticatorParametres: any = {param: 'param'};
  const mockBaseUrl: string = 'https://localhost:9443';
  const mockFlowID: string = 'flowID';
  const mockProps: AuthnParams = {
    authenticatorID: mockAuthenticatorID,
    authenticatorParametres: mockAuthenticatorParametres,
    flowID: mockFlowID,
  };

  const mock: SpyInstance = jest.spyOn(AuthJS, 'getAuthInstance');
  mock.mockImplementation((): any => ({
    getDataLayer: () => ({
      getConfigData: () => ({
        baseUrl: mockBaseUrl,
      }),
    }),
  }));

  test('getAuthnRequest: should return a request object with the correct parameters', async () => {
    const request: Request = await getAuthenticateRequest(mockProps);
    expect(request.method).toBe('POST');
    expect(request.headers.get('Content-Type')).toBe('application/json');
    expect(request.url).toBe(`${mockBaseUrl}/oauth2/authn`);
    expect(await request.text()).toBe(
      JSON.stringify({
        flowId: mockFlowID,
        selectedAuthenticator: {
          authenticatorId: mockAuthenticatorID,
          params: mockAuthenticatorParametres,
        },
      }),
    );
  });

  test('getAuthnRequest: getAuthInstance should be called only once', () => {
    expect(mock).toHaveBeenCalledTimes(1);
  });
});
