import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import {AuthProvider} from '../../../react/src/components/asgardeo-provider/asgardeo-provider.tsx';

const config = {
  baseUrl: "https://localhost:9443",
  clientId: "CtYxaqN68OXg0a1sWrLcfARALxIa",
  scope: "openid internal_login",
  redirectUri: "http://localhost:5173/"
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <AuthProvider config={config} >
    <App />
    </AuthProvider>
)
