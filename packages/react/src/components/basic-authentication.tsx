import React from "react";
import { authorize, authConfig } from 'asgardeo-core'


const BasicAuthenticationForm = (data: { baseUrl: string; clientId: string; scope: string; redirectUri: string; flowId: string; authenticatorId: string; }) => {

    authConfig(data.baseUrl, data.clientId, data.scope, data.redirectUri);
    return (
        <>
            <div>Package Works!</div>
            <button onClick={() => {
                authorize().then((response: any) => {
                    console.log(response);
                })
            }}>Authorize</button>
        </>
    );
};

export default BasicAuthenticationForm;
