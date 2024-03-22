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

import { getAuthInstance } from 'src/asgardeo-auth-js';
import AsgardeoException from 'src/exception/exception';
import { getBrandingUrl } from '../utils/url-generator';

const branding = async (): Promise<Response> => {
  try {
    const { baseUrl } = await getAuthInstance().getDataLayer().getConfigData();

    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
    const response: Response = await fetch(getBrandingUrl(baseUrl));
    // process.env.NODE_TLS_REJECT_UNAUTHORIZED = '1';

    if (response.ok) {
      return await response.json();
    }
    throw new AsgardeoException('UI_CORE-BR-BR-01', 'Branding response is not ok');
  } catch (error) {
    throw new AsgardeoException('UI_CORE-BR-BR-02', 'Error while fetching branding data.', error);
  }
};

export default branding;
