import { BasicAuthenticationForm } from "asgardeo-react";
function App() {

  return (
    <>
      Hello! Welcome to the sample app!!!
      <BasicAuthenticationForm baseUrl='https://localhost:9443' clientId='CtYxaqN68OXg0a1sWrLcfARALxIa' scope='openid internal_login' redirectUri='http://localhost:5173/' flowId='908b60c9-fe96-419a-82b2-0323a98baada' authenticatorId='QmFzaWNBdXRoZW50aWNhdG9yOkxPQ0FM'/>
    </>
  )
}

export default App
