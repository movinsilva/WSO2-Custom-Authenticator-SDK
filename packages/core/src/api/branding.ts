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

import { getAuthInstance } from '../asgardeo-auth-js';
import AsgardeoException from '../exception/exception';
import { BrandingPreferenceAPIResponseInterface } from '../model';
import { getBrandingUrl } from '../utils/url-generator';

/**
 * Fetches branding data from the server.
 * @returns {Promise<Response>} The response from the server.
 * @throws {AsgardeoException} If there is an error while fetching branding data or if the response is not ok.
 */
const branding = async (): Promise<BrandingPreferenceAPIResponseInterface> => {
  const { baseUrl } = await getAuthInstance().getDataLayer().getConfigData();
  let response: Response;
  try {
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    response = await fetch(getBrandingUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';
  } catch (error) {
    throw new AsgardeoException('JS_UI_CORE-BR-BR-NE01', 'Error while fetching branding data.', error);
  }
  if (response.ok) {
    return (await response.json()) as Promise<BrandingPreferenceAPIResponseInterface>;
  }
  throw new AsgardeoException('JS_UI_CORE-BR-BR-HE02', 'Branding response is not ok');
};

export default branding;
