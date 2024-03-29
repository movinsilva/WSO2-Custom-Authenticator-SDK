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

import {
  describe, jest, test, expect,
} from '@jest/globals';
import { SpyInstance } from 'jest-mock';
import * as AuthJS from '../../asgardeo-auth-js/asgardeo-auth-js';
import { exportedForTesting } from '../me';

const { getMeRequest } = exportedForTesting;

describe('me', () => {
  const mockUrl: string = 'https://mockbaseurl:9443';
  const mock: SpyInstance = jest.spyOn(AuthJS, 'getAuthInstance');
  mock.mockImplementation((): any => ({
    getAccessToken: () => ({
      getAccessToken: '',
    }),
  }));

  test('getMeRequest: should return a request object with correct parametres', async () => {
    const request: Request = await getMeRequest(mockUrl);
    expect(request.method).toBe('GET');
    expect(request.headers.get('Authorization')).toContain('Bearer');
    expect(request.url).toContain(`${mockUrl}`);
  });
});
