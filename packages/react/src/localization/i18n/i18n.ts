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

import {BrandingPreferenceText, BrandingProp, Screen, getLocalization} from '@asgardeo/js-ui-core';
import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';

export const i18nInitialize = (languageCode: string): void => {
  i18n.use(initReactI18next).init({
    fallbackLng: 'en-US',
    interpolation: {
      escapeValue: false,
    },
    lng: languageCode,
    ns: ['ns'],
  });
};

interface I18nAddResourcesProps {
  brandingProps?: BrandingProp;
  componentProps?: BrandingProp;
  screen: Screen;
}

export const i18nAddResources = async (props: I18nAddResourcesProps): Promise<boolean> => {
  const {screen, brandingProps, componentProps} = props;
  const locale: string = componentProps?.locale ?? brandingProps?.locale ?? 'en-US';

  /* getLocalization function from core returns the merged text according to priority */
  const resources: BrandingPreferenceText = await getLocalization({
    componentProps,
    locale,
    providerProps: brandingProps,
    screen,
  });

  i18n.addResourceBundle(locale, 'ns', {
    [screen]: resources,
  });

  i18n.changeLanguage(locale);

  return true;
};
