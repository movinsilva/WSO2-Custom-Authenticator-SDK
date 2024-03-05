import React from 'react';
import { Box } from '@oxygen-ui/react';
import SignInBox from './sign-in-box/sign-in-box';
import Header from './header';
import './signin.scss';
import Footer from './footer';

const SignIn = () => (
  <Box className="asgardeo-sign-in">
    <Header />
    <SignInBox />
    <Footer />
  </Box>
);

export default SignIn;
