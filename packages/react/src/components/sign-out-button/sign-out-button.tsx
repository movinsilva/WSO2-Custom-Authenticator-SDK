import {Button} from '@oxygen-ui/react';
import React, {useContext} from 'react';
import {AsgardeoProviderContext} from '../asgardeo-provider/asgardeo-context';

const SignOutButton = () => {
  const authContext = useContext(AsgardeoProviderContext);

  const handleClick = () => {
    sessionStorage.clear();
  };
  return <Button onClick={handleClick}>Sign Out</Button>;
};

export default SignOutButton;
