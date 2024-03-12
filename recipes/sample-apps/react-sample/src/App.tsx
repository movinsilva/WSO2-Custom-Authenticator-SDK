import SignedIn from '../../../../packages/react/src/components/control-components/signed-in.tsx';
import SignedOut from '../../../../packages/react/src/components/control-components/signed-out.tsx';
import SignInButton from '../../../../packages/react/src/components/sign-in-button/sign-in-button.tsx';
import SignIn from '../../../../packages/react/src/components/sign-in/signin.tsx';
import SignOutButton from '../../../../packages/react/src/components/sign-out-button/sign-out-button.tsx';
import Profile from '../../../../packages/react/src/components/profile/profile.tsx';
import UserButton from '../../../../packages/react/src/components/user-button/user-button.tsx';

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
        <div>
          USER BUTTON
          <UserButton />
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
