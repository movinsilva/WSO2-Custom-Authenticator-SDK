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

import { brandingText } from "@asgardeo/ui-core";
import React, { FunctionComponent, ReactElement, useEffect } from "react";
import { isEmpty } from "../../utils/common";
import { useBrandingPreference } from "../branding-preference-provider/branding-preference-context";
import "./footer.scss";

const componentId = "login-screen-skeleton-product-footer";
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
const Footer: FunctionComponent<FooterInterface> = (
  props: FooterInterface
): ReactElement => {
  const { brandingPreference } = useBrandingPreference();
  const [text, setText] = React.useState();

  useEffect(() => {
    if (brandingPreference) {
      brandingText(
        brandingPreference?.locale,
        brandingPreference?.name,
        "common",
        brandingPreference?.type
      ).then((response: any) => {
        setText(response?.preference.text);
      });
    }
  }, [brandingPreference]);

  return !brandingPreference?.preference ? (
    <div />
  ) : (
    <div data-componentid={componentId} className="footer">
      <div className="ui container fluid">
        <div className="ui text menu">
          <div className="left menu">
            <a
              href="www.google.com"
              className="item no-hover copyright-text line-break"
              id="copyright"
            >
              <div className="powered-by-logo">
                <div>{text?.copyright}</div>
              </div>
            </a>
          </div>
          <div className="right menu">
            {!isEmpty(
              brandingPreference?.preference.urls?.privacyPolicyURL
            ) && (
              <a
                id="privacy-policy"
                className="item"
                href={brandingPreference?.preference.urls.privacyPolicyURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {text ? text["privacy.policy"] : ""}
              </a>
            )}
            {!isEmpty(brandingPreference?.preference.urls?.termsOfUseURL) && (
              <a
                id="terms-of-service"
                className="item"
                href={brandingPreference?.preference.urls.termsOfUseURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {text ? text["terms.of.service"] : ""}
              </a>
            )}
            {!isEmpty(brandingPreference?.preference.urls?.termsOfUseURL) && (
              <a
                id="terms-of-service"
                className="item"
                href={brandingPreference?.preference.urls.termsOfUseURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {brandingPreference.locale}
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
  "data-componentid": "login-screen-skeleton-product-footer",
};

export default Footer;
