import { Button } from '@oxygen-ui/react';
import React, { ReactElement } from 'react';
import google from '../../../assets/social-logins/google-idp-illustration.svg';
import facebook from '../../../assets/social-logins/facebook-idp-illustration.svg';
import github from '../../../assets/social-logins/github-idp-illustration.svg';
import { LoginOptionFragmentPropsInterface } from '../../../models/auth';

const images: { [key: string]: any } = {
  Google: google,
  facebook,
  Github: github,
};

const LoginOptionFragment = (props: LoginOptionFragmentPropsInterface): ReactElement => {
  const { authenticator, handleClick } = props;
  return (
    <Button
      startIcon={<img className="oxygen-sign-in-option-image" src={images[authenticator]} alt={authenticator} />}
      variant="contained"
      className="oxygen-sign-in-option"
      type="button"
      fullWidth
      onClick={() => handleClick()}
    >
      Sign In With
      {' '}
      {authenticator}
    </Button>
  );
};

export default LoginOptionFragment;
