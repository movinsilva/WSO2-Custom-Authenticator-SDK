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

import {Button} from '@oxygen-ui/react';
import {ReactElement} from 'react';
import facebook from '../../../assets/social-logins/facebook.svg';
import github from '../../../assets/social-logins/github.svg';
import google from '../../../assets/social-logins/google.svg';
import {LoginOptionFragmentPropsInterface} from '../../../models/auth';

const images: {[key: string]: any} = {
  Github: github,
  Google: google,
  facebook,
};

/**
 * The Login Option Fragment component which consists of the social login buttons.
 *
 * @component
 * @param {LoginOptionFragmentPropsInterface} props The props of the component
 * @returns {ReactElement} The Login Option Fragment component
 */
const LoginOptionFragment = (props: LoginOptionFragmentPropsInterface): ReactElement => {
  const {authenticator, handleClick} = props;
  return (
    <Button
      startIcon={<img className="oxygen-sign-in-option-image" src={images[authenticator]} alt={authenticator} />}
      variant="contained"
      className="oxygen-sign-in-option"
      type="button"
      fullWidth
      onClick={() => handleClick()}
    >
      Sign In With {authenticator}
    </Button>
  );
};

export default LoginOptionFragment;
