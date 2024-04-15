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

import {BrandingProp, Screen, keys} from '@asgardeo/js-ui-core';
import {Box, Button, TextField, Typography} from '@oxygen-ui/react';
import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {Trans} from 'react-i18next';
import {i18nAddResources} from '../../../localization/i18n/i18n';
import {SignInFragmentPropsInterface} from '../../../models/auth';
import {useBrandingPreference} from '../../branding-preference-provider/branding-preference-context';

const componentId: string = 'totp-fragment';

/**
 * TOTP fragment login option component with input fields.
 *
 * @param props - Props injected to the component.
 * @returns TOTP fragment login option as a React component.
 */
const TOTPFragment = (props: SignInFragmentPropsInterface): ReactElement => {
  const brandingProps: BrandingProp = useBrandingPreference();

  const {handleAuthenticate, authenticatorId, isRetry, customization} = props;

  const [isTextLoading, setIsTextLoading] = useState<boolean>();

  useEffect(() => {
    i18nAddResources({
      brandingProps,
      componentProps: customization,
      screen: Screen.Totp,
    }).then(() => {
      setIsTextLoading(false);
    });
  }, []);

  const [totp, setTotp] = useState(Array(6).fill('')); // Initialize a state variable for the TOTP

  const refs = useRef(totp.map(() => React.createRef<HTMLInputElement>()));

  const handleChange = (index: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const newTotp = [...totp];
    newTotp[index] = event.target.value;
    setTotp(newTotp);

    // If a character is entered and there's a next TextField, focus it
    if (event.target.value && index < totp.length - 1) {
      refs.current[index + 1].current?.focus();
    }
  };

  const handleKeyDown = (index: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    // If the backspace key is pressed and the current field is empty
    if (event.key === 'Backspace' && totp[index] === '') {
      // Prevent the default action to stop deleting characters in the previous field
      event.preventDefault();

      // If there's a previous field, focus it
      if (index > 0) {
        refs.current[index - 1].current?.focus();

        // Clear the value of the previous field
        const newTotp = [...totp];
        newTotp[index - 1] = '';
        setTotp(newTotp);
      }
    }
  };

  const handleSubmit = () => {
    const token = totp.join('');
    handleAuthenticate({token}, authenticatorId);
  };

  return (
    <div className="totp-fragment" data-componentid={componentId}>
      <Typography align="center" className="oxygen-sign-in-header ui header" variant="h4">
        <Trans i18nKey={keys.totp.heading} />
      </Typography>
      {isRetry && (
        <Box className="oxygen-sign-in-retry-header-box">
          <Typography className="oxygen-sign-in-error ui sub header">
            Verification failed! Please check your authenticator code and try again
          </Typography>
        </Box>
      )}
      <Typography align="center" className="oxygen-sign-in-sub-header ui sub header" variant="subtitle1">
        <Trans i18nKey={keys.totp.enter.verification.code.got.by.device} />
      </Typography>
      <div className="pin-code-input-fields">
        {[...Array(6)].map((_: number, index: number) => (
          <TextField
            key={`pincode-${index + 1}`}
            id={`pincode-${index + 1}`}
            name="number"
            placeholder="."
            className="input"
            value={totp[index]}
            onChange={handleChange(index)}
            inputRef={refs.current[index]}
            inputProps={{maxLength: 1}}
            onKeyDown={handleKeyDown(index)}
          />
        ))}
      </div>
      <Button
        color="primary"
        variant="contained"
        className="oxygen-sign-in-cta ui primary button"
        type="submit"
        fullWidth
        onClick={handleSubmit}
      >
        <Trans i18nKey={keys.totp.continue} />
      </Button>
      <Typography align="center" className="oxygen-sign-in-sub-header ui sub header" variant="subtitle2">
        <Trans i18nKey={keys.totp.enroll.message1} />
        <Trans i18nKey={keys.totp.enroll.message2} />
      </Typography>
    </div>
  );
};

/**
 * Default props for the TOTP fragment component.
 */
TOTPFragment.defaultProps = {
  'data-componentid': componentId,
};

export default TOTPFragment;
