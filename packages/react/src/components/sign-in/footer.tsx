import React, { FunctionComponent, ReactElement } from 'react';
import { useBrandingPreference } from '../branding-preference-provider/branding-preference-context';
import { isEmpty } from '../../utils/common';

const componentId = 'login-screen-skeleton-product-footer';
/**
 * Proptypes for the product footer component of login screen skeleton.
 */
interface FooterInterface {}

/**
 * Product Footer Component.
 *
 * @param props - Props injected to the component.
 *
 * @returns Product footer component.
 */
const Footer: FunctionComponent<FooterInterface> = (props: FooterInterface): ReactElement => {
  const brandingData = useBrandingPreference();
  const brandingPreference = brandingData?.brandingPreference?.preference;

  return !brandingPreference ? (
    <div />
  ) : (
    <div data-componentid={componentId} className="footer">
      <div className="ui container fluid">
        <div className="ui text menu">
          <div className="left menu">
            <a href="www.google.com" className="item no-hover copyright-text line-break" id="copyright">
              <div className="powered-by-logo">
                <div>WSO2 LLC SDK</div>
              </div>
            </a>
          </div>
          <div className="right menu">
            {!isEmpty(brandingPreference.urls?.privacyPolicyURL) && (
              <a
                id="privacy-policy"
                className="item"
                href={brandingPreference.urls.privacyPolicyURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                Privacy Policy
              </a>
            )}
            {!isEmpty(brandingPreference.urls?.termsOfUseURL) && (
              <a
                id="terms-of-service"
                className="item"
                href={brandingPreference.urls.termsOfUseURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                Terms of Service
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Default props for the component.
 */
Footer.defaultProps = {
  'data-componentid': 'login-screen-skeleton-product-footer',
};

export default Footer;
