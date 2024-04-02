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

import {describe, test, jest, expect} from '@jest/globals';
import {SpyInstance} from 'jest-mock';
import * as authJS from '../../asgardeo-auth-js/asgardeo-auth-js';
import {exportedForTesting} from '../branding-text';

const {getBrandingTextRequest} = exportedForTesting;

describe('branding-text', () => {
  const mockBaseUrl: string = 'https://mockbaseurl:9443';

  const mock: SpyInstance = jest.spyOn(authJS, 'getAuthInstance');
  mock.mockImplementation((): any => ({
    getDataLayer: () => ({
      getConfigData: () => ({
        baseUrl: mockBaseUrl,
      }),
    }),
  }));

  test('getBrandingTextRequest: should return a request object with correct parametres', async () => {
    const mockLocale: string = 'en';
    const mockName: string = 'name';
    const mockScreen: string = 'screen';
    const mockType: string = 'type';
    const request: Request = await getBrandingTextRequest(mockLocale, mockName, mockScreen, mockType);
    expect(request.method).toBe('GET');
    expect(request.url).toContain(`${mockBaseUrl}`);
    expect(request.url).toContain(`locale=${mockLocale}`);
    expect(request.url).toContain(`name=${mockName}`);
    expect(request.url).toContain(`screen=${mockScreen}`);
    expect(request.url).toContain(`type=${mockType}`);
  });
});
