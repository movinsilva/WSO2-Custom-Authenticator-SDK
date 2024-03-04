import {
  Box, Link, Paper, Grid, Divider,
} from '@oxygen-ui/react';
import { authorize, authenticate, getAccessToken } from 'asgardeo-core';
import React, {
  useEffect, useState, ReactElement, useContext, FunctionComponent,
} from 'react';

import BasicAuthFragment from './fragments/basic-auth-fragment';
import './sign-in-box.scss';
import {
  AuthenticationConfig,
  Authenticator,
  AuthenticatorType,
  AuthorizeApiResponseInterface,
  FlowStatus,
  IdentifiableComponentInterface,
  Metadata,
} from '../../models/auth';
import { AsgardeoProviderContext, useAuthentication } from '../asgardeo-provider/asgardeo-provider';
import { useBrandingPreference } from '../../customization/branding-preference-context';
import { BrandingPreferenceInterface } from '../../models/branding-preferences';
import TOTPFragment from './fragments/totp-fragment';
import { DataLayer } from '../../utils/data-layer';
import LoginOptionFragment from './fragments/login-option-fragment';

/**
 * Proptypes for the login box component.
 */
interface SignInBoxInterface extends IdentifiableComponentInterface {
  /**
   * Branding preferences object.
   */
  brandingPreference?: BrandingPreferenceInterface;
}

// eslint-disable-next-line max-len
const SignInBox: FunctionComponent<SignInBoxInterface> = (props: SignInBoxInterface): ReactElement => {
  const componentId = 'sign-in-box';
  const dataLayer = DataLayer.getInstance();
  let showSelfSignUp = true;

  const [flowStatus, setFlowStatus] = useState<FlowStatus>(FlowStatus.DEFAULT);
  const [authenticators, setAuthenticator] = useState<Authenticator[]>();
  const [isRetry, setIsRetry] = useState(false);
  const authContext = useContext(AsgardeoProviderContext);
  const brandingData = useBrandingPreference();

  const { accessToken } = useAuthentication();
  console.log(accessToken);

  if (!authContext) {
    throw new Error('useAuthentication must be used within a AsgardeoProvider');
  }

  useEffect(() => {
    const config: AuthenticationConfig = dataLayer.getAuthConfig();

    // to do : temporary code
    authContext.setAuthentication(false, '');

    authorize(config.baseUrl, config.clientId, config.scope, config.redirectUri)
      .then((result: AuthorizeApiResponseInterface) => {
        setFlowStatus(result.flowStatus);
        setAuthenticator(result.nextStep.authenticators);
        dataLayer.setFlowConfig(result.flowId, result.nextStep.authenticators);
        console.log('Authorization result:', result);
      })
      .catch((error: any) => {
        console.error('Authorization error:', error);
      });
  }, []);

  /**
   * Handles the token generation process.
   * @param {string} code - The code to generate the token.
   */
  const handleToken = async (code: string) => {
    const config: AuthenticationConfig = dataLayer.getAuthConfig();
    return await getAccessToken(config.baseUrl, code, config.clientId, config.redirectUri);
  };

  /**
   * Handles the generalized authentication process.
   * @param {any} authParams - The authentication parameters.
   */
  const handleAuthenticate = async (authParams: any, authenticatorId: string) => {
    const config: AuthenticationConfig = dataLayer.getAuthConfig();
    const flowConfig = dataLayer.getFlowConfig();
    const resp: AuthorizeApiResponseInterface = await authenticate(
      config.baseUrl,
      flowConfig.flowId,
      authenticatorId,
      authParams,
    );
    console.log('Authenticate response:', resp);
    showSelfSignUp = false;
    setFlowStatus(resp.flowStatus);

    if (resp.flowStatus === FlowStatus.SUCCESS_COMPLETED && resp.authData) {
      // when the authentication is successful, generate the token
      const token = await handleToken(resp.authData.code);
      authContext.setAuthentication(true, token);
      setIsRetry(true);
    } else {
      dataLayer.setFlowConfig(flowConfig.flowId, resp.nextStep.authenticators);
      setAuthenticator(resp.nextStep?.authenticators ?? []);

      if (resp.flowStatus === FlowStatus.FAIL_INCOMPLETE) {
        setIsRetry(true);
      }
    }
  };

  const handleAuthenticateOther = async (authenticatorId: string) => {
    const config: AuthenticationConfig = dataLayer.getAuthConfig();
    const flowConfig = dataLayer.getFlowConfig();
    const resp: AuthorizeApiResponseInterface = await authenticate(config.baseUrl, flowConfig.flowId, authenticatorId);
    console.log('Authenticate response:', resp);
    const metaData: Metadata = resp.nextStep.authenticators[0].metadata;
    if (metaData.promptType === 'REDIRECTION_PROMPT') {
      const popup = window.open(metaData.additionalData.redirectUrl, 'Google Login', 'width=500,height=600');

      const checkPopup = setInterval(() => {
        if (!popup || popup.closed) {
          clearInterval(checkPopup);
        } else {
          const url = new URL(popup.location.href);
          if (url.searchParams.has('code') && url.searchParams.has('state')) {
            const code = url.searchParams.get('code');
            const state = url.searchParams.get('state');
            clearInterval(checkPopup);
            popup.close();

            dataLayer.setFlowConfig(flowConfig.flowId, resp.nextStep.authenticators);
            handleAuthenticate({ code, state }, resp.nextStep.authenticators[0].authenticatorId);
          }
        }
      }, 1000);
    } else if (metaData.promptType === 'USER_PROMPT') {
      dataLayer.setFlowConfig(flowConfig.flowId, resp.nextStep.authenticators);
      setAuthenticator(resp.nextStep?.authenticators ?? []);
    }
  };

  /**
   * Generate the sign-in option based on the flow status and authenticator type.
   */
  const generateSignInOptions = () => {
    if (flowStatus !== FlowStatus.SUCCESS_COMPLETED && authenticators) {
      let usernamePassword: boolean = false;
      let isMultipleAuthenticators: boolean = false;
      let usernamePasswordID: string = '';

      if (authenticators.length > 1) {
        isMultipleAuthenticators = true;
      }
      for (const authenticator of authenticators) {
        if (authenticator.authenticator === AuthenticatorType.USERNAME_PASSWORD) {
          usernamePassword = true;
          usernamePasswordID = authenticator.authenticatorId;
        }
      }

      return (
        <>
          {/* If username and password option is there, then render the BasicAuthFragment */}
          {usernamePassword && (
            <BasicAuthFragment
              handleAuthenticate={handleAuthenticate}
              isRetry={isRetry}
              authenticatorId={usernamePasswordID}
            />
          )}

          {/* If username and password option is not there and only single option is available,
          then render the relevant fragment */}
          {!usernamePassword && !isMultipleAuthenticators && renderSignInOptions(authenticators[0])}

          {/* If username and password option is there and multiple options are available, then render the divider */}
          {usernamePassword && isMultipleAuthenticators && (
            <Divider className="oxygen-sign-in-option-divider" children={<div>Or</div>} />
          )}

          {/* If multiple options are available, then render the relevant compact fragments */}
          {isMultipleAuthenticators
            && authenticators.map((authenticator) => {
              if (authenticator.authenticator !== AuthenticatorType.USERNAME_PASSWORD) {
                return (
                  <LoginOptionFragment
                    authenticator={authenticator.authenticator}
                    handleClick={() => handleAuthenticateOther(authenticator.authenticatorId)}
                  />
                );
              }
            })}
        </>
      );
    }
  };

  const renderSignInOptions = (authenticator: Authenticator) => {
    switch (authenticator.authenticator) {
      case AuthenticatorType.TOTP:
        return <TOTPFragment handleAuthenticate={handleAuthenticate} authenticatorId={authenticator.authenticatorId} />;
    }
  };

  return (
    <div className="sign-in-box-node login-portal layout" data-componentid={`${componentId}`}>
      {flowStatus !== FlowStatus.SUCCESS_COMPLETED && brandingData && (
        <Box className="oxygen-sign-in ui form" data-componentid={`${componentId}-inner`}>
          <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
            <Box className="oxygen-sign-in-form">
              {generateSignInOptions()}
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
      {flowStatus === FlowStatus.SUCCESS_COMPLETED && (
        <div style={{ padding: '1rem', backgroundColor: 'white' }}>Successfully Authenticated</div>
      )}
    </div>
  );
};

export default SignInBox;
