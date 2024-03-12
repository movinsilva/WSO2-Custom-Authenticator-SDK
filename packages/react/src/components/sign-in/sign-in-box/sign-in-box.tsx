import {Box, Link, Paper, Grid, Divider, Typography} from '@oxygen-ui/react';
import {authorize, authenticate, getAuthInstance} from '@asgardeo/ui-core';
import React, {useEffect, useState, ReactElement, useContext, FunctionComponent} from 'react';
import BasicAuthFragment from './fragments/basic-auth-fragment';
import './sign-in-box.scss';
import {
  Authenticator,
  AuthenticatorType,
  AuthorizeApiResponseInterface,
  FlowStatus,
  IdentifiableComponentInterface,
  Metadata,
} from '../../../models/auth';
import {AsgardeoProviderContext, useConfig} from '../../asgardeo-provider/asgardeo-context';
import {useBrandingPreference} from '../../branding-preference-provider/branding-preference-context';
import {BrandingPreferenceInterface} from '../../../models/branding-preferences';
import TOTPFragment from './fragments/totp-fragment';
import LoginOptionFragment from './fragments/login-option-fragment';

/**
 * Proptypes for the login box component.
 */
interface SignInBoxInterface extends IdentifiableComponentInterface {
  /**
   * Branding preferences object.
   */
  brandingPreference?: BrandingPreferenceInterface;
  setIsLoading: Function;
}

/**
 * The sign-in box component.
 *
 * @component
 * @param {SignInBoxInterface} props The props of the component
 * @returns {ReactElement} The sign-in box component
 */
const SignInBox: FunctionComponent<SignInBoxInterface> = (props: SignInBoxInterface): ReactElement => {
  const componentId = 'sign-in-box';
  //TODO: Remove this after first authentication step
  let showSelfSignUp = true;
  const [isRetry, setIsRetry] = useState(false);
  const {config} = useConfig();
  const {setIsLoading} = props;

  // const [flowStatus, setFlowStatus] = useState<FlowStatus>(FlowStatus.DEFAULT);
  const [authResponse, setAuthResponse] = useState<AuthorizeApiResponseInterface>();
  //const [authenticators, setAuthenticator] = useState<Authenticator[]>();
  const authContext = useContext(AsgardeoProviderContext);
  const brandingData = useBrandingPreference();

  if (!authContext) {
    throw new Error('useAuthentication must be used within a AsgardeoProvider');
  }

  useEffect(() => {
    // This script is added so that the popup window can send the code and state to the parent window
    const url = new URL(window.location.href);
    if (url.searchParams.has('code') && url.searchParams.has('state')) {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');

      // Send the 'code' and 'state' to the parent window and close the current window (popup)
      window.opener.postMessage({code, state}, config.redirectUri);
      window.close();
    }

    console.log('use effect called');

    authorize(config.baseUrl, config.clientId, config.scope, config.redirectUri).then(
      (result: AuthorizeApiResponseInterface) => {
        console.log('Authorization called with result:', result);
        setAuthResponse(result);
      },
    );
  }, []);

  /**
   * Handles the generalized authentication process.
   * @param {any} authParams - The authentication parameters.
   */
  const handleAuthenticate = async (authParams: any, authenticatorId: string) => {
    const resp: AuthorizeApiResponseInterface = await authenticate({
      flowID: authResponse?.flowId,
      authenticatorID: authenticatorId,
      authenticatorParametres: authParams,
    });
    console.log('Authenticate response:', resp);

    // when the authentication is successful, generate the token
    if (resp.flowStatus === FlowStatus.SUCCESS_COMPLETED && resp.authData) {
      console.log('successful authentication');
      setAuthResponse(resp);
      const authInstance = getAuthInstance();
      await authInstance.requestAccessToken(resp.authData.code, resp.authData.session_state);
      authContext.setAuthentication();
    } else {
      if (resp.flowStatus === FlowStatus.FAIL_INCOMPLETE) {
        setAuthResponse({
          ...resp,
          nextStep: authResponse.nextStep,
        });
      } else {
        setAuthResponse(resp);
      }
    }
  };

  const handleAuthenticateOther = async (authenticatorId: string) => {
    const resp: AuthorizeApiResponseInterface = await authenticate({
      flowID: authResponse?.flowId,
      authenticatorID: authenticatorId,
    });
    console.log('Authenticate response:', resp);
    const metaData: Metadata = resp.nextStep.authenticators[0].metadata;
    if (metaData.promptType === 'REDIRECTION_PROMPT') {
      window.open(
        metaData.additionalData.redirectUrl,
        resp.nextStep.authenticators[0].authenticator,
        'width=500,height=600',
      );

      // Add an event listener to the window to capture the message from the popup
      window.addEventListener('message', function messageEventHandler(event) {
        // Check the origin of the message to ensure it's from the popup window
        if (event.origin !== config.redirectUri) return;

        const {code, state} = event.data;

        if (code && state) {
          handleAuthenticate({code, state}, resp.nextStep.authenticators[0].authenticatorId);
        }

        // Remove the event listener
        window.removeEventListener('message', messageEventHandler);
      });
    } else if (metaData.promptType === 'USER_PROMPT') {
      setAuthResponse(resp);
    }
  };

  const renderSignInOptions = (authenticator: Authenticator) => {
    switch (authenticator.authenticator) {
      case AuthenticatorType.TOTP:
        return (
          <TOTPFragment
            handleAuthenticate={handleAuthenticate}
            authenticatorId={authenticator.authenticatorId}
            isRetry={isRetry}
          />
        );

      default:
        return (
          <LoginOptionFragment
            authenticator={authenticator.authenticator}
            handleClick={() => handleAuthenticateOther(authenticator.authenticatorId)}
            key={authenticator.authenticatorId}
          />
        );
    }
  };

  /**
   * Generate the sign-in option based on the flow status and authenticator type.
   */
  const authenticators = authResponse?.nextStep?.authenticators;
  const generateSignInOptions = () => {
    if (authenticators) {
      let usernamePassword: boolean = false;
      let isMultipleAuthenticators: boolean = false;
      let usernamePasswordID: string = '';

      if (authenticators.length > 1) {
        isMultipleAuthenticators = true;
      }
      authenticators.forEach(authenticator => {
        if (authenticator.authenticator === AuthenticatorType.USERNAME_PASSWORD) {
          usernamePassword = true;
          usernamePasswordID = authenticator.authenticatorId;
        }
      });

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

          {/* If username and password option is there and multiple options are available,
          then render the divider */}
          {usernamePassword && isMultipleAuthenticators && (
            <Divider className="oxygen-sign-in-option-divider">
              <div>Or</div>
            </Divider>
          )}

          {/* If multiple options are available, then render the relevant compact fragments */}
          {isMultipleAuthenticators &&
            authenticators.map(authenticator => {
              if (authenticator.authenticator !== AuthenticatorType.USERNAME_PASSWORD) {
                return (
                  <LoginOptionFragment
                    authenticator={authenticator.authenticator}
                    handleClick={() => handleAuthenticateOther(authenticator.authenticatorId)}
                    key={authenticator.authenticatorId}
                  />
                );
              }
              return null;
            })}
        </>
      );
    }
    return (
      <Typography className="oxygen-sign-in-error ui sub header">
        No Login Options available! Please check your configurations and try again.
      </Typography>
    );
  };

  return (
    <div className="sign-in-box-node login-portal layout" data-componentid={`${componentId}`}>
      {authResponse?.flowStatus !== FlowStatus.SUCCESS_COMPLETED && brandingData && (
        <Box className="oxygen-sign-in ui form" data-componentid={`${componentId}-inner`}>
          <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
            <Box className="oxygen-sign-in-form">
              {generateSignInOptions()}
              <div className="oxygen-sign-in-options-wrapper" />
              {showSelfSignUp && (
                <Grid container className="oxygen-sign-in-sign-up-link">
                  <Grid>Don&apos;t have an account? </Grid>
                  <Grid>
                    <Link href="www.google.com" className="oxygen-sign-in-sign-up-link-action">
                      Register
                    </Link>
                  </Grid>
                </Grid>
              )}
            </Box>
          </Paper>
        </Box>
      )}
      {authResponse?.flowStatus === FlowStatus.SUCCESS_COMPLETED && (
        <div style={{padding: '1rem', backgroundColor: 'white'}}>Successfully Authenticated</div>
      )}
    </div>
  );
};

export default SignInBox;
