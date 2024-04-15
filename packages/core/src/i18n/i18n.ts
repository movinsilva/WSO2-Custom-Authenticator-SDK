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
import {brandingText} from 'src/api/branding-text';
import {AuthClient} from 'src/auth-client/auth-client';
import {BrandingProp, BrandingPreferenceText} from 'src/model/branding-prop';
import {BrandingTextResponse} from 'src/model/branding-text-response';
import {Screen} from 'src/model/screen';

interface GetLocalizationProps {
  componentProps?: BrandingProp;
  locale: string;
  providerProps?: BrandingProp;
  screen: Screen;
}

/**
 * merge text objects
 */
// TODO - Type of ComponentProps is any. Need to update it to the correct type.
const getLocalization = async (props: GetLocalizationProps): Promise<BrandingPreferenceText> => {
  const {componentProps, locale, providerProps, screen} = props;
  /* Default stored branding */
  const module: any = await import(`./screens/${screen}/${locale}.ts`); // PRIORITY 04

  let textFromConsoleBranding: BrandingTextResponse; // PRIORITY 03

  if ((await AuthClient.getInstance().getDataLayer().getConfigData()).enableConsoleTextBranding ?? true) {
    try {
      textFromConsoleBranding = await brandingText(locale, providerProps.name, screen, providerProps.type);
    } catch (error) {
      // TODO - Need to update the error message.
      console.log('Error while fetching text from console branding', error);
    }
  }

  /* Merge all together */
  const mergedText: BrandingPreferenceText = await merge(
    module[screen] ?? {},
    textFromConsoleBranding?.preference?.text ?? {},
    providerProps?.preference?.text?.[locale]?.[screen] ?? {},
    componentProps?.preference?.text?.[locale]?.[screen] ?? {},
  );

  return mergedText;
};

export default getLocalization;
