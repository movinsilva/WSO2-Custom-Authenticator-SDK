import {Button} from '@oxygen-ui/react';
import React, {ReactElement} from 'react';
import google from '../../../../assets/social-logins/google.svg';
import facebook from '../../../../assets/social-logins/facebook.svg';
import github from '../../../../assets/social-logins/github.svg';
import {LoginOptionFragmentPropsInterface} from '../../../../models/auth';

const images: {[key: string]: any} = {
  Google: google,
  facebook,
  Github: github,
};

/**
 * The Login Option Fragment component which consists of the social login buttons.
 *
 * @component
 * @param {LoginOptionFragmentPropsInterface} props The props of the component
 * @returns {ReactElement} The Login Option Fragment component
 */
const LoginOptionFragment = (props: LoginOptionFragmentPropsInterface): ReactElement => {
  const {authenticator, handleClick} = props;
  return (
    <Button
      startIcon={<img className="oxygen-sign-in-option-image" src={images[authenticator]} alt={authenticator} />}
      variant="contained"
      className="oxygen-sign-in-option"
      type="button"
      fullWidth
      onClick={() => handleClick()}
    >
      Sign In With {authenticator}
    </Button>
  );
};

export default LoginOptionFragment;
