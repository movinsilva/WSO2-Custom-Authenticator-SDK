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

export interface AuthApiResponse {
  authData?: AuthData;
  flowId: string;
  flowStatus: FlowStatus;
  flowType: string;
  links: Link[];
  nextStep: AuthStep;
}

/* authData comes when the user is successfully authenticated */
export interface AuthData {
  code: string;
  session_state: string;
}

export enum FlowStatus {
  FailIncomplete = 'FAIL_INCOMPLETE',
  Incomplete = 'INCOMPLETE',
  SuccessCompleted = 'SUCCESS_COMPLETED',
}

export interface Link {
  href: string;
  method: string;
  name: string;
}

export interface AuthStep {
  authenticators: Authenticator[];
  stepType: string; // "MULTI_OPTIONS_PROMPT"
}

export interface Authenticator {
  authenticator: string;
  authenticatorId: string;
  idp: string;
  metadata: Metadata;
  requiredParams: string[];
}

export interface Metadata {
  additionalData?: AdditionalData;
  i18nKey: string;
  params?: Params;
  promptType: string;
}

/**
 *  "params": [
                        {
                            "param": "username",
                            "type": "STRING",
                            "order": 0,
                            "i18nKey": "username.param",
                            "displayName": "Username",
                            "confidential": false
                        },
                        {
                            "param": "password",
                            "type": "STRING",
                            "order": 1,
                            "i18nKey": "password.param",
                            "displayName": "Password",
                            "confidential": true
                        }
                    ]
 */
export interface Params {
  confidential: boolean;
  displayName: string;
  i18nKey: string;
  order: number;
  param: string;
  type: string;
}

export interface AdditionalData {
  redirectUrl: string;
  state: string;
}

// TODO
export interface AuthnParams {
  authenticatorID: string;
  authenticatorParametres?: any;
  flowID: string;
}
