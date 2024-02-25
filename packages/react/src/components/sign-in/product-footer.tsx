import { FunctionComponent, ReactElement } from 'react';
import { BrandingPreferenceMeta } from '../../customization/branding-preference-meta';
import { IdentifiableComponentInterface } from '../../models/auth';
import { BrandingPreferenceInterface } from '../../models/branding-preferences';

/**
 * Proptypes for the product footer component of login screen skeleton.
 */
interface ProductFooterInterface extends IdentifiableComponentInterface {
  /**
     * Branding preferences object.
     */
  brandingPreference: BrandingPreferenceInterface;
}

/**
 * Product Footer Component.
 *
 * @param props - Props injected to the component.
 *
 * @returns Product footer component.
 */
export const ProductFooter: FunctionComponent<ProductFooterInterface> = (
  props: ProductFooterInterface,
): ReactElement => {
  const {
    'data-componentid': componentId,
    brandingPreference,
  } = props;

  const { i18n } = useBrandingPreference();

  const systemTheme: string = useSelector((state: AppState) => state.config.ui.theme?.name);

  return (
    <div data-componentid={componentId} className="footer">
      <div className="ui container fluid">
        <div className="ui text menu">
          <div className="left menu">
            <a className="item no-hover copyright-text line-break" id="copyright">
              { !isEmpty(i18n(CustomTextPreferenceConstants.TEXT_BUNDLE_KEYS.COPYRIGHT, '')) && (
              <>
                <span>{ i18n(CustomTextPreferenceConstants.TEXT_BUNDLE_KEYS.COPYRIGHT, '') }</span>
                { (brandingPreference.configs?.removeDefaultBranding === false) && (
                <div className="powered-by-logo-divider">|</div>
                ) }
              </>
              ) }
              {
                                (brandingPreference.configs?.removeDefaultBranding === false) && (
                                <Fragment>
                                  Powered by
                                  {' '}
                                  <div className="powered-by-logo">
                                    <img
                                      width="80"
                                      height="20"
                                      src={
                                                    Object.prototype.hasOwnProperty.call(
                                                      BrandingPreferenceMeta
                                                        .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                        .theme,
                                                      brandingPreference.theme.activeTheme,
                                                    )
                                                      ? BrandingPreferenceMeta
                                                        .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                        .theme[
                                                          brandingPreference.theme.activeTheme
                                                        ].images.logo.imgURL
                                                      : BrandingPreferenceMeta
                                                        .getBrandingPreferenceInternalFallbacks(systemTheme)
                                                        .theme[
                                                          BrandingPreferencesConstants.DEFAULT_THEME
                                                        ].images.logo.imgURL
                                                }
                                      alt="Asgardeo Logo"
                                    />
                                  </div>
                                </Fragment>
                                )
                            }
            </a>
          </div>
          <div className="right menu">
            {
                            !isEmpty(brandingPreference.urls?.privacyPolicyURL) && (
                            <a
                              id="privacy-policy"
                              className="item"
                              href={brandingPreference.urls.privacyPolicyURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid="login-page-privacy-policy-link"
                            >
                              { i18n(
                                CustomTextPreferenceConstants.TEXT_BUNDLE_KEYS.PRIVACY_POLICY,
                                'Privacy Policy',
                              ) }
                            </a>
                            )
                        }
            {
                            !isEmpty(brandingPreference.urls?.termsOfUseURL) && (
                            <a
                              id="terms-of-service"
                              className="item"
                              href={brandingPreference.urls.termsOfUseURL}
                              target="_blank"
                              rel="noopener noreferrer"
                              data-testid="login-page-privacy-policy-link"
                            >
                              { i18n(
                                CustomTextPreferenceConstants.TEXT_BUNDLE_KEYS.TERMS_OF_SERVICE,
                                'Terms of Service',
                              ) }
                            </a>
                            )
                        }
          </div>
        </div>
      </div>
    </div>
  );
};

/**
 * Default props for the component.
 */
ProductFooter.defaultProps = {
  'data-componentid': 'login-screen-skeleton-product-footer',
};
