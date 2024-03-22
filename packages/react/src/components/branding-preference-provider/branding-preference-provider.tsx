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

import { branding } from "@asgardeo/ui-core";
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
import LIGHT_THEME from "../../customization/light-theme";
import generateAsgardeoTheme from "../../customization/theme";
import { BrandingPreferenceAPIResponseInterface } from "../../models/branding-preferences";
import { useConfig } from "../asgardeo-provider/asgardeo-context";

/**
 * Props interface for the Branding preference provider.
 */
interface BrandingPreferenceProviderProps {
  brandingProps?: Partial<BrandingPreferenceAPIResponseInterface>;
}

const BrandingPreferenceProvider: FunctionComponent<
  PropsWithChildren<BrandingPreferenceProviderProps>
> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>
): ReactElement => {
  const { children, brandingProps } = props;
  const { config } = useConfig();

  const [brandingPreference, setBrandingPreference] =
    useState<Partial<BrandingPreferenceAPIResponseInterface>>();

  const contextValues: BrandingPreferenceContextProps = useMemo(() => {
    if (!brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return { brandingPreference: undefined };
    }

    return { brandingPreference };
  }, [brandingPreference]);

  useEffect(() => {
    try {
      branding().then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface = response;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          setBrandingPreference(
            merge(resp, LIGHT_THEME) as BrandingPreferenceAPIResponseInterface
          );
        }
      });
    } catch (error) {
      throw new Error(`Error while fetching branding preferences: ${error}`);
    }
  }, []);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      return BrandingPreferenceMeta.getThemeSkeleton(
        brandingPreference.preference.theme
      );
    }
    return undefined;
  }, [brandingPreference?.preference?.theme]);

  const injectBrandingCSSSkeleton = () => {
    if (
      !brandingPreference?.preference?.theme ||
      !brandingPreference?.preference?.configs?.isBrandingEnabled
    ) {
      return null;
    }

    return <style type="text/css">{theme}</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={contextValues}>
      {/* to do - whether to use helmet or not */}
      {injectBrandingCSSSkeleton()}
      <ThemeProvider
        theme={generateAsgardeoTheme(contextValues)}
        defaultMode="light"
        modeStorageKey="myaccount-oxygen-mode"
      >
        {children}
      </ThemeProvider>
    </BrandingPreferenceContext.Provider>
  );
};

export default BrandingPreferenceProvider;
