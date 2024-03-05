import { createContext, useContext } from 'react';
import { BrandingPreferenceAPIResponseInterface } from '../../models/branding-preferences';

/**
 * Props interface for BrandingPreferenceContext.
 */
export type BrandingPreferenceContextProps = {
  /**
     * The branding preferences to be stored in the context.
     */
  brandingPreference: BrandingPreferenceAPIResponseInterface;
};

/**
 * Context object for managing branding preferences.
 */

export const BrandingPreferenceContext = createContext<BrandingPreferenceContextProps | undefined>(undefined);

/**
 * Display name for the BrandingPreferenceContext.
 */
BrandingPreferenceContext.displayName = 'BrandingPreferenceContext';

/**
 * Hook to access the branding preferences from the context.
 *
 * @returns {BrandingPreferenceContextProps} The branding preferences from the context.
 */
export function useBrandingPreference(): BrandingPreferenceContextProps {
  const context = useContext(BrandingPreferenceContext) as BrandingPreferenceContextProps;

  if (!context) {
    throw new Error('useBrandingPreference must be used within a BrandingPreferenceProvider');
  }

  return context;
}
