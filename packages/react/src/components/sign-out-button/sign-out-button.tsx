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

import {AuthClient} from '@asgardeo/js-ui-core';
import {Button} from '@oxygen-ui/react';
import React, {useContext} from 'react';
import {AsgardeoProviderContext, useAuthentication} from '../asgardeo-provider/asgardeo-context';
import {AuthContext} from '../../models/auth';

const SignOutButton = () => {
  const authContext: AuthContext | undefined = useContext(AsgardeoProviderContext);
  const [signoutURL, setSignoutURL] = React.useState<string>('');
  AuthClient.getInstance()
    .getSignOutURL()
    .then(response => {
      console.log('signout: ', response);
      setSignoutURL(response);
    });

  const {signOut} = useAuthentication();

  return (
    <div className="asgardeo">
      <Button className="ui button primary" onClick={signOut}>
        Sign Out
      </Button>
    </div>
  );
};

export default SignOutButton;
