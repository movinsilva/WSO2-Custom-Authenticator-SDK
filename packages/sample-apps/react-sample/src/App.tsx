// import { SignIn } from "asgardeo-react";
// import { AuthenticatedComponent } from "asgardeo-react";
import { SignIn } from "../../../react/src/index.ts";
import { AuthenticatedComponent } from "../../../react/src/components/authenticated-component/authenticated-component.tsx";

function App() {

  return (
    <>
      <div style={{fontSize: '2rem'}}>Hello! Welcome to the sample app!</div>
      <SignIn/>
      <div style={{padding: '1rem', margin: '1rem', border: '1px solid blue'}}> AuthenticatedComponent:
        <AuthenticatedComponent>
          <div style={{fontSize: '2rem',}}> You are authenticated!</div>
        </AuthenticatedComponent>
      </div>
    </>
  )
}

export default App
