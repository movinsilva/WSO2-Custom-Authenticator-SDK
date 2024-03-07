//import {useAuthentication} from 'asgardeo-react';
import {useAuthentication} from '../../../react/src/components/asgardeo-provider/asgardeo-context.ts';

import React from 'react';

export function Hooks(): React.ReactElement {
  const {accessToken, isAuthenticated} = useAuthentication();

  return (
    <div style={{margin: '2rem'}}>
      <div style={{fontSize: '2rem'}}>Hooks Available</div>
      <div style={{fontSize: '1.5rem'}}>1. useAuthentication()</div>
      <div style={{fontSize: '1rem'}}>Access Token: {accessToken ?? '...'}</div>
      <div style={{fontSize: '1rem', marginTop: '18px'}}>Is Authenticated: {isAuthenticated?.toString() ?? '...'}</div>
    </div>
  );
}
