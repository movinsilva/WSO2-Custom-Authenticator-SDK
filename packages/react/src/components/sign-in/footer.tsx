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

import {
  AsgardeoUIException,
  BrandingTextPreference,
  BrandingTextResponse,
  brandingText,
} from "@asgardeo/js-ui-core";
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
  const { brandingPreference, localizationLanguage } = useBrandingPreference();

  console.log("textPreference", localizationLanguage);
  const [brandingTextPreference, setBrandingTextPreference] =
    React.useState<BrandingTextPreference>();

  useEffect(() => {
    try {
      if (brandingPreference) {
        brandingText(
          localizationLanguage,
          brandingPreference?.name ?? "carbon.super",
          "common",
          brandingPreference?.type ?? "ORG"
        ).then((response: BrandingTextResponse) => {
          setBrandingTextPreference(response?.preference);
        });
      }
    } catch (error) {
      throw new AsgardeoUIException(
        "REACT_UI-FOOTER-SE01",
        "Error in fetching branding text",
        error
      );
    }
  }, [brandingPreference]);

  return !brandingTextPreference ? (
    <div />
  ) : (
    <div data-componentid={componentId} className="footer">
      <div className="ui container fluid">
        <div className="ui text menu">
          <div className="left menu">
            <div className="powered-by-logo">
              <div>
                {brandingTextPreference.text.copyright &&
                brandingTextPreference.text.copyright.includes(
                  "{{currentYear}}"
                )
                  ? brandingTextPreference.text.copyright.replace(
                      "{{currentYear}}",
                      new Date().getFullYear().toString()
                    )
                  : brandingTextPreference?.text.copyright}
              </div>
            </div>
          </div>
          <div className="right menu">
            {!isEmpty(
              brandingPreference?.preference?.urls?.privacyPolicyURL
            ) && (
              <a
                id="privacy-policy"
                className="item"
                href={brandingPreference?.preference?.urls.privacyPolicyURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {brandingTextPreference
                  ? brandingTextPreference.text["privacy.policy"]
                  : ""}
              </a>
            )}
            {!isEmpty(brandingPreference?.preference?.urls?.termsOfUseURL) && (
              <a
                id="terms-of-service"
                className="item"
                href={brandingPreference?.preference?.urls.termsOfUseURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {brandingTextPreference
                  ? brandingTextPreference.text["terms.of.service"]
                  : ""}
              </a>
            )}
            {!isEmpty(brandingPreference?.preference?.urls?.termsOfUseURL) && (
              <a
                id="terms-of-service"
                className="item"
                href={brandingPreference?.preference?.urls.termsOfUseURL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="login-page-privacy-policy-link"
              >
                {localizationLanguage}
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
