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

import { LocalizationResponse, branding } from "@asgardeo/ui-core";
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
import i18nInitialize from "../../localization/i18n/i18n";
import defaultLocalization from "../../localization/keys";
import { BrandingPreferenceAPIResponseInterface } from "../../models/branding-preferences";
import { Localization } from "../../models/localization";

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
    useState<Partial<BrandingPreferenceAPIResponseInterface>>();

  const contextValues: BrandingPreferenceContextProps = useMemo(
    () => ({ brandingPreference, textPreference: defaultLocalization }),
    [brandingPreference]
  );

  const tt: any = {
    common: {
      rememberMe: "Remember me on this computer",
      dividerText: "or",
      registerLink: "Register",
      registerPreText: "Don't have an account?",
    },
    login: {
      signinHeader: "Something to test",
      usernameLabel: "Username",
      usernamePlaceHolder: "Enter your username",
      passwordLabel: "Password",
      passwordPlaceHolder: "Enter your password",
      loginButtonLabel: "Sign In",
      forgotPasswordLinkLabel: "Forgot Password?",
      retryText:
        "Login failed! Please check your username and password and try again",
    },
    socialLogins: {
      preText: "Sign in with",
    },
    totp: {
      otpLabel: "TOTP Code",
      verifyButtonLabel: "Verify",
    },
  };
  i18nInitialize(localization);

  useEffect(() => {
    try {
      branding().then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface = response;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          setBrandingPreference(
            merge(
              LIGHT_THEME,
              brandingProps
            ) as BrandingPreferenceAPIResponseInterface
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
    if (!brandingPreference?.preference?.theme) {
      return null;
    }

    return <style type="text/css">{theme}</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={contextValues}>
      {/* TODO - whether to use helmet or not */}
      {injectBrandingCSSSkeleton()}
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
