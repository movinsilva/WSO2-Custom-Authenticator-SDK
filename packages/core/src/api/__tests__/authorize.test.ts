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
import {authorize, exportedForTesting} from '../authorize';

const {authorizeRequestBuilder} = exportedForTesting;
g;

describe('authorize', () => {
  const baseUrl = 'https://localhost:9443';
  const scope = 'openid';
  const redirect_uri = 'https://localhost:5173';
  const client_id = 'fyGmog7fpcFgTNTOqLFIGIt2laQa';

  describe('authorizeRequestBuilder', () => {
    test('should return a request object with the correct parameters', async () => {
      const request = authorizeRequestBuilder(baseUrl, client_id, scope, redirect_uri);
      expect(request.method).toBe('POST');
      expect(request.headers.get('Content-Type')).toBe('application/x-www-form-urlencoded');
      expect(request.headers.get('Accept')).toBe('application/json');
      expect(request.url).toBe(`${baseUrl}/oauth2/authorize`);
      expect(await request.text()).toBe(
        `client_id=${client_id}&scope=${scope}&response_type=code&response_mode=direct&redirect_uri=${encodeURIComponent(redirect_uri)}`,
      );
    });
  });

  describe('authorizeFunction', () => {
    test('should return a response object', async () => {
      const mockFetch = jest.fn(() => Promise.resolve({flowId: 'flowId'}));
      jest.mock(authorize, () => ({
        return {
          authorize: jest.fn().mockImplementation(() => {
            fetch: mockFetch
          })
        
        }
      }));
      const response = await authorize(baseUrl, client_id, scope, redirect_uri);
      console.log('response', response);
      expect(response).toBeInstanceOf(Object);
    });
  });
});
