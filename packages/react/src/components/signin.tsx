import React from 'react';
import SignInBox from './sign-in-box/sign-in-box';

const SignIn = (data: any) => {
  const { config } = data;

  return (
    <>
      <div style={{ margin: '3rem' }} />
      <SignInBox config={config} />
    </>
  );
};

export default SignIn;
