import React, {FunctionComponent, PropsWithChildren, ReactElement, useEffect, useMemo, useState} from 'react';
import {branding} from 'asgardeo-core';
import merge from 'lodash.merge';
import {ThemeProvider} from '@oxygen-ui/react';
import {BrandingPreferenceContext, BrandingPreferenceContextProps} from './branding-preference-context';
import {BrandingPreferenceAPIResponseInterface} from '../../models/branding-preferences';
import LIGHT_THEME from '../../customization/light-theme';
import generateAsgardeoTheme from '../../customization/theme';
import BrandingPreferenceMeta from '../../customization/branding-preference-meta';
import {useConfig} from '../asgardeo-provider/asgardeo-context';
import {Helmet} from 'react-helmet';

/**
 * Props interface for the Branding preference provider.
 */
interface BrandingPreferenceProviderProps {
  brandingProps?: Partial<BrandingPreferenceAPIResponseInterface>;
}

const BrandingPreferenceProvider: FunctionComponent<PropsWithChildren<BrandingPreferenceProviderProps>> = (
  props: PropsWithChildren<BrandingPreferenceProviderProps>,
): ReactElement => {
  const {children, brandingProps} = props;
  const {config} = useConfig();

  const [brandingPreference, setBrandingPreference] = useState<Partial<BrandingPreferenceAPIResponseInterface>>();

  const contextValues: BrandingPreferenceContextProps = useMemo(() => {
    if (!brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return {brandingPreference: undefined};
    }

    return {brandingPreference};
  }, [brandingPreference]);

  useEffect(() => {
    try {
      branding(config.baseUrl).then((response: any) => {
        const resp: BrandingPreferenceAPIResponseInterface = response;
        if (resp?.preference?.configs?.isBrandingEnabled) {
          setBrandingPreference(merge(resp, brandingProps));
        } else {
          setBrandingPreference(merge(resp, LIGHT_THEME) as BrandingPreferenceAPIResponseInterface);
        }
      });
    } catch (error) {
      throw new Error(`Error while fetching branding preferences: ${error}`);
    }
  }, []);

  const theme: string | undefined = useMemo(() => {
    if (brandingPreference?.preference?.theme) {
      return BrandingPreferenceMeta.getThemeSkeleton(brandingPreference.preference.theme);
    }
    return undefined;
  }, [brandingPreference?.preference?.theme]);

  const injectBrandingCSSSkeleton = () => {
    if (!brandingPreference?.preference?.theme || !brandingPreference?.preference?.configs?.isBrandingEnabled) {
      return null;
    }

    return <style type="text/css">{theme}</style>;
  };

  return (
    <BrandingPreferenceContext.Provider value={contextValues}>
      {/* to do - whether to use helmet or not */}
      <Helmet>{injectBrandingCSSSkeleton()}</Helmet>
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
