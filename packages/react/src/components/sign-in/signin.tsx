import React, { useState } from 'react';
import { Box, CircularProgress } from '@oxygen-ui/react';
import SignInBox from './sign-in-box/sign-in-box';
import Header from './header';
import './signin.scss';
import Footer from './footer';

const SignIn = () => {
  const [isLoading, setIsLoading] = useState(false);
  return isLoading ? (
    <CircularProgress className="circular-progress" />
  ) : (
    <Box className="asgardeo-sign-in">
      <Header />
      <SignInBox setIsLoading={setIsLoading} />
      <Footer />
    </Box>
  );
};

export default SignIn;
