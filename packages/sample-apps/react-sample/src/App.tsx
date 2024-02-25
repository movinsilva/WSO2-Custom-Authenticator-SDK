 //import { SignIn } from "asgardeo-react";
import { SignIn } from "../../../react/src/index.ts";
import { useAuthentication } from "../../../react/src/components/asgardeo-provider/asgardeo-provider.tsx"; 
import { AuthenticatedComponent } from "../../../react/src/components/authenticated-component/authenticated-component.tsx";
function App() {

  // const config = {
  //   baseUrl: "https://dev.api.asgardeo.io/t/movinorg",
  //   clientId: "kH5OfXOvpGLOvp1iAw4zQmNvv4oa",
  //   scope: "openid system profile",
  //   redirectUri: "http://localhost:5174",
  //   flowId: "908b60c9-fe96-419a-82b2-0323a98baada",
  //   authenticatorId: "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM"
  // }

  const config = {
    baseUrl: "https://localhost:9443",
    clientId: "CtYxaqN68OXg0a1sWrLcfARALxIa",
    scope: "openid internal_login",
    redirectUri: "http://localhost:5173/",
    flowId: "908b60c9-fe96-419a-82b2-0323a98baada",
    authenticatorId: "QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM"
  }

  return (
    <>
      <div style={{fontSize: '2rem'}}>Hello! Welcome to the sample app!</div>
      <SignIn/>
      <AuthenticatedComponent>
        <div style={{fontSize: '2rem'}}>AuthenticatedComponent: You are authenticated!</div>
      </AuthenticatedComponent>
    </>
  )
}

export default App
