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
  return (
    <div className="container">
      <SignedIn>
        <nav className="nav-bar">
          <div>SAMPLE APP</div>
          <UserButton />
        </nav>
      </SignedIn>

      <SignedOut>
        <SignIn
          customization={{
            preference: {
              theme: {
                LIGHT: { loginBox: { background: { backgroundColor: "#CDC8E6" } } },
              },
              text: {
                "en-US": { login: { "login.heading": "From component" } },
              },
            },
          }}
        />
      </SignedOut>

      <SignedIn>
        <div className="profile">
          <Profile />
        </div>
      </SignedIn>

      <Hooks />

      <SignedOut>
        <SignInButton
          ButtonComponent={
            <button className="custom-sign-in-button">custom passed btn</button>
          }
        />
      </SignedOut>

      <SignedIn>
        <SignOutButton />
      </SignedIn>
    </div>
  );
}

export default App;
