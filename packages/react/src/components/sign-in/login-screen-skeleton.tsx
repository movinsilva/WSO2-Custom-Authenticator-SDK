import React, { FunctionComponent, ReactElement } from 'react';
import { BrandingPreferenceInterface } from '../../models/branding-preferences';

import { ProductHeader } from './product-header';
import SignInBox from '../sign-in-box/sign-in-box';
import { IdentifiableComponentInterface } from '../../models/auth';

/**
 * Proptypes for the Branding preference preview component.
 */
interface LoginScreenSkeletonInterface extends IdentifiableComponentInterface {
  /**
     * Branding preferences object.
     */
  brandingPreference: BrandingPreferenceInterface;
  /**
     * Layout HTML Content.
     */
  layoutContent: string;
}

export const LoginScreenSkeleton: FunctionComponent<LoginScreenSkeletonInterface> = (
  props: LoginScreenSkeletonInterface,
): ReactElement => {
  const {
    'data-componentid': componentId,
    brandingPreference,
    layoutContent,
  } = props;

  return (
    <div data-componentid={componentId} className="login-portal layout authentication-portal-layout">
      <ProductHeader
        brandingPreference={brandingPreference}
        data-componentid={`${componentId}-product-header`}
      />
      <SignInBox
        brandingPreference={brandingPreference}
        data-componentid={`${componentId}-login-box`}
      />
      {/* <ProductFooter
                brandingPreference={ brandingPreference }
                data-componentid={ `${ componentId }-product-footer` }
            /> */}

    </div>
  );
};

/**
 * Default props for the component.
 */
LoginScreenSkeleton.defaultProps = {
  'data-componentid': 'login-screen-skeleton',
};
