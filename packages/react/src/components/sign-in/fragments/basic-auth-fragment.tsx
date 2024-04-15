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

import {BrandingProp, LocalizationResponse, Screen, keys} from '@asgardeo/js-ui-core';
import {Box, CircularProgress} from '@oxygen-ui/react';
import Button from '@oxygen-ui/react/Button';
import Checkbox from '@oxygen-ui/react/Checkbox';
import FormControlLabel from '@oxygen-ui/react/FormControlLabel';
import FormGroup from '@oxygen-ui/react/FormGroup';
import TextField from '@oxygen-ui/react/TextField';
import Typography from '@oxygen-ui/react/Typography';
import React, {ReactElement, useEffect, useState} from 'react';
import {Trans, useTranslation} from 'react-i18next';
import {i18nAddResources} from '../../../localization/i18n/i18n';
import localizationKeys from '../../../localization/keys';
import {SignInFragmentPropsInterface} from '../../../models/auth';
import {useBrandingPreference} from '../../branding-preference-provider/branding-preference-context';

/**
 * Basic Auth Fragment component which consists of the basic authentication form
 * containing username and password fields.
 *
 * @component
 * @param {SignInFragmentPropsInterface} props The props of the component
 * @returns {ReactElement} The Basic Auth Fragment component
 */
const BasicAuthFragment = (props: SignInFragmentPropsInterface): ReactElement => {
  const {handleAuthenticate, authenticatorId, isRetry, customization} = props;
  const [isTextLoading, setIsTextLoading] = useState<boolean>(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const brandingProps: BrandingProp = useBrandingPreference();

  useEffect(() => {
    i18nAddResources({
      brandingProps,
      componentProps: customization,
      screen: Screen.Login,
    }).then(() => {
      setIsTextLoading(false);
    });
  }, []);

  const {t} = useTranslation();

  if (isTextLoading) {
    return (
      <div className="circular-progress-holder">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }

  return (
    <div className="basic-auth-fragment">
      <Typography align="center" className="oxygen-sign-in-header ui header" variant="h4">
        {console.log('ui rendering happening now:)')}
        <Trans i18nKey={keys.login.login.heading} />
      </Typography>
      {isRetry && (
        <Box className="oxygen-sign-in-retry-header-box">
          <Typography className="oxygen-sign-in-error ui sub header">
            <Trans i18nKey={localizationKeys.login.retryText} />
          </Typography>
        </Box>
      )}

      <TextField
        required
        fullWidth
        autoComplete="off"
        label={t(keys.login.username)}
        name="text"
        value={username}
        placeholder={t(keys.login.enter.your.username)}
        className="ui input"
        onChange={e => setUsername(e.target.value)}
      />
      <TextField
        required
        fullWidth
        name="password"
        autoComplete="new-password"
        label={t(keys.login.password)}
        type="password"
        value={password}
        placeholder={t(keys.login.enter.your.password)}
        className="input"
        onChange={e => setPassword(e.target.value)}
      />
      <FormGroup className="">
        <FormControlLabel control={<Checkbox color="secondary" />} label={t(keys.login.remember.me)} />
      </FormGroup>
      <Button
        color="primary"
        variant="contained"
        className="oxygen-sign-in-cta ui primary button"
        type="submit"
        fullWidth
        onClick={() => {
          handleAuthenticate({password, username}, authenticatorId);
          setUsername('');
          setPassword('');
        }}
      >
        {t(keys.login.button)}
      </Button>
    </div>
  );
};

/**
 * Default props for the Basic Auth fragment component.
 */
BasicAuthFragment.defaultProps = {
  'data-componentid': 'basic-auth-fragment',
};

export default BasicAuthFragment;
