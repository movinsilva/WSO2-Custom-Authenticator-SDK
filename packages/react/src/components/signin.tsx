import React from "react";
import { extendTheme } from "@oxygen-ui/react";
import { SignInBox } from "./sign-in-box/sign-in-box";

const SignIn = (data: any) => {
  
    return (
        <>
            <div style={{margin: '3rem'}}></div>
            <SignInBox config={data.config}/>
        </>
    );
};

export default SignIn; 

