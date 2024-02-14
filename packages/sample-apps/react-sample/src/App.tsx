import { BasicAuthenticationForm } from "asgardeo-react";
function App() {

  // const config = {
  //   baseUrl: "https://dev.api.asgardeo.io/t/movinorg",
  //   clientId: "kH5OfXOvpGLOvp1iAw4zQmNvv4oa",
  //   scope: "openid internal_login",
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
      Hello! Welcome to the sample app!!!
      <BasicAuthenticationForm baseUrl={config.baseUrl} clientId={config.clientId} 
      scope={config.scope} redirectUri={config.redirectUri} flowId={config.flowId} 
      authenticatorId={config.authenticatorId}/>
    </>
  )
}

export default App
