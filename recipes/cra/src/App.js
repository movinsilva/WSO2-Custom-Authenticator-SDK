import './App.css';
 import { SignIn, SignedIn, UserButton, SignInButton, SignedOut } from '@asgardeo/react-ui';
//import { SignIn } from '../../../packages/react/src/index';

function App() {
  return (
    <div>
      <SignedIn fallback={<SignInButton />}>
        <nav className="nav-bar">
          <div>SAMPLE APP</div>
          <UserButton />
        </nav>
      </SignedIn>
      <SignIn />

    </div>
  );
}

export default App;
