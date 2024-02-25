import React, { FunctionComponent, ReactElement } from 'react';
import { BrandingPreferenceInterface } from '../../models/branding-preferences';

import { IdentifiableComponentInterface } from '../../models/auth';

/**
 * Proptypes for the product header component of login screen skeleton.
 */
interface ProductHeaderInterface extends IdentifiableComponentInterface {
  /**
     * Branding preferences object.
     */
  brandingPreference: BrandingPreferenceInterface;
}

/**
 * Product Header Component.
 *
 * @param props - Props injected to the component.
 * @returns Product Header Component.
 */
export const ProductHeader: FunctionComponent<ProductHeaderInterface> = (
  props: ProductHeaderInterface,
): ReactElement => {
  const {
    'data-componentid': componentId,
    brandingPreference,
  } = props;

  return (
    <div className="theme-icon inline auto transparent product-logo portal-logo" data-componentid={componentId}>
      <img
        src={
                    brandingPreference.theme[brandingPreference.theme.activeTheme].images.logo.imgURL
                }
        id="product-logo"
        alt={
                    brandingPreference.theme[brandingPreference.theme.activeTheme].images.logo.altText
                }
      />
    </div>
  );
};

/**
 * Default props for the component.
 */
ProductHeader.defaultProps = {
  'data-componentid': 'login-screen-skeleton-product-header',
};
