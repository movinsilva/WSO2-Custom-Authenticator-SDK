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

interface LocalizationResponse {
  common: {
    dividerText: string;
    registerLink: string;
    registerPreText: string;
    rememberMe: string;
  };
  login: {
    forgotPasswordLinkLabel: string;
    loginButtonLabel: string;
    passwordLabel: string;
    passwordPlaceHolder: string;
    retryText: string;
    signinHeader: string;
    usernameLabel: string;
    usernamePlaceHolder: string;
  };
  socialLogins: {
    preText: string;
  };
  test?: string;
  // TODO: Add the rest of the localization keys
  totp: {
    otpLabel: string;
    verifyButtonLabel: string;
  };
}

export default LocalizationResponse;
