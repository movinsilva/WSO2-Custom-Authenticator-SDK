import React, {
  FunctionComponent, PropsWithChildren, ReactElement, useEffect, useMemo, useState,
} from 'react';
import { branding } from 'asgardeo-core';
import merge from 'lodash.merge';
import { ThemeProvider } from '@oxygen-ui/react';
import { Helmet } from 'react-helmet';
import { BrandingPreferenceContext } from './branding-preference-context';
import { BrandingPreferenceAPIResponseInterface, PredefinedThemes } from '../models/branding-preferences';
import { LIGHT_THEME } from './light-theme';
import { generateAsgardeoTheme } from './theme';
import { BrandingPreferenceMeta } from './branding-preference-meta';
import { AuthenticationConfig } from '../models/auth';
import { getAuthConfig } from '../utils/config-data-layer';

/**
 * Props interface for the Branding preference provider.
 */
export type BrandingPreferenceProviderProps = PropsWithChildren;

export const BrandingPreferenceProvider: FunctionComponent<BrandingPreferenceProviderProps> = (props: BrandingPreferenceProviderProps): ReactElement => {
  const { children } = props;

  const [brandingPreference, setBrandingPreference] = useState<BrandingPreferenceAPIResponseInterface>();

  useEffect(() => {
    try {
      const config: AuthenticationConfig = getAuthConfig();
      branding(config.baseUrl).then((response: any) => {
        console.log('branding preference resp: ', response);
        const resp = response as BrandingPreferenceAPIResponseInterface;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          console.log('theme is predefined');
          setBrandingPreference(resp);
        } else {
          console.log('theme is not predefined');
          // to do - this has to change: merge with passed object
          setBrandingPreference(merge(resp, LIGHT_THEME) as BrandingPreferenceAPIResponseInterface);
        }
      });
    } catch (error) {
      console.error('Error while fetching branding preferences: ', error);
    }
  }, []);

  useEffect(() => {
    console.log('Effective branding preference: ', brandingPreference, '\n _theme: ', _theme ? 'theme' : 'no theme');
  }, [brandingPreference]);

  const _theme: string = useMemo(
    () => BrandingPreferenceMeta.getThemeSkeleton(brandingPreference?.preference?.theme),
    [brandingPreference?.preference?.theme],
  );

  const injectBrandingCSSSkeleton = () => {
    if (!brandingPreference?.preference?.theme || !brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return;
    }

    return <style type="text/css">{ _theme }</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={{ brandingPreference }}>
      <Helmet>
        { injectBrandingCSSSkeleton() }
      </Helmet>
      <ThemeProvider
        theme={generateAsgardeoTheme(brandingPreference)}
        defaultMode="light"
        modeStorageKey="myaccount-oxygen-mode"
      >
        {children}
      </ThemeProvider>
    </BrandingPreferenceContext.Provider>
  );
};
