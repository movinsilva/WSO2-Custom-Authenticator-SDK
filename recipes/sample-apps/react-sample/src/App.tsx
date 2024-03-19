import SignedIn from "../../../../packages/react/src/components/control-components/signed-in.tsx";
import SignedOut from "../../../../packages/react/src/components/control-components/signed-out.tsx";
import SignInButton from "../../../../packages/react/src/components/sign-in-button/sign-in-button.tsx";
import SignIn from "../../../../packages/react/src/components/sign-in/sign-in.tsx";
import SignOutButton from "../../../../packages/react/src/components/sign-out-button/sign-out-button.tsx";
import Profile from "../../../../packages/react/src/components/profile/profile.tsx";
import UserButton from "../../../../packages/react/src/components/user-button/user-button.tsx";
import { useAuthentication } from "../../../../packages/react/src/components/asgardeo-provider/asgardeo-context.ts";

// import {
//   SignInButton,
//   SignIn,
//   SignOutButton,
//   SignedIn,
//   SignedOut,
//   Profile,
//   useAuthentication,
// } from "@asgardeo/react-ui";

import { Hooks } from "./Hooks.tsx";
import "./App.scss";

function App() {
  const { isAuthenticated, user } = useAuthentication();
  console.log("user: ", user);

  return (
    <div className="container">
      <SignedIn>
        <nav className="nav-bar">
          <div>SAMPLE APP</div>
          <UserButton />
        </nav>
      </SignedIn>

      <SignedIn>
        <div className="profile">
          <Profile />
        </div>
      </SignedIn>

      <Hooks />

      <SignedOut>
        <SignInButton />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}

export default App;
