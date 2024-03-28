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

import { LocalizationResponse } from "@asgardeo/ui-core";
import i18n from "i18next";
import merge from "lodash.merge";
import { initReactI18next } from "react-i18next";
import englishLocalization from "./translation/en-US.json";
import frenchLocalization from "./translation/fr-FR.json";
import { LanguageCode, Localization } from "../../models/localization";

const i18nInitialize = (localization: Localization | undefined): void => {
  let languageCode: LanguageCode = LanguageCode.ENGLISH_US;
  let languageResource: Partial<LocalizationResponse> | undefined;

  if (localization) {
    languageCode = localization.languageCode || LanguageCode.ENGLISH_US;
    if (localization.languageResource) {
      languageResource = localization.languageResource;
    }
  }

  /* Assigns english localization if merging fails */
  let mergedResource: LocalizationResponse = englishLocalization;
  if (languageResource !== undefined) {
    switch (languageCode) {
      case LanguageCode.FRENCH:
        mergedResource = merge(frenchLocalization, languageResource);
        break;
      default:
        mergedResource = merge(englishLocalization, languageResource);
    }
    /* Assigns custom language code so that merged localization applies */
    languageCode = LanguageCode.CUSTOM;
  }

  i18n.use(initReactI18next).init({
    fallbackLng: LanguageCode.ENGLISH_US,
    interpolation: {
      escapeValue: false,
    },
    lng: languageCode,
    resources: {
      [LanguageCode.ENGLISH_US]: {
        translation: englishLocalization,
      },
      [LanguageCode.FRENCH]: {
        translation: frenchLocalization,
      },
      ...(languageResource && {
        [languageCode]: {
          translation: mergedResource,
        },
      }),
    },
  });
};

export default i18nInitialize;
