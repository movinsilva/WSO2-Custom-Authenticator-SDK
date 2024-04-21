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

import {
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  FormGroup,
  Grid,
  Link,
  Paper,
  TextField,
} from '@oxygen-ui/react';
import clsx from 'clsx';
import {FC, PropsWithChildren} from 'react';
import {SignInOption, SignInOptionProps} from './sign-in-option/sign-in-option';
import {SignInTitleSection, SignInTitleSectionProps} from './title-section/title-section';
import './sign-in.scss';

interface SignInProps {
  className?: string;
  logoUrl?: string;
  onSignIn?: () => void;
  signInOptions?: JSX.Element;
  signUpUrl?: string;
}

const SignIn: FC<PropsWithChildren<SignInProps>> & {
  InputField: FC;
  Option: FC<PropsWithChildren<SignInOptionProps>>;
  TitleSection: FC<SignInTitleSectionProps>;
} = (props: PropsWithChildren<SignInProps>) => {
  const {children, className, logoUrl, signInOptions, signUpUrl, onSignIn, ...rest} = props;
  const classes: string = clsx('oxygen-sign-in', className);
  return (
    <Box className={classes} {...rest}>
      {logoUrl && <Box className="oxygen-sign-in-logo" component="img" src={logoUrl} />}
      <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
        <Box className="oxygen-sign-in-form" component="form" onSubmit={onSignIn} noValidate sx={{mt: 1}}>
          {children}
          <FormGroup>
            <FormControlLabel control={<Checkbox defaultChecked />} label="Remember me on this computer" />
          </FormGroup>
          <Button color="primary" variant="contained" className="oxygen-sign-in-cta" type="submit" fullWidth>
            Sign In
          </Button>
          {signInOptions && (
            <div className="oxygen-sign-in-options-wrapper">
              <Divider>OR</Divider>
              <div className="oxygen-sign-in-options">{signInOptions}</div>
            </div>
          )}
          {signUpUrl && (
            <Grid container className="oxygen-sign-in-sign-up-link">
              <Grid>Don&apos;t have an account?</Grid>
              <Grid>
                <Link href={signUpUrl} className="oxygen-sign-in-sign-up-link-action">
                  Sign up
                </Link>
              </Grid>
            </Grid>
          )}
        </Box>
      </Paper>
    </Box>
  );
};

SignIn.InputField = TextField;
SignIn.TitleSection = SignInTitleSection;
SignIn.Option = SignInOption;

export default SignIn;
