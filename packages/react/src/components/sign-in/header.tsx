import React, { FunctionComponent, ReactElement } from 'react';
import { useBrandingPreference } from '../branding-preference-provider/branding-preference-context';

/**
 * Proptypes for the product header component of login screen skeleton.
 */
interface HeaderInterface {

}

const componentId = 'login-screen-skeleton-product-header';

/**
 * Product Header Component.
 *
 * @param props - Props injected to the component.
 * @returns Product Header Component.
 */
const Header: FunctionComponent<HeaderInterface> = (
  props: HeaderInterface,
): ReactElement => {
  const brandingData = useBrandingPreference();
  const brandingPreference = brandingData?.brandingPreference?.preference;

  return (
    <div
      className="theme-icon inline auto transparent product-logo portal-logo"
      data-componentid={componentId}
    >
      {brandingPreference && (
        <img
          src={brandingPreference.theme[brandingPreference.theme.activeTheme].images.logo.imgURL}
          id="product-logo"
          alt={brandingPreference.theme[brandingPreference.theme.activeTheme].images.logo.altText}
        />
      )}
    </div>
  );
};

/**
 * Default props for the component.
 */
Header.defaultProps = {
  'data-componentid': componentId,
};

export default Header;
