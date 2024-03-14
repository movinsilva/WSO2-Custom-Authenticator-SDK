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

import React, { FunctionComponent, ReactElement } from "react";
import { useBrandingPreference } from "../branding-preference-provider/branding-preference-context";
import "./header.scss";

/**
 * Proptypes for the product header component of login screen skeleton.
 */
interface HeaderInterface {}

const componentId = "login-screen-skeleton-product-header";

/**
 * Product Header Component.
 *
 * @param props - Props injected to the component.
 * @returns Product Header Component.
 */
const Header: FunctionComponent<HeaderInterface> = (
  props: HeaderInterface
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
          src={
            brandingPreference.theme[brandingPreference.theme.activeTheme]
              .images.logo.imgURL
          }
          id="product-logo"
          alt={
            brandingPreference.theme[brandingPreference.theme.activeTheme]
              .images.logo.altText
          }
        />
      )}
    </div>
  );
};

/**
 * Default props for the component.
 */
Header.defaultProps = {
  "data-componentid": componentId,
};

export default Header;
