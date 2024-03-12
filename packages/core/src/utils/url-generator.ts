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

export const getAuthorizeUrl = (baseUrl: string): string => `${baseUrl}/oauth2/authorize`;

export const getAuthnUrl = (baseUrl: string): string => `${baseUrl}/oauth2/authn`;

export const getBrandingUrl = (baseUrl: string): string => `${baseUrl}/api/server/v1/branding-preference`;

export const getMeUrl = (baseUrl: string): string => `${baseUrl}/scim2/Me`;
