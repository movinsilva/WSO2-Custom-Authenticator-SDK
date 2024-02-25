import {
  Box, Link, Paper, Grid,
} from '@oxygen-ui/react';
import {
  authorize, branding, authenticate,
} from 'asgardeo-core';
import React, {
  useEffect, useState, ReactElement, useContext, FunctionComponent,
} from 'react';

import BasicAuthFragment from './fragments/basic-auth-fragment';
import './sign-in-box.scss';
import {
  Authenticator, AuthenticatorType, AuthorizeApiResponseInterface, FlowStatus, IdentifiableComponentInterface,
} from '../../models/auth';
import { MyProviderContext } from '../asgardeo-provider/asgardeo-provider';
import { useBrandingPreference } from '../../customization/branding-preference-context';
import { BrandingPreferenceInterface } from '../../models/branding-preferences';
import TOTPFragment from './fragments/totp-fragment';

/**
 * Proptypes for the login box component of login screen skeleton.
 */
interface SignInBoxInterface extends IdentifiableComponentInterface {
  /**
   * Branding preferences object.
   */
  brandingPreference: BrandingPreferenceInterface;
}

let showSelfSignUp = true;

const SignInBox: FunctionComponent<SignInBoxInterface> = (props: SignInBoxInterface): ReactElement => {
  const componentId = 'sign-in-box';

  const [authz, setAuthz] = useState<AuthorizeApiResponseInterface>();
  const [flowStatus, setFlowStatus] = useState<FlowStatus>(FlowStatus.DEFAULT);
  const [authenticator, setAuthenticator] = useState<Authenticator[]>();
  const [brandingData, setBrandingData] = useState('');
  const authContext = useContext(MyProviderContext);

  const { brandingPreference } = useBrandingPreference();
  console.log('branding from signin: ', brandingPreference);

  if (!authContext) {
    throw new Error('useAuthentication must be used within a AuthProvider');
  }

  useEffect(() => {
    console.log('isAuthenticated from useeffect:', flowStatus);
    authorize()
      .then((result: AuthorizeApiResponseInterface) => {
        setFlowStatus(result.flowStatus);
        setAuthenticator(result.nextStep.authenticators);
        console.log('Authorization result:', result);
      })
      .catch((error: any) => {
        console.error('Authorization error:', error);
      });

    branding()
      .then((result: any) => {
        console.log('Branding result:', result);
        setBrandingData(result);
      })
      .catch((error: any) => {
        console.error('Branding error:', error);
      });
  }, []);

  const handleAuthenticate = async (username: string, password: string) => {
    // Call the authenticate function with the username and password
    const resp: AuthorizeApiResponseInterface = await authenticate({ username, password });
    console.log('Authenticate response:', resp);
    showSelfSignUp = false;
    setFlowStatus(resp.flowStatus);
    setAuthenticator(resp.nextStep?.authenticators ?? []);
  };

  // to do- if similar merge with handleAuthenticate
  const handleAuthenticateTOTP = async (token: string) => {
    // Call the authenticate function with the username and password
    const resp: AuthorizeApiResponseInterface = await authenticate({ token });
    console.log('Authenticate response from totp:', resp, '\n flows: ', resp.flowStatus);
    setFlowStatus(resp.flowStatus);
    setAuthenticator(resp.nextStep?.authenticators ?? []);
  };

  // eslint-disable-next-line max-len
  const generateBasicSignInOption = () => {
    if (flowStatus === FlowStatus.INCOMPLETE && authenticator) {
      switch (authenticator[0].authenticator) {
        case AuthenticatorType.USERNAME_PASSWORD:
          return <BasicAuthFragment handleAuthenticate={handleAuthenticate} />;
        case AuthenticatorType.TOTP:
          return <TOTPFragment handleAuthenticateTotp={handleAuthenticateTOTP} />;
      }
    }
  };

  return (
    <div className="sign-in-box-node login-portal layout" data-componentid={`${componentId}`}>
      {flowStatus === FlowStatus.INCOMPLETE && brandingData && (
        <Box className="oxygen-sign-in ui form" data-componentid={`${componentId}-inner`}>
          <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
            <Box className="oxygen-sign-in-form">
              {generateBasicSignInOption()}
              <div className="oxygen-sign-in-options-wrapper" />
              {showSelfSignUp && (
                <Grid container className="oxygen-sign-in-sign-up-link">
                  <Grid>Don&apos;t have an account? </Grid>
                  <Grid>
                    <Link href="#" className="oxygen-sign-in-sign-up-link-action">
                      Register
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Paper>
        </Box>
      )}
      {flowStatus === FlowStatus.SUCCESS_COMPLETED && <div>Successfully Authenticated</div>}
    </div>
  );
};

export default SignInBox;
