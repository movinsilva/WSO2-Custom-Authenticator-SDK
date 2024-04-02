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
  authorize,
  authenticate,
  AuthClient,
  AuthApiResponse,
  AsgardeoException,
  Metadata,
  Authenticator,
} from "@asgardeo/ui-core";
import {
  Box,
  Link,
  Paper,
  Grid,
  Divider,
  Typography,
  CircularProgress,
} from "@oxygen-ui/react";
import React, {
  useEffect,
  useState,
  ReactElement,
  useContext,
  FunctionComponent,
} from "react";
import { useTranslation, Trans } from "react-i18next";
import Footer from "./footer";
import BasicAuthFragment from "./fragments/basic-auth-fragment";
import "./sign-in.scss";
import LoginOptionFragment from "./fragments/login-option-fragment";
import TOTPFragment from "./fragments/totp-fragment";
import Header from "./header";
import localizationKeys from "../../localization/keys";
import {
  AuthenticatorType,
  FlowStatus,
  IdentifiableComponentInterface,
} from "../../models/auth";
import { BrandingPreferenceInterface } from "../../models/branding-preferences";
import {
  AsgardeoProviderContext,
  useAuthentication,
  useConfig,
} from "../asgardeo-provider/asgardeo-context";
import { useBrandingPreference } from "../branding-preference-provider/branding-preference-context";

/**
 * Proptypes for the login box component.
 */
interface SignInInterface extends IdentifiableComponentInterface {
  /**
   * Branding preferences object.
   */
  brandingPreference?: BrandingPreferenceInterface;
}

/**
 * The sign-in box component.
 *
 * @component
 * @param {SignInInterface} props The props of the component
 * @returns {ReactElement} The sign-in box component
 */
const SignIn: FunctionComponent<SignInInterface> = (
  props: SignInInterface
): ReactElement => {
  const componentId: string = "sign-in-box";
  // TODO: Remove this after first authentication step
  const showSelfSignUp: boolean = true;
  const [isRetry, setIsRetry] = useState(false);
  const { config } = useConfig();

  const [authResponse, setAuthResponse] = useState<AuthApiResponse>();
  const authContext = useContext(AsgardeoProviderContext);
  const { brandingPreference } = useBrandingPreference();
  const [isLoading, setIsLoading] = useState(true);

  const { isAuthenticated } = useAuthentication();

  // const { t } = useTranslation();

  if (!authContext) {
    throw new Error("useAuthentication must be used within a AsgardeoProvider");
  }

  useEffect(() => {
    authorize()
      .then((result: AuthApiResponse) => {
        console.log("Authorization called with result:", result);
        setAuthResponse(result);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        throw new AsgardeoException(
          "REACT_UI-SIGNIN-AUTH",
          "Authorization call failed",
          error.message
        );
      });
  }, []);

  /**
   * Handles the generalized authentication process.
   * @param {any} authParams - The authentication parameters.
   */
  const handleAuthenticate = async (
    authParams: any,
    authenticatorId: string
  ) => {
    if (authResponse === undefined) {
      throw new AsgardeoException(
        "REACT_UI-SIGNIN-HA",
        "Auth response is undefined."
      );
    }
    setIsLoading(true);
    console.log("b4 calling authenticate");
    const resp: AuthApiResponse = await authenticate({
      flowID: authResponse?.flowId,
      authenticatorID: authenticatorId,
      authenticatorParametres: authParams,
    });
    console.log("After calling authenticate");
    console.log("Authenticate response:", resp);

    // when the authentication is successful, generate the token
    if (resp.flowStatus === FlowStatus.SUCCESS_COMPLETED && resp.authData) {
      console.log("successful authentication");
      setAuthResponse(resp);
      const authInstance = AuthClient.getInstance();
      const state: string = (
        await authInstance.getDataLayer().getTemporaryDataParameter("state")
      ).toString();
      await authInstance.requestAccessToken(
        resp.authData.code,
        resp.authData.session_state,
        state
      );
      authContext.setAuthentication();
    } else if (resp.flowStatus === FlowStatus.FAIL_INCOMPLETE) {
      setAuthResponse({
        ...resp,
        nextStep: authResponse.nextStep,
      });
      setIsRetry(true);
    } else {
      setAuthResponse(resp);
    }
    setIsLoading(false);
  };

  const handleAuthenticateOther = async (authenticatorId: string) => {
    if (authResponse === undefined) {
      throw new AsgardeoException(
        "REACT_UI-SIGNIN-HAO",
        "Auth response is undefined."
      );
    }
    setIsLoading(true);
    const resp: AuthApiResponse = await authenticate({
      authenticatorID: authenticatorId,
      flowID: authResponse.flowId,
    });
    console.log("Authenticate response:", resp);
    const metaData: Metadata = resp.nextStep.authenticators[0].metadata;
    if (metaData.promptType === "REDIRECTION_PROMPT") {
      window.open(
        metaData.additionalData.redirectUrl,
        resp.nextStep.authenticators[0].authenticator,
        "width=500,height=600"
      );

      // Add an event listener to the window to capture the message from the popup
      window.addEventListener("message", function messageEventHandler(event) {
        // Check the origin of the message to ensure it's from the popup window
        if (event.origin !== config.signInRedirectURL) return;

        const { code, state } = event.data;

        if (code && state) {
          handleAuthenticate(
            { code, state },
            resp.nextStep.authenticators[0].authenticatorId
          );
        }

        // Remove the event listener
        window.removeEventListener("message", messageEventHandler);
      });
    } else if (metaData.promptType === "USER_PROMPT") {
      setAuthResponse(resp);
    }
    setIsLoading(false);
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
            handleClick={() =>
              handleAuthenticateOther(authenticator.authenticatorId)
            }
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
      let usernamePasswordID: string = "";

      if (authenticators.length > 1) {
        isMultipleAuthenticators = true;
      }
      authenticators.forEach((authenticator) => {
        if (
          authenticator.authenticator === AuthenticatorType.USERNAME_PASSWORD
        ) {
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
          {!usernamePassword &&
            !isMultipleAuthenticators &&
            renderSignInOptions(authenticators[0])}

          {/* If username and password option is there and multiple options are available,
          then render the divider */}
          {usernamePassword && isMultipleAuthenticators && (
            <Divider className="oxygen-sign-in-option-divider">
              <div>Or</div>
            </Divider>
          )}

          {/* If multiple options are available, then render the relevant compact fragments */}
          {isMultipleAuthenticators &&
            authenticators.map((authenticator) => {
              if (
                authenticator.authenticator !==
                AuthenticatorType.USERNAME_PASSWORD
              ) {
                return (
                  <LoginOptionFragment
                    authenticator={authenticator.authenticator}
                    handleClick={() =>
                      handleAuthenticateOther(authenticator.authenticatorId)
                    }
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
      !isLoading && (
        <Typography className="oxygen-sign-in-error ui sub header">
          No Login Options available! Please check your configurations and try
          again.
        </Typography>
      )
    );
  };

  if (isLoading) {
    return (
      <div className="sign-in-box-node">
        <CircularProgress className="circular-progress" />
      </div>
    );
  }
  return (
    <div>
      <Header />
      <div
        className="sign-in-box-node login-portal layout"
        data-componentid={`${componentId}`}
      >
        {authResponse?.flowStatus !== FlowStatus.SUCCESS_COMPLETED &&
          !isAuthenticated && (
            <Box
              className="oxygen-sign-in ui form"
              data-componentid={`${componentId}-inner`}
            >
              <Paper
                className="oxygen-sign-in-box"
                elevation={0}
                variant="outlined"
              >
                <Box className="oxygen-sign-in-form">
                  {generateSignInOptions()}
                  <div className="oxygen-sign-in-options-wrapper" />
                  {showSelfSignUp && (
                    <Grid container className="oxygen-sign-in-sign-up-link">
                      <Grid>
                        <Trans
                          i18nKey={localizationKeys.common.registerPreText}
                        />{" "}
                      </Grid>
                      <Grid>
                        <Link
                          href="www.google.com"
                          className="oxygen-sign-in-sign-up-link-action"
                        >
                          <Trans
                            i18nKey={localizationKeys.common.registerLink}
                          />
                        </Link>
                      </Grid>
                    </Grid>
                  )}
                </Box>
              </Paper>
            </Box>
          )}
        {(authResponse?.flowStatus === FlowStatus.SUCCESS_COMPLETED ||
          isAuthenticated) && (
          <div style={{ padding: "1rem", backgroundColor: "white" }}>
            Successfully Authenticated
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default SignIn;
