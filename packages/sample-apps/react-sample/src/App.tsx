import SignedIn from '../../../react/src/components/control-components/signed-in.tsx';
import SignedOut from '../../../react/src/components/control-components/signed-out.tsx';
import SignInButton from '../../../react/src/components/sign-in-button/sign-in-button.tsx';
import SignIn from '../../../react/src/components/sign-in/signin.tsx';
import SignOutButton from '../../../react/src/components/sign-out-button/sign-out-button.tsx';
import Profile from '../../../react/src/components/profile/profile.tsx';

//import {SignInButton, SignIn, SignOutButton, SignedIn, SignedOut, Profile} from 'asgardeo-react';

import {Hooks} from './Hooks.tsx';
import './App.scss';

function App() {
  return (
    <div className="container">
      <div className="title">Welcome to the sample app!</div>

      <SignedOut>
        <SignIn />
        <div className="margin" />
      </SignedOut>

      <SignedIn>
        THIS IS SIGNED IN COMPONENT
        <div>
          <Profile />
        </div>
      </SignedIn>
      <SignedOut>
        <div style={{fontSize: '2rem'}}> You are not authenticated!</div>
      </SignedOut>

      <Hooks />

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignOutButton />
    </div>
  );
}

export default App;
