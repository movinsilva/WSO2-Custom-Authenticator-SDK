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

import { FunctionComponent, PropsWithChildren } from "react";
import { SignedPropsInterface } from "../../models/auth";
import { useAuthentication } from "../asgardeo-provider/asgardeo-context";

/**
 * This component shows the child component only if the user is authenticated.
 * Otherwise, it shows the placeholder.
 *
 * @component
 * @param {SignedInPropsInterface} props The props of the component
 * @returns {ReactElement} The authenticated component.
 * @example
 * ```tsx
 * <SignedIn fallback={<div>Not authenticated</div>}>
 *  <div>Authenticated</div>
 * </SignedIn>
 * ```
 */
const SignedIn: FunctionComponent<PropsWithChildren<SignedPropsInterface>> = (
  props: PropsWithChildren<SignedPropsInterface>
) => {
  const { fallback, children } = props;
  const { isAuthenticated } = useAuthentication();

  return <>{isAuthenticated === true ? children : fallback ?? null}</>;
};

export default SignedIn;
