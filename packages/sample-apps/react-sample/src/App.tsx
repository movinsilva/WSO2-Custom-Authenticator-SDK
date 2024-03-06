// import { SignIn } from "asgardeo-react";
// import { SignedIn } from "asgardeo-react";
// import { SignedOut } from "asgardeo-react";
import SignedIn from '../../../react/src/components/control-components/signed-in.tsx';
import SignedOut from '../../../react/src/components/control-components/signed-out.tsx';

import {Hooks} from './Hooks.tsx';
import SignInButton from '../../../react/src/components/sign-in-button/sign-in-button.tsx';
import SignIn from '../../../react/src/components/sign-in/signin.tsx';
import SignOutButton from '../../../react/src/components/sign-out-button/sign-out-button.tsx';
import './App.scss';

function App() {
  return (
    <div className="container">
      <div className="title">Welcome to the sample app!</div>

      <SignedOut>
        <SignIn />
      </SignedOut>

      <div className="authenticatedComponent">
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

      <SignOutButton />
    </div>
  );
}

export default App;
