import { Box, IconButton, Link, Paper, Grid} from "@oxygen-ui/react";
import { authorize, authConfig, branding, authenticate } from 'asgardeo-core'
import React, { useEffect, useState } from "react";
import { ReactElement } from "react";
import BasicAuthFragment from "./fragments/basic-auth-fragment";
import './sign-in-box.scss';
import { FlowStatus } from "../../models/auth";

export const SignInBox = (data: any): ReactElement => {
    
    const {
        baseUrl,
        clientId,
        scope,
        redirectUri
    } = data.config;
    const componentId = "sign-in-box";
    const showSelfSignUp = true;

    const [authz, setAuthz] = useState("");
    const [brandingData, setBrandingData] = useState("");
    const [flowStatus, setFlowStatus] = useState("");


    useEffect(() => {
        authConfig(baseUrl, clientId, scope, redirectUri);
        authorize()
            .then((result: any) => {
                setAuthz(result);
                console.log("Authorization result:", result);
            })
            .catch((error: any) => {
                console.error("Authorization error:", error);
            });

        branding()
            .then((result: any) => {
                console.log("Branding result:", result);
                setBrandingData(result);
            })
            .catch((error: any) => {
                console.error("Branding error:", error);
            });

    }, []);

    const handleAuthenticate = async (username: string, password: string) => {
        // Call the authenticate function with the username and password
        const resp = await authenticate({ username: username, password: password });
        console.log("Authenticate response:", resp);
        setFlowStatus(resp.flowStatus);
    };


    const generateBasicSignInOption = () => {
        return <BasicAuthFragment handleAuthenticate={handleAuthenticate}/>;
    }

    return (
        <div
            className="sign-in-box-node"
            data-componentid={`${componentId}`}
        >


            {authz && brandingData && flowStatus !== FlowStatus.SUCCESS_COMPLETED && 
            <Box className="oxygen-sign-in" data-componentid={`${componentId}-inner`}>
                <Paper className="oxygen-sign-in-box" elevation={0} variant="outlined">
                    <Box className="oxygen-sign-in-form">
                        {generateBasicSignInOption()}
                        <div className="oxygen-sign-in-options-wrapper">
                        </div>
                        {showSelfSignUp && (
                            <Grid container className="oxygen-sign-in-sign-up-link">
                                <Grid>Don't have an account?</Grid>
                                <Grid>
                                    <Link href="#" className="oxygen-sign-in-sign-up-link-action">
                                        Register
                                    </Link>
                                </Grid>
                            </Grid>
                        )}
                    </Box>
                </Paper>
            </Box>}
        </div>
    );
}