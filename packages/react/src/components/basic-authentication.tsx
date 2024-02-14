import React from "react";
import { authorize, authConfig } from 'asgardeo-core'
import { Button, ThemeProvider, extendTheme } from "@oxygen-ui/react";


const BasicAuthenticationForm = (data: { baseUrl: string; clientId: string; scope: string; redirectUri: string; flowId: string; authenticatorId: string; }) => {

    const theme = extendTheme({
        colorSchemes: {
          light: {
            palette: {
              primary: {
                main: '#FF5499',
              },
            },
          },
          dark: {
            palette: {
              primary: {
                main: '#FF5456',
              },
            },
          },
        },
      });

    authConfig(data.baseUrl, data.clientId, data.scope, data.redirectUri);
    return (
        <>
            <div>Package Works!</div>
            <Button onClick={() => {
                authorize().then((response: any) => {
                    console.log("response::", response);
                })
            }}>Authorize</Button>
            
        </>
    );
};

export default BasicAuthenticationForm;
