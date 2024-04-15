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

import {BrandingPreferenceAPIResponseInterface, BrandingProp, branding} from '@asgardeo/js-ui-core';
import {ThemeProvider} from '@oxygen-ui/react';
import merge from 'lodash.merge';
import React, {FunctionComponent, PropsWithChildren, ReactElement, useEffect, useMemo, useState} from 'react';
import {BrandingPreferenceContext} from './branding-preference-context';
import BrandingPreferenceMeta from '../../customization/branding-preference-meta';
import DEFAULT_BRANDING from '../../customization/default_branding';
import generateAsgardeoTheme from '../../customization/theme';
import {i18nInitialize} from '../../localization/i18n/i18n';

/**
 * Props interface for the Branding preference provider.
 */
interface BrandingPreferenceProviderProps {
  brandingProps?: BrandingProp;
}

const BrandingPreferenceProvider: FunctionComponent<PropsWithChildren<BrandingPreferenceProviderProps>> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>,
): ReactElement => {
  const {children, brandingProps} = props;

  const [brandingPreference, setBrandingPreference] =
    useState<Partial<BrandingPreferenceAPIResponseInterface>>(DEFAULT_BRANDING);

  const contextValues: BrandingProp = useMemo(
    () => ({
      ...brandingProps,
    }),
    [brandingProps],
  );

  useEffect(() => {
    try {
      branding().then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface = response as BrandingPreferenceAPIResponseInterface;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          setBrandingPreference(merge(DEFAULT_BRANDING, brandingProps) as BrandingPreferenceAPIResponseInterface);
        }
      });
    } catch (error) {
      throw new Error(`Error while fetching branding preferences: ${error}`);
    }
    i18nInitialize(brandingProps?.locale ?? 'en-US');
  }, []);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      return BrandingPreferenceMeta.getThemeSkeleton(brandingPreference.preference.theme);
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
      {console.log('contextValues from branding-preference-provider: ', contextValues)}
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
