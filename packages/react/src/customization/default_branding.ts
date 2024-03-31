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

import DARK_THEME from "./dark-theme";
import LIGHT_THEME from "./light-theme";
import {
  BrandingPreferenceAPIResponseInterface,
  BrandingPreferenceTypes,
  PredefinedLayouts,
  PredefinedThemes,
} from "../models/branding-preferences";

const DEFAULT_BRANDING: BrandingPreferenceAPIResponseInterface = {
  preference: {
    theme: {
      activeTheme: PredefinedThemes.LIGHT,
      LIGHT: LIGHT_THEME,
      DARK: DARK_THEME,
    },
    configs: {
      isBrandingEnabled: false,
    },
    layout: {
      activeLayout: PredefinedLayouts.CENTERED,
    },
    organizationDetails: {
      displayName: "",
      supportEmail: "",
    },
    urls: {
      cookiePolicyURL: "",
      privacyPolicyURL: "",
      termsOfUseURL: "",
    },
  },
  locale: "",
  name: "",
  type: BrandingPreferenceTypes.ORG,
};

export default DEFAULT_BRANDING;
