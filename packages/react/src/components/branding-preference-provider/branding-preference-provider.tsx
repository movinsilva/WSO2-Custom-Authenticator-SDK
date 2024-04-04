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
  BrandingPreferenceAPIResponseInterface,
  BrandingPreferenceConfigInterface,
  BrandingPreferenceInterface,
  BrandingPreferenceThemeInterface,
  BrandingPreferenceTypes,
  branding,
} from "@asgardeo/js-ui-core";
import { ThemeProvider } from "@oxygen-ui/react";
import merge from "lodash.merge";
import React, {
  FunctionComponent,
  PropsWithChildren,
  ReactElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  BrandingPreferenceContext,
  BrandingPreferenceContextProps,
} from "./branding-preference-context";
import BrandingPreferenceMeta from "../../customization/branding-preference-meta";
import DEFAULT_BRANDING from "../../customization/default_branding";
import generateAsgardeoTheme from "../../customization/theme";
import i18nInitialize from "../../localization/i18n/i18n";
import { LanguageCode, Localization } from "../../models/localization";
import {
  Customization,
  NewPreference,
  PreferenceWithText,
} from "../../models/customization";

/**
 * Props interface for the Branding preference provider.
 */
interface BrandingPreferenceProviderProps {
  brandingProps?: Partial<BrandingPreferenceAPIResponseInterface>;
  localization?: Localization;
}

const BrandingPreferenceProvider: FunctionComponent<
  PropsWithChildren<BrandingPreferenceProviderProps>
> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>
): ReactElement => {
  const { children, brandingProps, localization } = props;

  const [brandingPreference, setBrandingPreference] =
    useState<Partial<BrandingPreferenceAPIResponseInterface>>(DEFAULT_BRANDING);

  const [customization, setCustomization] = useState<Customization>();

  const contextValues: BrandingPreferenceContextProps = useMemo(
    () => ({
      brandingPreference,
      localizationLanguage:
        localization?.languageCode ?? LanguageCode.ENGLISH_US,
    }),
    [brandingPreference]
  );

  useEffect(() => {
    try {
      branding().then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface =
          response as BrandingPreferenceAPIResponseInterface;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          setBrandingPreference(
            merge(
              DEFAULT_BRANDING,
              brandingProps
            ) as BrandingPreferenceAPIResponseInterface
          );
        }

        // TEST
        if (brandingPreference && brandingPreference.preference?.configs) {
          setCustomization({
            locale: brandingPreference.locale ?? "en-US",
            name: brandingPreference.name ?? "carbon.super",
            type: brandingPreference.type ?? BrandingPreferenceTypes.ORG,
            preference: {
              ...brandingPreference.preference,
              text: {
                "en-US": {
                  common: {
                    "site.title": "site title",
                    "terms.of.service": "terms of services",
                    "privacy.policy": "pr po",
                  },
                },
              },
            },
          } as Customization);
        }
        console.log("customization: ", customization);
      });
    } catch (error) {
      throw new Error(`Error while fetching branding preferences: ${error}`);
    }
    i18nInitialize(localization);
  }, []);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      return BrandingPreferenceMeta.getThemeSkeleton(
        brandingPreference.preference.theme
      );
    }
    return undefined;
  }, [brandingPreference?.preference?.theme]);

  const injectBrandingCSSSkeleton: any = (): React.ReactNode => {
    if (!brandingPreference?.preference?.theme) {
      return null;
    }

    return <style type="text/css">{theme}</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={contextValues}>
      {/* TODO - whether to use helmet or not */}
      {injectBrandingCSSSkeleton()}
      {console.log(
        "contextValues from branding-preference-provider: ",
        contextValues.brandingPreference
      )}
      <ThemeProvider
        theme={generateAsgardeoTheme(contextValues.brandingPreference)}
        defaultMode="light"
        modeStorageKey="myaccount-oxygen-mode"
      >
        {children}
      </ThemeProvider>
    </BrandingPreferenceContext.Provider>
  );
};

export default BrandingPreferenceProvider;
