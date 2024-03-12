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

export default class IdentityException extends Error {
  public code: string | undefined;

  public override name: string;

  public override message: string;

  public override stack: string;

  constructor(code: string, name: string, message: string, stack?: any) {
    super(message);
    this.code = `ui-core-${code}`;
    this.name = name;
    this.stack = stack;
    Object.setPrototypeOf(this, new.target.prototype);
  }

  /* The error printing style modified to show the code first */
  override toString(): string {
    return `\ncode: ${this.code}\nname: ${this.name}\nmessage: ${this.message}`;
  }
}
