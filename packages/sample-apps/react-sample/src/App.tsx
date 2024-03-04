// import { SignIn } from "asgardeo-react";
// import { SignedIn } from "asgardeo-react";
// import { SignedOut } from "asgardeo-react";
import {SignedIn} from '../../../react/src/components/control-components/signed-in.tsx';
import {SignedOut} from '../../../react/src/components/control-components/signed-out.tsx';

import {Hooks} from './Hooks.tsx';
import SignInButton from '../../../react/src/components/sign-in-button/sign-in-button.tsx';
import SignIn from '../../../react/src/components/signin.tsx';

function App() {
  return (
    <>
      <div style={{fontSize: '2rem'}}>Hello! Welcome to the sample app!</div>

      <SignIn />

      <div style={{padding: '1rem', margin: '1rem', border: '1px solid blue'}}>
        {' '}
        AuthenticatedComponent:
        <SignedIn>
          <div style={{fontSize: '2rem'}}> You are authenticated!</div>
        </SignedIn>
        <SignedOut>
          <div style={{fontSize: '2rem'}}> You are not authenticated!</div>
        </SignedOut>
      </div>

      <Hooks />

      <SignedOut>
        <SignInButton />
      </SignedOut>
    </>
  );
}

export default App;
