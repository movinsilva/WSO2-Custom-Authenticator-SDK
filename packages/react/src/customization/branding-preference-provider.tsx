import React, {
  FunctionComponent, PropsWithChildren, ReactElement, useEffect, useMemo, useState,
} from 'react';
import { branding } from 'asgardeo-core';
import merge from 'lodash.merge';
import { ThemeProvider } from '@oxygen-ui/react';
import { Helmet } from 'react-helmet';
import { BrandingPreferenceContext, BrandingPreferenceContextProps } from './branding-preference-context';
import { BrandingPreferenceAPIResponseInterface } from '../models/branding-preferences';
import { LIGHT_THEME } from './light-theme';
import { generateAsgardeoTheme } from './theme';
import { BrandingPreferenceMeta } from './branding-preference-meta';
import { AuthenticationConfig } from '../models/auth';
import { DataLayer } from '../utils/data-layer';

/**
 * Props interface for the Branding preference provider.
 */
interface BrandingPreferenceProviderProps {
  brandingProps?: Partial<BrandingPreferenceAPIResponseInterface>;
}

// eslint-disable-next-line max-len
const BrandingPreferenceProvider: FunctionComponent<PropsWithChildren<BrandingPreferenceProviderProps>> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>,
): ReactElement => {
  const { children, brandingProps } = props;
  const dataLayer = DataLayer.getInstance();

  // eslint-disable-next-line max-len
  const [brandingPreference, setBrandingPreference] = useState<Partial<BrandingPreferenceAPIResponseInterface>>();

  const contextValues: BrandingPreferenceContextProps = useMemo(() => {
    if (!brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return { brandingPreference: undefined };
    }

    return { brandingPreference };
  }, [brandingPreference]);

  useEffect(() => {
    try {
      const config: AuthenticationConfig = dataLayer.getAuthConfig();
      branding(config.baseUrl).then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface = response;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          console.log('Branding is not enabled');
          // to do - this has to change: merge with passed object
          setBrandingPreference(merge(resp, LIGHT_THEME) as BrandingPreferenceAPIResponseInterface);
        }
      });
    } catch (error) {
      throw new Error('Error while fetching branding preferences');
    }
  }, []);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      return BrandingPreferenceMeta.getThemeSkeleton(brandingPreference.preference.theme);
    }
  }, [brandingPreference?.preference?.theme]);

  const injectBrandingCSSSkeleton = () => {
    // eslint-disable-next-line max-len
    if (!brandingPreference?.preference?.theme || !brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return;
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
