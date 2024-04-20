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

import merge from 'lodash.merge';
import {AuthClient} from 'src/auth-client/auth-client';
import DEFAULT_BRANDING from './default-branding/default_branding';
import branding from '../api/branding';
import {BrandingPreferenceAPIResponseInterface, BrandingPreferenceThemeInterface} from '../model/branding-response';

interface BrandingProps {
  componentProps?: BrandingPreferenceThemeInterface;
  providerProps?: BrandingPreferenceThemeInterface;
}

export const getBranding = async (props: BrandingProps): Promise<BrandingPreferenceThemeInterface> => {
  const {providerProps, componentProps} = props;
  let brandingFromConsole: BrandingPreferenceAPIResponseInterface;
  if ((await AuthClient.getInstance().getDataLayer().getConfigData()).enableConsoleBranding) {
    brandingFromConsole = await branding();
  }

  const mergedBranding: BrandingPreferenceThemeInterface = await merge(
    DEFAULT_BRANDING.preference.theme,
    providerProps,
    componentProps,
    brandingFromConsole.preference.theme,
  );

  return mergedBranding;
};
