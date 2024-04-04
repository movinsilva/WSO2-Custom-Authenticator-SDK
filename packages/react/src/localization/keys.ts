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

import { LocalizationResponse } from "@asgardeo/js-ui-core";

const localizationKeys: LocalizationResponse = {
  common: {
    dividerText: "common.dividerText",
    registerLink: "common.registerLink",
    registerPreText: "common.registerPreText",
    rememberMe: "common.rememberMe",
  },
  login: {
    forgotPasswordLinkLabel: "login.forgotPasswordLinkLabel",
    loginButtonLabel: "login.loginButtonLabel",
    passwordLabel: "login.passwordLabel",
    passwordPlaceHolder: "login.passwordPlaceHolder",
    retryText: "login.retryText",
    signinHeader: "login.signinHeader",
    usernameLabel: "login.usernameLabel",
    usernamePlaceHolder: "login.usernamePlaceHolder",
  },
  socialLogins: {
    preText: "socialLogins.preText",
  },
  totp: {
    otpLabel: "totp.otpLabel",
    verifyButtonLabel: "totp.verifyButtonLabel",
  },
};

export default localizationKeys;
