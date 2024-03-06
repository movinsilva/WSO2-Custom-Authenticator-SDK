import { Button } from '@oxygen-ui/react';
import { signOut } from 'asgardeo-core';
import React, { useContext } from 'react';
import { AsgardeoProviderContext } from '../asgardeo-provider/asgardeo-provider';

const SignOutButton = () => {
  const authContext = useContext(AsgardeoProviderContext);

  const handleClick = () => {
    signOut().then(() => {
      authContext?.setAuthentication();
    });
    sessionStorage.clear();
  };
  return <Button onClick={handleClick}>Sign Out</Button>;
};

export default SignOutButton;
